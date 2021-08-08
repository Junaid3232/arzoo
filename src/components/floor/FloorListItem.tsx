import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import Favorite from '../../assets/images/favorite.svg';
import { useEditMode } from 'context/ListEditModeContext';
import { useEffect } from 'react';
import { firebase } from '../../firebase/config';
import Catalog from '../../assets/images/catalog.svg';
import { useUser } from 'context/UserContext';
import { useNavigation } from '@react-navigation/native';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'components/common/Text';
import { ProgressBar, Colors } from 'react-native-paper';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { View } from 'components/common/View';
import { parse } from '@babel/core';
import { useTranslation } from 'react-i18next';
import { FilterContext } from 'context/FilterContext';

const FloorListItem = ({
  uid,
  type,
  content,
  size,
  currentActiveList,
  onDelete,
  onPress,
  setDeleteSwitch,
  deleteSwitch,
  showSender
}) => {
  const theme = useTheme();
  const { user } = useUser();
  const navigation = useNavigation();
  const [floorImageUrls, setFloorImageUrls] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [downloadedImages, setDownloadedImages] = useState(0);
  const [isCatalogDownloading, setisCatalogDownloading] = useState(false);
  const [CurrentCatelog, setCurrentCatelog] = useState([0]);
  const { t } = useTranslation();
  // console.log("***********CONNNTEEENTTTT", content)
  const [ // from context
    searchFloorType,
    setSearchFloorType,
    searchFloorStore,
    setSearchFloorStore,
    addedFloors,
    setAddedFloors,
    searchFloorColor,
    setSearchFloorColor,
    getSelectedListId,
    setGetSelectedListId
  ] = useContext<any>(FilterContext)
  //Constants
  const db = firebase.firestore();
  const floorRef = db.collection('floors');
  const userListsRef = db.collection('users-collections-lists');
  const [editMode] = useEditMode();
  let totalImage = 0;
  let downloadedImage = 0;
  const isExist = async (path, floorId, type) => {
    let FilePath;
    if (type == 1) {
      FilePath = `floors/${floorId}/thumbnails/${path}_200x200`;
    } else {
      FilePath = `floors/${floorId}/${path}`;
    }
    let dirs = RNFetchBlob.fs.dirs;
    let preview =
      Platform.OS === 'ios'
        ? dirs.DocumentDir +
        '/' +
        path +
        '.png'
        : dirs.PictureDir +
        '/Aroz/' +
        path +
        '.png';
    let isExitpreview = await RNFetchBlob.fs.exists(preview);
    console.log('preview' + preview);
    if (!isExitpreview) {
      let previewRef = await firebase.storage().ref(FilePath).getDownloadURL();
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: preview,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: preview,
          description: 'Image',
        },
      })
        .fetch('GET', previewRef + '')
        .then((res) => {
          if (Platform.OS == 'ios') {
            CameraRoll.save(res.data, 'photo');
          }

          downloadedImage = downloadedImage + 1;
          setDownloadedImages(downloadedImage);
          return true;
        });
    } else {
      downloadedImage = downloadedImage + 1;
      setDownloadedImages(downloadedImage);
      return true;
    }
  };
  const fetchFloorImages = async () => {
    let floorUrlArray = [];
    let UidArray;
    let detailFloor = {};
    if (type == 'fav') {
      detailFloor = content;
    } else {
      detailFloor = content.floors;
    }
    UidArray = Object.keys(detailFloor).splice(
      0,
      Object.keys(detailFloor).length,
    );
    let catCount = 0;
    setDownloadedImages(0);
    setTotalImages(0);
    for (let uid of UidArray) {
      let floorDoc = await floorRef.doc(uid).get();
      if (floorDoc.exists) {
        catCount = catCount + 1;
        setCurrentCatelog(catCount);
        console.log(
          catCount + 'floorUrlArrayUrl' + JSON.stringify(floorDoc.data()),
        );
        if (floorDoc.data().images != null) {
          let previewRef = await firebase
            .storage()
            .ref(
              `floors/${uid}/thumbnails/${floorDoc.data().images?.primary?.originalId
              }_200x200`,
            )
            .getDownloadURL();


          if (floorUrlArray.length < 4) {
            floorUrlArray.push(previewRef);
          }
          console.log('floorUrlArray' + JSON.stringify(floorUrlArray));
          // console.log('preview' + floorDoc.data().url.preview);
          var roughnessMapImage = true;
          var normalMapImage = true;
          var colorMapImage = true;
          var originalImage = true;
          if (floorDoc.data().images.primary.roughnessMapId != null) {
            totalImage = totalImage + 1;
            setTotalImages(totalImage);
            roughnessMapImage = await isExist(
              floorDoc.data().images.primary.roughnessMapId,
              uid,
              2,
            );
          }
          if (floorDoc.data().images.primary.normalMapId != null) {
            totalImage = totalImage + 1;
            setTotalImages(totalImage);
            normalMapImage = await isExist(
              floorDoc.data().images.primary.normalMapId,
              uid,
              2,
            );
          }
          if (floorDoc.data().images.primary.colorMapId != null) {
            totalImage = totalImage + 1;
            setTotalImages(totalImage);
            colorMapImage = await isExist(
              floorDoc.data().images.primary.colorMapId,
              uid,
              2,
            );
          }
          if (floorDoc.data().images.primary.originalId != null) {
            totalImage = totalImage + 1;
            setTotalImages(totalImage);
            originalImage = await isExist(
              floorDoc.data().images.primary.originalId,
              uid,
              1,
            );
          }

          if (
            (originalImage == null ? true : originalImage) &&
            (colorMapImage == null ? true : colorMapImage) &&
            (roughnessMapImage == null ? true : roughnessMapImage) &&
            (normalMapImage == null ? true : normalMapImage)
          ) {
            setisCatalogDownloading(false);
          } else {
            setisCatalogDownloading(true);
          }
          if (floorUrlArray.length < 3) {
            setFloorImageUrls(floorUrlArray);
          }
        }
      } else {
        console.log('[Error] No such document');
      }
    }
    // alert("total"+totalImage);
  };
  const editList = () => {
    navigation.navigate('List', {
      storedListId: uid,
      editList: true,
      content: content,
    });
    setGetSelectedListId(uid)
  };
  const deleteList = async () => {
    if (type !== 'fav') {
      try {
        if (uid && user) {
          await userListsRef.doc(user).update({
            [uid]: firebase.firestore.FieldValue.delete(),
          });
          onDelete();
          setDeleteSwitch(!deleteSwitch)
          console.log(`[DELETED]: "${uid}" was deleted with success`);
        } else {
          console.log('[NOT LOADED] awaiting user');
        }
      } catch (error) {
        console.log(`[ERROR]: Could not delete list with key "${uid}"` + error);
      }
    }
  };
  useEffect(() => {
    setDownloadedImages(downloadedImage + '');
    setTotalImages(totalImage + '');
    if (content) {
      fetchFloorImages();
    }
  }, [content]);
  return (
    <Container
      editMode={!(type === 'fav') && editMode}
      active={currentActiveList === uid}
      onPress={() => {
        if (isCatalogDownloading) {
          if (totalImages == 0) {
            alert('List is empty, please select catlog from edit list');
            return;
          }
          if (totalImages == downloadedImages) {
            onPress();
          } else {
            alert(
              'Catlog images is not downloaded, please download all images from edit list',
            );
          }
        } else {
          onPress();
        }
      }}
      disabled={editMode ? true : false}>
      {CurrentCatelog <
        (type != 'fav' ? Object.keys(content.floors).length + 1 : size + 1) ? (
        isCatalogDownloading == true ? (
          <View>
            <ProgressBar
              progress={parseInt(downloadedImages) / parseInt(totalImages)}
              color={Colors.red800}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text style={{ flex: 1, alignSelf: 'flex-start', marginLeft: 2 }}>
                {isNaN(
                  parseFloat(
                    (parseInt(downloadedImages) / parseInt(totalImages)) * 100,
                  ).toFixed(2),
                )
                  ? 0
                  : parseFloat(
                    (parseInt(downloadedImages) / parseInt(totalImages)) *
                    100,
                  ).toFixed(2)}
                {' %'}
              </Text>
              <Text style={{ flex: 1, textAlign: 'right', marginRight: 2 }}>
                {'Catlog ' + CurrentCatelog}
              </Text>
            </View>
          </View>
        ) : null
      ) : null}
      <Overlay editMode={!(type === 'fav') && editMode}>
        <IconButton delete={true} onPress={() => deleteList()}>
          <MIcon name="delete" size={hp('3.2%')} color={theme.primary} />
        </IconButton>
        <IconButton
          onPress={() =>
            navigation.navigate('Contact', {
              key: 'List',
              notificationData: content,
            })
          }>
          <IIcon name="share-outline" size={hp('3.2%')} color={theme.primary} />
        </IconButton>
        <IconButton onPress={() => editList()}>
          <FIcon name="edit" size={hp('3.2%')} color={theme.primary} />
        </IconButton>

      </Overlay>
      {/* <ListName editMode={!(type === 'fav') && editMode}>
        {type === 'fav' ? t('favorites') : content.title}
      </ListName> */}
      <TimeContainer>
        <ListName editMode={!(type === 'fav') && editMode}>
          {type === 'fav' ? 'Favoris' : content.title}
        </ListName>
        {/* {showSender && <IconContainer>
          <IIcon name="timer" size={hp('3%')} color={theme.accent} />
          <Text variant={'small'}>0 hours left</Text>
        </IconContainer>} */}
      </TimeContainer>
      <Row editMode={!(type === 'fav') && editMode}>
        {type === 'fav' ? (
          <Favorite width={40} height={40} />
        ) : (
          <ListImages>
            <FloorImage
              source={{ uri: floorImageUrls[0] }}
              style={{ top: 0, right: 0 }}
            />
            <FloorImage
              source={{ uri: floorImageUrls[1] }}
              style={{ top: 15, right: 15 }}
            />
            <FloorImage
              source={{ uri: floorImageUrls[2] }}
              style={{ top: 30, right: 30 }}
            />
          </ListImages>
        )}
        <ListDetails>
          <Row>
            <Catalog width={25} height={25} />
            <SurfaceText>
              {type != 'fav' ? Object.keys(content.floors).length : size}{' '}
              surfaces
            </SurfaceText>
          </Row>
          <Row>
            <DetailsText>
              {type == 'fav'
                ? t('favorites_contain')
                : content.desc}
            </DetailsText>
            {showSender && content?.senderUserName && <ListSentByText>
              <Text variant={'small'}>List sent to you by :</Text>
              <Text variant={'small'}>@{content?.senderUserName}</Text>
            </ListSentByText>}
          </Row>
        </ListDetails>
        {currentActiveList === uid ? (
          <Wheel>
            {/* <StyledText size="large" weight="600">Actif</StyledText> */}
            {/* <Icon name={'check'} size={30} color={theme.lightGreen} /> */}
          </Wheel>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};
export default FloorListItem;
const Overlay = styled.View`
  display: ${(props) => (props.editMode ? 'flex' : 'none')};
  background-color: rgba(158, 158, 158, 0.3);
  width: 120%;
  position: absolute;
  height: 125%;
  z-index: 10;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding-top: ${hp('2%')}px;
`;
const IconButton = styled.TouchableOpacity`
  padding: ${wp('3.2%')}px;
  margin: ${wp('3%')}px;
  background-color: ${props => props.delete ? props.theme.red : props.theme.accent};;
  border-radius: ${wp('100%')}px;
`;
const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: ${hp('1.7%')};
  margin: ${(props) =>
    props.active && !props.editMode ? '2px 10px' : '4.75px 10px'};
  border-color: ${(props) =>
    props.active && !props.editMode
      ? props.theme.accent
      : props.theme.borderColor};
  border-width: ${(props) =>
    props.active && !props.editMode ? '3px' : '0.25px'};
  flex-direction: column;
  padding: ${(props) =>
    props.active && !props.editMode ? '10px 22px' : '10px 25px'};
  overflow: hidden;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('1.2%')}px;
  opacity: ${(props) => (props.editMode ? 0.6 : 1)};
`;
const ListName = styled.Text`
  font-size: ${hp('2.2%')}px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-top: ${hp('0.3%')};
  margin-bottom: ${hp('1.5%')};
  opacity: ${(props) => (props.editMode ? 1 : 1)};
`;
const ListImages = styled.View`
  align-content: center;
  justify-content: center;
  width: ${wp('10%')}px;
  height: ${hp('8%')}px;
`;
const FloorImage = styled.Image`
  height: ${wp('18%')}px;
  width: ${wp('18%')}px;
  position: absolute;
`;
const SurfaceText = styled.Text`
  font-size: ${hp('1.8%')}px;
  font-weight: 600;
  margin-left: ${wp('2%')}px;
`;
const ListDetails = styled.View`
  width: 195px;
  margin-left: 25px;
  height: 60px;
`;
const DetailsText = styled.Text`
  font-size: ${hp('1.8%')}px;
`;
const Wheel = styled.View`
  height: ${hp('12%')}px;
  width: ${hp('12%')}px;
  position: absolute;
  border-radius: 75px;
  border-width: ${hp('3%')}px;
  border-color: ${(props) => props.theme.lightAccent};
  align-items: center;
  justify-content: center;
  right: ${wp('-14%')}px;
  bottom: ${hp('-8%')}px;
`;
const StyledText = styled(Text)`
  bottom: ${hp('3%')}px;
  right: ${wp('5%')}px;
`;
const TimeContainer = styled.View`
flex-direction:row;
justify-content:space-around
`;
const IconContainer = styled.View`
margin-left:-15px;
align-items:center;
`
const ListSentByText = styled.View`
margin-top:-7px
`