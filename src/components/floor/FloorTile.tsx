import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase } from '../../firebase/config';
import { useUser } from 'context/UserContext';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { NativeModules } from 'react-native';
import { Text } from 'components/common/Text';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert} from 'react-native';
import { Path } from 'react-native-svg';
var fs = require('react-native-fs');
const pathUserList = fs.DocumentDirectoryPath + '/userList.json';
const dataJson = fs.DocumentDirectoryPath + '/data.json';
const FloorTile = ({
  floorId,
  listObject,
  floor,
  type,
  listId,
  editList,
  searched,
  index,
  getSelectedIndex,
  floorDetail,
  flag,
  detailsFunction,
  unit
}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const tileWidth = windowWidth / 3 - 9;
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [url, setUrl] = useState('');
  const [isLocalExist, setIsLocalExist] = useState('');
  const db = firebase.firestore();

  //from context
  let isExist = false;

  let locale = NativeModules.SettingsManager.settings.AppleLocale; // "fr_FR"
  if (locale === undefined) {
    // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    if (locale == undefined) {
      locale = 'en'; // default language
    }
  }
  let language = locale;
  language = language.split('_');
  var deviceLanguage = language[0];
  const activeRef =
    type === 'slct'
      ? db.collection('users-collections-lists').doc(`${user}`)
      : db.collection('users-collections-favorites').doc(`${user}`);
  // const {visible, setVisible} = props
  const fetchFloorStatus = async () => {
    try {
      let activeDoc = await activeRef.get();
      let currentDoc = await activeDoc.data();
      if (activeDoc.exists) {
        if (type === 'slct') {
          currentDoc = currentDoc[listId];
          if (editList && currentDoc.floors[floor[0]].active) {
            listObject[floor[0]] = {active: true};
            setActive(currentDoc.floors[floor[0]].active);
          } else {
            if (currentDoc[floor[0]]) {
              setActive(currentDoc[floor[0]].active);
            }
          }
        } else {
          currentDoc = currentDoc[floor[0]];
          if (currentDoc) {
            setActive(currentDoc.active);
          }
        }
      } else {
        // console.log('No such document!');
      }
    } catch (e) {
      console.log(`[ERROR] ${e} error fetching floor status`);
    }
  };
  const getLocalPath = async (preview: string) => {
    // let previewRef = await firebase
    //   .storage()
    //   .ref(`floors/${floorId}/${preview}`)
    //   .getDownloadURL();
    let dirs = RNFetchBlob.fs.dirs;
    var path =
      Platform.OS === 'ios'
        ? dirs.DocumentDir +
          '/' +
          preview +
          '.png'
        : dirs.PictureDir +
          '/Aroz/' +
          preview +
          '.png';

    return path;
  };
  const getPreviewUrl = async () => {
    let dirs = RNFetchBlob.fs.dirs;
    //console.log('isExist ' + isExist);
    setIsLocalExist(isExist);
    if (floor[1]?.emptyBlock !== true && floor?.emptyBlock !== true) {
      //check for unhandled warning
      if (floor) {
        if (searched === true) {
          let previewRef = await firebase
            .storage()
            .ref(
              `floors/${floorId}/thumbnails/${floor[1]?.data?.images?.primary?.originalId}_200x200`,
            )
            .getDownloadURL();
          setUrl(previewRef);
          var path =
            Platform.OS === 'ios'
              ? dirs.DocumentDir +
                '/' +
                floor[1]?.data?.images?.primary?.originalId +
                '.png'
                : dirs.PictureDir +
                '/Aroz/' +
                floor[1]?.data?.images?.primary?.originalId +
                '.png';
          var originalIdisExist = await RNFetchBlob.fs.exists(path);
          var roughnessMapIdisExist=true;
          if(floor[1]?.data?.images?.primary?.roughnessMapId!=null){
            roughnessMapIdisExist =await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.roughnessMapId));
          }
          var normalMapIdIdisExist=true;
          if(floor[1]?.data?.images?.primary?.normalMapId!=null){
            normalMapIdIdisExist =await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.normalMapId));
          }
          
          var colorMapIdisExist=true;
          if(floor[1]?.data?.images?.primary?.colorMapId!=null){
          colorMapIdisExist=await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.colorMapId));
          }
          if(colorMapIdisExist && normalMapIdIdisExist && roughnessMapIdisExist && originalIdisExist){
            setIsLocalExist(true);
          }
          
        } else {
          let previewRef = await firebase
            .storage()
            .ref(
              `floors/${floorId}/thumbnails/${floor[1]?.images?.primary?.originalId}_200x200`,
            )
            .getDownloadURL();
          setUrl(previewRef);
          var path =
            Platform.OS === 'ios'
              ? dirs.DocumentDir +
                '/' +
                floor[1]?.images?.primary?.originalId +
                '.png'
                : dirs.PictureDir +
                '/Aroz/' +
                floor[1]?.images?.primary?.originalId +
                '.png';
          var originalIdisExist = await RNFetchBlob.fs.exists(path);
          var roughnessMapIdisExist=true;
          if(floor[1]?.data?.images?.primary?.roughnessMapId!=null){
            roughnessMapIdisExist =await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.roughnessMapId));
          }
          var normalMapIdIdisExist=true;
          if(floor[1]?.data?.images?.primary?.normalMapId!=null){
            normalMapIdIdisExist =await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.normalMapId));
          }
          
          var colorMapIdisExist=true;
          if(floor[1]?.data?.images?.primary?.colorMapId!=null){
          colorMapIdisExist=await RNFetchBlob.fs.exists(await getLocalPath(floor[1]?.data?.images?.primary?.colorMapId));
          }
          if(colorMapIdisExist && normalMapIdIdisExist && roughnessMapIdisExist && (originalIdisExist==null?true:originalIdisExist)){
            setIsLocalExist(true);
          }
        }
      }
    };
  }
  const addFloor = () => {
    if (type !== 'slct') {
      activeRef.set(
        {
          [floor[0]]: {
            active: true,
          },
        },
        { merge: true },
      );
    } else {
      listObject[floor[0]] = {active: true};
    }
    setActive(true);

    if (floor[1]?.images?.primary?.roughnessMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.roughnessMapId, 2);
    }
    if (floor[1]?.images?.primary?.colorMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.colorMapId, 2);
    }
    if (floor[1]?.images?.primary?.normalMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.normalMapId, 2);
    }
    if (floor[1]?.images?.primary?.originalId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.originalId, 1);
    }
  };

  const removeFloor = () => {
    if (type !== 'slct') {
      activeRef.update(
        {
          [floor[0]]: firebase.firestore.FieldValue.delete(),
        },
        { merge: true },
      );
    } else {
      delete listObject[floor[0]];
    }
    setActive(false);
    if (floor[1]?.images?.primary?.originalId != null) {
      deleteLocalImage(floor[1]?.images?.primary?.originalId, 1);
    }
    if (floor[1]?.images?.primary?.normalMapId != null) {
      deleteLocalImage(floor[1]?.images?.primary?.normalMapId, 2);
    }
    if (floor[1]?.images?.primary?.colorMapId != null) {
      deleteLocalImage(floor[1]?.images?.primary?.colorMapId, 2);
    }
    if (floor[1]?.images?.primary?.roughnessMapId != null) {
      deleteLocalImage(floor[1]?.images?.primary?.roughnessMapId, 2);
    }
  };
  const downloadFloor = () => {
    if (floor[1]?.images?.primary?.roughnessMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.roughnessMapId, 2);
    }
    if (floor[1]?.images?.primary?.colorMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.colorMapId, 2);
    }
    if (floor[1]?.images?.primary?.normalMapId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.normalMapId, 2);
    }
    if (floor[1]?.images?.primary?.originalId != null) {
      downloadServerImageToLocal(floor[1]?.images?.primary?.originalId, 1);
    }
  };
  async function downloadServerImageToLocal(Image, type) {
    let FilePath;
    if (type == 1) {
      FilePath = `floors/${floorId}/thumbnails/${Image}_200x200`;
    } else {
      FilePath = `floors/${floorId}/${Image}`;
    }
    console.log('previewRef@@' + FilePath);
    setIsDownloading(true);
    let previewRef = await firebase.storage().ref(FilePath).getDownloadURL();
    console.log('previewRef@@' + previewRef);
    let dirs = RNFetchBlob.fs.dirs;
    if (previewRef != null) {
      let path =
        Platform.OS === 'ios'
          ? dirs.DocumentDir +
            '/' +
            Image +
            '.png'
          : dirs.PictureDir +
            '/Aroz/' +
            Image +
            '.png';
      // const chckLocationPermission = PermissionsAndroid.check(
      //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // );if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      //   alert("READ_EXTERNAL_STORAGE");
      //   return;
      // }

      RNFetchBlob.fs.exists(path).then((exist) => {
        if (!exist) {
          console.log('Image not exist');
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
            indicator: true,
            IOSBackgroundTask: true,
            path: path,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: path,
              description: 'Image',
            },
          })
            .fetch('GET', previewRef + '')
            .then((res) => {
              setIsDownloading(false);
              setIsLocalExist(true);
              //alert(path);
              if (Platform.OS == 'ios') {
                CameraRoll.save(res.data, 'photo');
              }
              // setDownloadedUrl(path)
            });
        } else {
          console.log('path exist');
        }
      });
    }
  }
  async function deleteLocalImage(Image, type) {
    let contents = await fs.readFile(dataJson, 'utf8');
    let dirs = RNFetchBlob.fs.dirs;
    if (Image != null) {
      let path =
        Platform.OS === 'ios'
          ? dirs.DocumentDir + '/' + Image + '.png'
          : dirs.PictureDir + '/Aroz/' + Image + '.png';
      if (!contents.includes(Image + '.png')) {
        //alert("sas"+path);
        fs.unlink(path);
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchFloorStatus();
    }
  }, [listId]);
  useEffect(() => {
    getPreviewUrl();
  }, [floor]);

  useEffect(() => {
    setShowDetail(floor[1]?.showDetail);
  }, [floor]);

  return (
    <Container>
      {showDetail === true ||
        floor[1]?.emptyBlock ||
        floor.emptyBlock === true ? null : isLocalExist ? ( //here
          <View
            style={{
              zIndex: 10,
              top: 0,
              position: 'absolute',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              marginLeft: 5,
            }}>
            <Icon
              name="checkmark-done-sharp"
              style={{ zIndex: 11 }}
              size={25}
              color={theme.accent}
            />
          </View>
        ) : (
        <IsDownloadedIcon>
          {isDownloading ? (
            <ActivityIndicator size={20} color={theme.green} />
          ) : (
            <TouchableOpacity onPress={() => downloadFloor()}>
              <Icon name="download" size={30} color={theme.lighterBlueGrey} />
            </TouchableOpacity>
          )}
        </IsDownloadedIcon>
      )}
      {showDetail === true ||
        floor[1]?.emptyBlock === true ||
        floor.emptyBlock === true ? null : (
        <IconButton onPress={() => (active ? removeFloor() : addFloor())}>
          {active ? (
            <View>
              <Icon
                style={{ zIndex: 10 }}
                name={type === 'slct' ? 'add-circle' : 'checkmark-circle'}
                size={30}
                color={theme.accent}
              />
              <WhiteCircle />
            </View>
          ) : (
            <WhiteCircle />
          )}
        </IconButton>
      )}
      <View style={{}}>
        <TouchableOpacity
          style={{ zIndex: 10 }}
          onPress={() => {
            detailsFunction(index);
            setShowDetail(!showDetail);
            // getSelectedIndex(index)
          }}
          disabled={floor[1]?.emptyBlock === true && true}>
          {showDetail === true ? (
            <View
              style={{
                width: windowWidth * 1.6,
                height: tileWidth,
                flexDirection: 'row',
                left: windowHeight > 890 ? 132 : windowHeight > 660 ? 120 : 103,
              }}>
              <FastImage
                style={{ width: tileWidth, height: tileWidth }}
                source={{
                  uri: url,
                  priority: FastImage.priority.high,
                }}
              />
              <DetailView>
                {
                  deviceLanguage === 'fr' ?
                    <Text size={'large'} weight={'600'} >{searched === true ? floor[1]?.data?.name?.fr : floor[1]?.name?.fr}</Text>
                    :
                    deviceLanguage === 'en' ?
                      <Text size={'large'} weight={'600'} >{searched === true ? floor[1]?.data?.name?.en : floor[1]?.name?.en}</Text>
                      :
                      <Text size={'large'} weight={'600'} >{searched === true ? floor[1].data?.name?.en : floor[1]?.name?.en}</Text>
                }
                {
                  floor[1]?.color?.[i18n.language]?.length > 0 &&
                  <Row>
                    <Icon
                      style={{ zIndex: 1, paddingRight: 5 }}
                      name={'color-palette-sharp'}
                      size={16}
                      color={'black'}
                    />
                    <Text size={'11px'}>{floor[1]?.color?.[i18n.language]}</Text>
                  </Row>
                }

                <Row>
                  <Icon
                    style={{ zIndex: 1, paddingRight: 5 }}
                    name={'logo-buffer'}
                    size={16}
                    color={'black'}
                  />
                  <Text size={'11px'} >{t(`floor:${floor[1]?.type?.toLowerCase().replace(' ', '_')}`)} {floor[1]?.finish && `-`} {floor[1]?.finish && t(`floor:${floor[1].finish?.toLowerCase().replace('-', '_').replace(' ', '_')}`)}</Text>
                </Row>
                <Row>
                  {
                    (floor[1]?.width || floor[1]?.height) &&
                    <Icon
                      style={{ zIndex: 1, paddingRight: 5 }}
                      name={'scan-sharp'}
                      size={16}
                      color={'black'}
                    />
                  }

                  {
                    unit &&
                    <>
                      {
                        ((floor[1]?.width && floor[1]?.height) || (floor[1]?.width?.length > 0 && floor[1]?.height?.length > 0)) &&
                        <Text size={'11px'}>{floor[1]?.width} cm x {floor[1]?.height} cm</Text>
                      }
                      {
                        (floor[1]?.width && (floor[1]?.height == undefined || floor[1]?.height.length == 0)) &&
                        <Text size={'11px'}>{t('width')}: {floor[1]?.width} cm</Text>
                      }
                      {
                        ((floor[1]?.width == undefined || floor[1]?.width?.length == 0)&& floor[1]?.height) &&
                        <Text size={'11px'}>{t('height')}: {floor[1]?.height} cm</Text>
                      }
                    </>
                  }

                  {
                    !unit &&
                    <>
                      {
                        (floor[1]?.width && floor[1]?.height) &&
                        <Text size={'11px'}>{(floor[1]?.width * 0.3937).toFixed(2)} in x {(floor[1]?.height * 0.3937).toFixed(2)} in</Text>
                      }
                      {
                        (floor[1]?.width && floor[1]?.height == undefined) &&
                        <Text size={'11px'}>{t('width')}: {(floor[1]?.width * 0.3937).toFixed(2)} in</Text>
                      }
                      {
                        (floor[1]?.width == undefined && floor[1]?.height) &&
                        <Text size={'11px'}>{t('height')}: {(floor[1]?.height * 0.3937).toFixed(2)} in</Text>
                      }
                    </>
                  }

                </Row>
                <Row>
                  <IconMC
                    style={{ zIndex: 1, paddingRight: 5 }}
                    name={'store'}
                    size={16}
                    color={'black'}
                  />

                  <Text size={'11px'}>{floor[1]?.data?.store?.name || floor[1]?.store?.name}</Text>
                </Row>
              </DetailView>
            </View>
          )
            : (
              <FastImage
                style={{ width: tileWidth, height: tileWidth, top: -50, zIndex: 1 }}
                resizeMode="cover"
                source={{
                  uri: url,
                  priority: FastImage.priority.high,
                }} />)

          }
        </TouchableOpacity>
      </View>
    </Container>
  );
}
export default FloorTile;

const windowWidth = Dimensions.get('window').width;

const tileWidth = windowWidth / 3 - 9;

const Container = styled.View`
  height: ${tileWidth}px;
  margin-bottom: 6px;
  margin: 3px;

`;
const IconButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: flex-end;
  align-self: flex-end;
  z-index: 2;
`;
const WhiteCircle = styled.View`
  background-color: white;
  margin: 5px;
  height: 24px;
  width: 24px;
  border-radius: 15px;
  position: absolute;
  right: -1px;
  top: -1px;
`;
const IsDownloadedIcon = styled.View`
  position: absolute;
  z-index: 2;
  top: 1px;
  left: 1px;
  opacity: 0.8;
`;
const FloorText = styled.Text`
font-weight: 600
font-size: 15px
`;
const DetailView = styled.View`
padding-horizontal:10px
flex:1
justify-content:center

`;
const DetailText = styled.Text`
font-size:11px
align-self:center
margin-left:4px
`;
const Row = styled.View`
  flex-direction: row;
`;
const TileWrapper = styled.TouchableOpacity`
  zindex: 1;
`;
