import CreateListButton from 'components/CreateListButton';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { firebase } from '../../firebase/config';
import FloorListItem from 'components/floor/FloorListItem';
import ModifyListButton from 'components/ModifyListButton';
import { ListEditModeContext } from 'context/ListEditModeContext';
import { useUser } from 'context/UserContext';
import NotificationButton from 'components/NotificationButton'
import NotificationsModal from 'components/user/NotificationsModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-elements'
import { StackActions } from '@react-navigation/native'
import { View, Alert } from 'react-native';
import moment from 'moment'


const FloorListShareScreen = ({ prevRoute, setParamsEmpty, onPress, route }) => {
    const { user } = useUser();
    const receiverData = route?.params?.item
    const db = firebase.firestore()
    const userListsRef = db.collection("users-collections-lists")
    const userFavoritesRef = db.collection("users-collections-favorites")
    const [editMode, setEditMode] = useState(false);
    const [userLists, setUserLists] = useState({});
    const [favAmount, setFavAmount] = useState(0)
    const [currentActiveList, setCurrentActiveList] = useState('fav');
    const [modalVisible, setModalVisible] = useState(false)
    const [notificationNumber, setNotificationNumber] = useState()
    let senderData: { id: number; name: string; userName: string };
    const navigation = useNavigation();



    const fetchLists = async () => {
        try {
            if (user) {
                //Retrieve user lists
                let userListDoc = await userListsRef.doc(user).get()
                if (userListDoc.exists) {
                    setUserLists(userListDoc.data())
                    console.log("userr doc")

                } else {
                    console.log("[Error] No such document!");
                }
            } else {
                console.log('[ERROR] User not loaded')
            }
        } catch (err) {
            console.log(err)
        }
        console.log("USERRR LIST", Object.keys(userLists).length);

    }
    const fetchFavorites = async () => {
        try {
            if (user) {
                let userFavsDoc = await userFavoritesRef.doc(user).get()
                if (userFavsDoc.exists) {
                    setFavAmount(Object.keys(userFavsDoc.data()).length)
                } else {
                    console.log('does not exist')
                }
            }
        } catch (error) {
            console.log("[ERROR] could not fetch favorites")
        }
    }

    const getNotificationsNumber = () => {
        const uid = firebase.auth().currentUser?.uid;
        firebase
            .firestore()
            .collection("users-notifications")
            .doc(uid)
            .collection('notifications')
            .get()
            .then((querySnapshot) => {

                setNotificationNumber(querySnapshot.size)
            })
    }

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
                };
            });
        return senderData
    }
    const sendFloor = async (notificationData) => {
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
                    timeStamp: timeStamp,
                })
                .then(() => {
                    saveHistory(notificationData)
                });
        })
    }

    const saveHistory = (notificationData) => {
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

    const onListPress = (notificationData) => {
        {

            Alert.alert(
                "Share Floor List",
                "Do you want to share this floor list?",
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

                            sendFloor(notificationData)
                            navigation.navigate('Contact')
                        }
                    }
                ]
            )

        }
    }







    useEffect(() => {
        fetchLists()
        fetchFavorites()
        return () => {
        }
    }, [user])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getNotificationsNumber()
        });
        fetchLists()
        getNotificationsNumber()
        return unsubscribe;
    }, [navigation, modalVisible, editMode]);
    return (
        <ListEditModeContext.Provider value={[editMode, setEditMode]}>
            <Container>
                {/* {prevRoute === 'Contact' ? */}

                <View>
                    {/* <Header>
                        <HeaderContainer>
                            <HeaderIcon onPress={() => navigation.goBack()}>
                                <Icon name={'chevron-left'} size={35} color={'white'} />
                            </HeaderIcon>
                            <HeaderText>Select a list to send</HeaderText>
                        </HeaderContainer>
                    </Header> */}
                    {Object.keys(userLists).length === 0 &&
                        <NoListContainer>
                            <NoListText> No List to Share!</NoListText>
                        </NoListContainer>
                    }
                </View>
                {/* : */}
                {/* <Row>
                        <CreateListButton />
                        <>
                            <NotificationButton func={() => {
                                setModalVisible(!modalVisible)
                            }} />
                            {editMode || !notificationNumber || notificationNumber === 0 ? null :
                                <Badge value={notificationNumber} status="error" containerStyle={{ position: 'absolute', right: "17%", top: -6 }}
                                    badgeStyle={{ height: 28, width: 28, borderRadius: 14 }}
                                    textStyle={{ fontSize: 14, fontWeight: 'bold' }} />}
                        </>
                        <ModifyListButton />
                    </Row>} */}
                {/* {prevRoute === "Contact" ? null : <FloorListItem onPress={() => { }}
                    uid={"fav"}
                    type={'fav'}
                    size={favAmount}
                    content={false}
                    isActive={true}
                    currentActiveList={currentActiveList}
                    setCurrentActiveList={setCurrentActiveList} />} */}

                <ListScroll showsVerticalScrollIndicator={false}>
                    {

                        Object.entries(userLists).map((listItem) => {
                            return (<FloorListItem onPress={() => {
                                onListPress(listItem[1])
                            }}
                                type={'normal'}
                                key={listItem[0]}
                                uid={listItem[0]}
                                size={false}
                                content={listItem[1]}
                                currentActiveList={currentActiveList}
                                setCurrentActiveList={setCurrentActiveList} isActive={false} />)
                        })
                    }
                </ListScroll>
                <NotificationsModal
                    transparent={true}
                    animationType="fade"
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            </Container>
        </ListEditModeContext.Provider >
    );
}
export default FloorListShareScreen;
const Container = styled.View`
    background-color: ${props => props.theme.primary};
    height: 100%;
    flex:1;
`;
const Row = styled.View`
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
  
`
const Header = styled.View`
background-color: #02457A;
flex-direction:row;
align-items:center;
`

const Content = styled.View`
    padding-top: 10px;
`
const HeaderText = styled.Text`
color:white;
font-size:17px;
font-weight:bold;
text-align:center;
padding-vertical:15px;


`
const HeaderIcon = styled.TouchableOpacity`

`
const ListScroll = styled.ScrollView`
    padding-top: 10px;
`
const NoListText = styled.Text`
text-align:center;
flex:1;
font-size:22px;
text-align:center
color:gray
padding-horizontal:20px
padding-vertical:20%

`
const NoListContainer = styled.View`
flex:1;
align-items:center;
justify-content:center;
align-self:center;

`
const HeaderContainer = styled.SafeAreaView`
flex-direction:row;
align-items:center;

`