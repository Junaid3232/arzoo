import CreateListButton from 'components/CreateListButton';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { firebase } from '../../firebase/config';
import FloorListItem from 'components/floor/FloorListItem';
import ModifyListButton from 'components/ModifyListButton';
import { ListEditModeContext } from 'context/ListEditModeContext';
import { useUser } from 'context/UserContext';
import NotificationButton from 'components/NotificationButton';
import NotificationsModal from 'components/user/NotificationsModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import { Alert, ActivityIndicator, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
var fs = require('react-native-fs');
import { FilterContext } from 'context/FilterContext';

let currentDataJson = '';
const FloorListScreen = ({
  onListPress,
  receiverData,
  prevRoute,
  setParamsEmpty,
  onPress,
}) => {
  let notificationArray: {
    notificationId: string;
    timeStampDiffrence: any;
    timeStamp: any;
  }[] = [];
  const { user } = useUser();
  const db = firebase.firestore();
  const userListsRef = db.collection('users-collections-lists');
  const userFavoritesRef = db.collection('users-collections-favorites');
  const [editMode, setEditMode] = useState(false);
  const [userLists, setUserLists] = useState({});
  const [userFavourateList, setuserFavourateList] = useState({});
  const [favAmount, setFavAmount] = useState(0);
  const [currentActiveList, setCurrentActiveList] = useState('fav');
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [currentList, setCurrentList] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const floorRef = db.collection('floors');
  const path = fs.DocumentDirectoryPath + '/data.json';
  const pathUserList = fs.DocumentDirectoryPath + '/userList.json';
  var florCat = [];
  var UserflorCat = [];
  var catalog = {};
  var dataContents = {};
  const fetchLists = async () => {
    try {
      if (user) {
        //Retrieve user lists
        currentDataJson = await fs.readFile(path, 'utf8');
        dataContents = JSON.parse(currentDataJson);
        //alert("sdasdas"+dataContents[0].listId);
        // console.log("sdasdas"+JSON.stringify(dataContents.listid));
        readFile();
        let userListDoc = await userListsRef.doc(user).get();
        if (userListDoc.exists) {
          setUserLists(userListDoc.data());
          let userListsData = await Object.keys(userListDoc.data()).splice(
            0,
            Object.keys(userListDoc.data()).length,
          );
          let ListID = userListsData[0];
          Object.entries(userListDoc.data()).map((listItem, index) => {

            if (ListID == dataContents.listid) {
              saveJson(listItem, 1);
            } else {
              saveJson(listItem, 2);
            }
          });
          // console.log('userr doc' + JSON.stringify(userLists));
        } else {
          console.log('[Error] No such document!');
        }
      } else {
        console.log('[ERROR] User not loaded');
      }
    } catch (err) {
      console.log(err);
    }
    // console.log('USERRR LIST', Object.keys(userLists).length);
  };
  const fetchFavorites = async () => {
    try {
      if (user) {
        let userFavsDoc = await userFavoritesRef.doc(user).get();
        if (userFavsDoc.exists) {
          setFavAmount(Object.keys(userFavsDoc.data()).length);
          setuserFavourateList(userFavsDoc.data());
          try {
            const contents = await fs.readFile(path, 'utf8');
            var dataContent = JSON.parse(contents);
            if (dataContent.listid == 'fav') {
              saveJson(userFavsDoc.data(), 1);
            }
          } catch (err) {
            console.log(err);
            saveJson(userFavsDoc.data(), 1);
          }

          // console.log('userFavourateList' + JSON.stringify(userFavourateList));
        } else {
          console.log('does not exist');
        }
      }
    } catch (error) {
      console.log('[ERROR] could not fetch favorites');
    }
  };
  const saveJson = async (floorCatalog, type) => {
    if (type == 1) {
      setLoading(true);
    }
    florCat = [];
    catalog = {};
    catalog.listid = floorCatalog[0] == null ? 'fav' : floorCatalog[0];
    var floordetailList =
      floorCatalog[0] == null ? floorCatalog : floorCatalog[1].floors;

    // console.log(JSON.stringify(floordetailList));
    let floorUidArray = await Object.keys(floordetailList).splice(
      0,
      Object.keys(floordetailList).length,
    );
    for (var key in floordetailList) {
      // console.log(key);
      florCat.push({ id: key });
    }
    // console.log('floorflorCat' + JSON.stringify(florCat));
    getFloorDetail(floorUidArray, 0, catalog, type);
  };
  const readFile = async () => {
    try {
      const contents = await fs.readFile(path, 'utf8');
      var dataContent = JSON.parse(contents);
      // console.log('contentscontents' + JSON.stringify(dataContent));
      fetchFloorImages(dataContent.floorsDetail, dataContent.listid);
      //return("" + contents);
    } catch (e) {
      // alert('asdasda' + e);
      setCurrentActiveList('fav');
    }
  };
  const fetchFloorImages = async (floor, listId) => {
    let isactive = 0;
    for (let i = 0; i < floor.length; i++) {
      try {
        RNFetchBlob.fs
          .exists(floor[i].floorDetail.images.primary.originalId)
          .then(async (exist) => {
            if (exist) {
              console.log('exit');
              if (isactive == floor.length - 1) {
                setCurrentList('active');
                setCurrentActiveList(listId == null ? 'fav' : listId);
              } else {
                isactive = isactive + 1;
              }
            } else {
              console.log('not exit');
              setCurrentList('inactive');
              setCurrentActiveList(listId == null ? 'fav' : listId);
            }
          });
      } catch (err) { }
    }
  };
  const getFloorDetail = async (floorUidArray, position, catalog, type) => {
    let floorDoc = await floorRef.doc(floorUidArray[position]).get();
    if (floorDoc.exists) {
      // let previewUrl = floorDoc.data().url.preview;
      var floorDocs = floorDoc.data();
      //  alert(floorDocs.url.colorMap.split("/").pop())
      if (type == 1) {
        // console.log('floorDocs' + floorDocs.images.primary.roughnessMapId);
        // setCurrentList('active');
        // setCurrentActiveList(catalog.listid);
      }
      if (floorDocs.images.primary.roughnessMapId != null) {
        // let roughnessMapId = await firebase
        //   .storage()
        //   .ref(
        //     `floors/${floorUidArray[position]}/${floorDocs.images.primary.roughnessMapId}`,
        //   )
        //   .getDownloadURL();
        floorDocs.images.primary.roughnessMap =
          floorDocs.images.primary.roughnessMapId + '.png';
      }
      if (floorDocs.images.primary.colorMapId != null) {
        // let colorMapId = await firebase
        //   .storage()
        //   .ref(
        //     `floors/${floorUidArray[position]}/${floorDocs.images.primary.colorMapId}`,
        //   )
        //   .getDownloadURL();
        floorDocs.images.primary.colorMap =
          floorDocs.images.primary.colorMapId + '.png';
      }
      if (floorDocs.images.primary.normalMapId != null) {
        // let normalMapId = await firebase
        //   .storage()
        //   .ref(
        //     `floors/${floorUidArray[position]}/${floorDocs.images.primary.normalMapId}`,
        //   )
        //   .getDownloadURL();
        floorDocs.images.primary.normalMap =
          floorDocs.images.primary.normalMapId + '.png';
      }
      if (floorDocs.images.primary.originalId != null) {
        // let originalId = await firebase
        //   .storage()
        //   .ref(
        //     `floors/${floorUidArray[position]}/thumbnails/${floorDocs.images.primary.originalId}_200x200`,
        //   )
        //   .getDownloadURL();
        floorDocs.images.primary.original =
          floorDocs.images.primary.originalId + '.png';
      }
      florCat[position].floorDetail = floorDocs;
      if (position == floorUidArray.length - 1) {
        catalog.floorsDetail = florCat;
        // console.log('catalog' + JSON.stringify(catalog));
        if (type == 1) {
          // console.log('path' + JSON.stringify(path));
          setCurrentList('active');
          setCurrentActiveList(catalog.listid);
          setLoading(false);
          fs.writeFile(path, JSON.stringify(catalog), (err) => {
            if (err) {
              console.log('Error writing file:', err);
            }
          });
        } else {
          fs.appendFile(pathUserList, JSON.stringify(catalog), (err) => {
            if (err) {
              console.log('Error writing file:', err);
            }
          });
          // UserflorCat.push(catalog);
          // console.log("UserflorCat" + JSON.stringify(UserflorCat));
          // // if (position == floorUidArray.length - 1) {
          //   console.log('pathUserList' + JSON.stringify(UserflorCat));
          //   fs.writeFile(pathUserList, JSON.stringify(UserflorCat), (err) => {
          //     if (err) {
          //       console.log('Error writing file:', err);
          //     }
          //   });
          // }
        }
      } else {
        getFloorDetail(floorUidArray, position + 1, catalog, type);
      }
    }
  };
  const getNotifications = async () => {
    //for getting numbers of notfications
    let currentTime = new Date().getTime();
    const uid = firebase.auth().currentUser?.uid;
    notificationArray.length = 0;
    await firebase
      .firestore()
      .collection('users-notifications')
      .doc(uid)
      .collection('notifications')
      .get()
      .then(async (querySnapshot) => {
        notificationArray.length = 0;
        await querySnapshot.forEach((element) => {
          let timeStamp = element.data().timeStamp;
          let timeStampDiffrence = Math.abs(currentTime - timeStamp) / 36e5;
          const notificationId = element.data().notificationId;
          notificationArray.push({
            notificationId: notificationId,
            timeStampDiffrence: timeStampDiffrence,
            timeStamp: timeStamp,
          });
          for (let i = 0; i < notificationArray.length; i++) {
            if (notificationArray[i].timeStampDiffrence > 72) {
              notificationArray.splice(i, 1);
            }
          }
          notificationArray = [...notificationArray];
        });
      })
      .then(() => {
        setNotificationNumber(notificationArray.length);
      });
  };
  useEffect(() => {
    fetchFavorites();
    fetchLists();
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      fetchLists();
    });
    return unsubscribe;
  }, [user]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotifications();
    });
    fetchLists();
    getNotifications();
    return unsubscribe;
  }, [navigation, modalVisible, editMode]);

  return (
    <ListEditModeContext.Provider value={[editMode, setEditMode]}>
      <Container>
        {prevRoute === 'Contact' ? (
          <View>
            <Header>
              <HeaderIcon onPress={onPress}>
                <Icon name={'chevron-left'} size={35} color={'white'} />
              </HeaderIcon>
              <HeaderText>Select a list to send</HeaderText>
            </Header>
            {Object.keys(userLists).length === 0 && (
              <NoListContainer>
                <NoListText> No List to Share!</NoListText>
              </NoListContainer>
            )}
          </View>
        ) : (
          <Row>
            <CreateListButton />
            <>
              <NotificationButton
                func={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              {editMode ||
                !notificationNumber ||
                notificationNumber === 0 ? null : (
                <Badge
                  value={notificationNumber}
                  status="error"
                  containerStyle={{
                    position: 'absolute',
                    right: '18%',
                    top: -6,
                    zIndex: 1,
                  }}
                  badgeStyle={{ height: 22, width: 22, borderRadius: 14 }}
                  textStyle={{ fontSize: 12, fontWeight: 'bold' }}
                />
              )}
            </>
            <ModifyListButton />
          </Row>
        )}
        {loading ? <ActivityIndicator size={30} color={'red'} /> : null}
        <ListScroll showsVerticalScrollIndicator={false}>
          {prevRoute === 'Contact' ? null : (
            <FloorListItem
              onPress={async () => {
                saveJson(userFavourateList, 1);
              }}
              onDelete={({} = {})}
              uid={'fav'}
              type={'fav'}
              size={favAmount}
              content={userFavourateList}
              isActive={true}
              currentActiveList={currentActiveList}
              CurrentList={currentList}
              setCurrentActiveList={setCurrentActiveList}
            />
          )}
          {Object.entries(userLists).map((listItem, index) => {
            //saveJson(listItem, 2);
            return (
              <FloorListItem
                onPress={async () => {
                  // console.log(path);
                  // const contents = await fs.readFile(pathUserList, 'utf8');
                  // var dataContent = JSON.parse(contents);
                  // for (let i = 0; i < dataContent.length; i++) {
                  //   console.log(
                  //     'dada' + dataContent[i].listid + '..' + listItem[0],
                  //   );
                  //   if (dataContent[i].listid == listItem[0]) {
                  //     Alert.alert('inn');
                  //     setCurrentList('active');
                  //     setCurrentActiveList(listItem[0]);
                  //     setLoading(false);
                  //     fs.writeFile(
                  //       path,
                  //       JSON.stringify(dataContent[i]),
                  //       (err) => {
                  //         if (err) {
                  //           console.log('Error writing file:', err);
                  //         }
                  //       },
                  //     );
                  //   }
                  // }
                  saveJson(listItem, 1);
                }}
                onDelete={() => {
                  fetchLists();
                }}
                type={'normal'}
                key={listItem[0]}
                uid={listItem[0]}
                size={false}
                content={listItem[1]}
                showSender={true}
                currentActiveList={currentActiveList}
                CurrentList={currentList}
                setCurrentActiveList={setCurrentActiveList}
                isActive={false}
              />
            );
          })}
        </ListScroll>
        <NotificationsModal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      </Container>
    </ListEditModeContext.Provider>
  );
};
export default FloorListScreen;
const Container = styled.View`
  background-color: ${(props) => props.theme.primary};
  height: 100%;
  flex: 1;
`;
const Row = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;
const Header = styled.View`
background-color: #02457A
height:40px
flex-direction:row
`;
const HeaderText = styled.Text`
color:white;
font-size:17;
font-weight:bold;
text-align:center;
position:absolute;
left:50
right:50
top:8
`;
const HeaderIcon = styled.TouchableOpacity``;
const ListScroll = styled.ScrollView``;
const NoListText = styled.Text`
text-align:center;
flex:1;
font-size:22px;
text-align:center
color:gray
padding-horizontal:20px
padding-vertical:20%

`;
const NoListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
