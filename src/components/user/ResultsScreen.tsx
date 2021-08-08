
import { ColumnStart, Flex, View } from "components/common/View";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "components/common/Text";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Alert, NativeModules, ScrollView, ViewProps } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, FlatList } from "react-native";
import { FC } from "react";
import { firebase } from "../../firebase/config";
import { ActivityIndicator } from 'react-native-paper';

import ContactInfoModel from '../user/ContactInfoModel'
const db = firebase.firestore();
import "firebase/firestore";

import ContactCard from '../user/ContactCard'
import { TabActions } from '@react-navigation/native';

import moment from 'moment';
import { useTranslation } from "react-i18next";


interface ResultScreenProps extends ViewProps {
  variant: string;
  searchResults: string;
  userResults: string;
  placeholder: string;
  onChangeText: string;
  userContacts: object;
  search: string;
  notificationData: any
  prevRoute: any
}
let usersArray: { id: number; name: string; userName: string }[] = [];
const userContacts: { id: number; name: string; userName: string }[] = [];
let addedContactsArray: {
  id: number;
  name: string;
  userName: string;
  status: string;
}[] = [];
let senderData: { id: number; name: string; userName: string };
const ResultsScreen: FC<ResultScreenProps> = ({
  //   variant,
  searchResults,
  search,
  notificationData,
  prevRoute
}) => {
  const theme = useContext(ThemeContext);
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);
  const [resultsFound, setResultsFound] = useState<any>([]);
  const [addedContacts, setAddedContacts] = useState<any>([]);
  const [variant, setVariant] = useState<any>([]);
  const results: Array<any> = [];
  const {t} = useTranslation();
  const [searchFlag, setSearchFlag] = useState(false);
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modelLoading, setModelLoading] = useState(false)
  const navigation = useNavigation()
  const getAllUsers = () => {
    setFetchedUsers([])
    usersArray = []
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const id = element.id;
          const name =
            element.data().name.first + " " + element.data().name.last;
          const userName = element.data().username;
          const status = element.data().status;
          usersArray.push({
            id: id,
            name: name,
            userName: userName,
          });
          // const userContacts = [
          //   ...new Map( // to remove duplicate data
          //     usersArray.map((item) => [JSON.stringify(item), item])
          //   ).values(),
          // ];
          setFetchedUsers(usersArray); // set to state for searching
        });
      });
  };

  const getAddedContacts = () => {
    const uid = firebase.auth().currentUser.uid;
    setLoading(true)
    addedContactsArray = []
    firebase
      .firestore()
      .collection("users-contacts")
      .doc(uid)
      .collection("contacts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const id = element.data().id;
          const name = element.data().name;
          const userName = element.data().userName;
          const status = element.data().status;
          addedContactsArray.push({
            id: id,
            name: name,
            userName: userName,
            status: status,
          });
        });
        setAddedContacts(addedContactsArray); // if text box is empty added contacts are shown
        setResultsFound(addedContactsArray); //initially added contacts are shown
        setLoading(false);
        setModelLoading(false)
        setModalVisible(false)
        setLoading(false);
      });

  };
  const addUserToContacts = (item) => {
    setModelLoading(true)
    const uid = firebase.auth().currentUser.uid;
    db.collection("users-contacts")
      .doc(uid)
      .collection("contacts")
      .doc()
      .set({
        id: item.id,
        name: item.name,
        userName: item.userName,
        status: "added",
      })
      .then(() => {
        setResultsFound(addedContacts);
        getAddedContacts();
        setSearchFlag(false);
        setModelLoading(false)
      });
    setModalVisible(false)
  };
  useEffect(() => {
    getAllUsers();
    getAddedContacts();
  }, []);
  const searchingFunction = () => {
    setResultsFound([]);
    for (let i = 0; i < fetchedUsers.length; i++) {
      if (
        fetchedUsers[i].userName !== undefined &&
        fetchedUsers[i].userName.length > 0
      ) {
        if (
          fetchedUsers[i].name.indexOf(searchResults) >= 0 ||
          fetchedUsers[i].userName.indexOf(searchResults) >= 0
        ) {
          results.push(fetchedUsers[i]);
          setResultsFound(results);
          setSearchFlag(true);
        }
        if (searchResults.length === 0) {
          setResultsFound(addedContacts);
          setSearchFlag(false);
        }
      }
    }
  };
  const removeContact = (item) => {
    const uid = firebase.auth().currentUser.uid;
    setModelLoading(true)
    addedContactsArray = []
    db.collection("users-contacts")
      .doc(uid)
      .collection("contacts")
      .where("userName", '==', item.userName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
        setModelLoading(false)
        setModalVisible(false)
        getAddedContacts()
        setResultsFound(addedContactsArray)
      });
  }
  useEffect(() => {
    searchingFunction();
  }, [searchResults]);
  //function to show alreart when user comes from List Screen
  const onSharePress = (item) => {
    console.log("******ITEM", item);

    Alert.alert(
      "Share Floor List",
      "Do you want to share floor to this contact?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("Cancel Pressed")

          },
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => {
            sendFloor(item)
            navigation.pop()
          }
        }
      ]
    )
  }

  //function for getting current user
  const getCurrentUser = async () => {
    const uid = firebase.auth().currentUser?.uid
    await db.collection("users")
      .doc(uid)
      .get()
      .then((querySnapshot) => {
        const id = querySnapshot.data().id;
        const name = querySnapshot.data().name.first + " " + querySnapshot.data().name.last;
        const userName = querySnapshot.data().username;

        senderData = {
          id: id,
          name: name,
          userName: userName,
        }
      });
    return senderData
  }
  const sendFloor = async (receiverData) => {
    let timeStamp = new Date().getTime()
    await getCurrentUser().then((res) => {
      senderData = res
      db.collection("users-notifications")
        .doc(receiverData?.id)
        .collection('notifications')
        .doc()
        .set({
          notificationId: Date.now().toString(36) + Math.random().toString(36).substr(2),
          senderId: senderData?.id,
          senderName: senderData?.name,
          senderUserName: senderData?.userName,
          receiverId: receiverData?.id,
          receiverUserName: receiverData?.userName,
          notificationData: notificationData,
          timeStamp: timeStamp
        })
        .then(() => {
          saveHistory(receiverData)
        });
    })
  }
  const saveHistory = (receiverData) => {
    let timeStamp = new Date().getTime()
    const uid = firebase.auth().currentUser?.uid
    db.collection("users-shares-history")
      .doc(uid)
      .collection("history")
      .doc()
      .set({
        historyId: Date.now().toString(36) + Math.random().toString(36).substr(2),
        senderId: senderData?.id,
        senderName: senderData?.name,
        senderUserName: senderData?.userName,
        receiverName: receiverData?.name,
        receiverUserName: receiverData?.userName,
        notificationData: notificationData,
        receiverId: receiverData?.id,
        time: moment(new Date()).format("MMMM DD hh:mm a"),
        timeStamp: timeStamp,
        shareCount: 1
      })
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <ContactCard
          rounded={true}
          title={item.name}
          subTitle={`@${item.userName}`}
          variant={item.status === "added" && "added"}
          onPress={() => { addUserToContacts(item) }}
          onPressShare={() => {
            {
              prevRoute ?
                onSharePress(item)
                :
                navigation.navigate('FloorsListShare', { item })
              // navigation.navigate('Floor', {
              //   screen: 'Floor',
              //   params: { key: 2, prevRoute: 'Contact', item },
              // })
            }
          }}
          func={() => {
            setSelectedItem(item)
            setModalVisible(!modalVisible)
          }}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper>
      {loading && <ActivityIndicator color={theme.accent} />}
      <ResultsContainer>
        {searchFlag === false && search.length === 0 && loading === false ? (
          <TextWrapper weight="normal" color={theme.grey} variant="h2">
            Contacts
          </TextWrapper>
        ) : searchFlag === true ? (
          <TextWrapper weight="normal" color={theme.grey} variant="h2">
            Résultats de recherche
          </TextWrapper>
        ) : null}
        {addedContacts.length === 0 && search.length === 0 ? (
          <TextNoContacts weight="normal" color={theme.grey} variant="h2">
          {t('user:no_contacts')}
          </TextNoContacts>
        ) : null}
        {resultsFound.length > 0 ? (
          <FlatList
            data={[...resultsFound]}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            style={{ height: '100%' }}
          />
        ) : null}
        <ContactInfoModel
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          setVisible={setModalVisible}
          modelLoading={modelLoading}
          removeContact={() => removeContact(selectedItem)}
          addContact={() => addUserToContacts(selectedItem)}
          item={selectedItem}
          variant={selectedItem?.status}
        />
      </ResultsContainer>
    </ScreenWrapper>
  );
};
export default ResultsScreen;
const ScreenWrapper = styled(SafeAreaView)`
  min-height: 100%;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
`;
const Header = styled(Flex)`
  flex-direction: row;
  align-items: center;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.primary};
`;
const TextWrapper = styled(Text)`
  background-color: ${({ theme }) => theme.primary};
`;
const TextNoContacts = styled(Text)`
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-top: 60%;
  text-align: center;
`;
const ResultsContainer = styled.View`
  width: 100%;
  padding: 0 30px;
`;
const LoadingAnimation = styled(ActivityIndicator)`
    display: ${props => props.loading ? 'flex' : 'none'};
    height: 100%;
    width: 100%;   
`
