import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import 'localization';
import { useNavigation } from '@react-navigation/native';
import { Row } from 'components/common/View';
import Icon from 'react-native-vector-icons/Entypo'
import useTheme from 'hooks/useTheme';
import { Text } from 'components/common/Text';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import { ActivityIndicator } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Image } from 'react-native'
const db = firebase.firestore()
import moment from 'moment';
const windowHeight = Dimensions.get('window').height - 95
const NotificatiosModal = ({ transparent, visible, setVisible, animationType }) => {
    let notificationArray: { senderId: string; senderName: string; senderUserName: string; floorTitle: string; floorLength: number; notificationData: object, notificationId: string, timeStampDiffrence: any, timeStamp: any }[] = [];
    const [listId, setListId] = useState(String)
    const [userNotifications, setUserNotifications] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [acceptLoading, setAcceptLoading] = useState(false)
    const theme = useTheme();
    const navigation = useNavigation()
    const newListId = async () => {
        var dt = new Date().getTime();
        await setListId('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }))
    }
    const getNotifications = async () => {
        let currentTime = new Date().getTime()
        setLoading(true)
        const uid = firebase.auth().currentUser?.uid;
        notificationArray.length = 0
        await firebase
            .firestore()
            .collection("users-notifications")
            .doc(uid)
            .collection('notifications')
            .get()
            .then(async (querySnapshot) => {
                notificationArray.length = 0
                await querySnapshot.forEach((element) => {
                    let timeStamp = element.data().timeStamp;
                    let timeStampDiffrence = Math.abs(currentTime - timeStamp) / 36e5;
                    const senderId = element.data().senderId;
                    const senderName = element.data().senderName;
                    const senderUserName = element.data().senderUserName;
                    const floorTitle = element.data().notificationData.title;
                    const floorLength = Object.keys(element.data().notificationData.floors).length
                    const notificationData = element.data().notificationData
                    const notificationId = element.data().notificationId
                    notificationArray.push({
                        notificationId: notificationId,
                        senderId: senderId,
                        senderName: senderName,
                        senderUserName: senderUserName,
                        floorTitle: floorTitle,
                        floorLength: floorLength,
                        notificationData: notificationData,
                        timeStampDiffrence: timeStampDiffrence,
                        timeStamp: timeStamp
                    });
                    for (let i = 0; i < notificationArray.length; i++) { // for removing notification having more than 72 hrs
                        if (notificationArray[i].timeStampDiffrence > 72) {
                            notificationArray.splice(i, 1)
                        }
                    }
                    notificationArray.sort(function (x, y) {
                        return y.timeStamp - x.timeStamp;
                    })
                    notificationArray = [...notificationArray]
                })
            }).then(() => {
                setUserNotifications(notificationArray)
                setLoading(false)
            });
    }

    const removeNotification = async (item) => {
        const uid = firebase.auth().currentUser?.uid
        await db
            .collection("users-notifications")
            .doc(uid)
            .collection("notifications")
            .where("notificationId", '==', item.notificationId)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                })
            }).then(() => {
                setTimeout(() => {
                    getNotifications();
                }, 500)
            }
            )
    }

    const acceptNotification = (item) => {
        let floorsData = {}
        let senderUserName = {}
        // floorsData = item.notificationData, { senderUserName: item.senderUserName }
        floorsData = item.notificationData
        senderUserName = { senderUserName: item.senderUserName }
        floorsData = { ...floorsData, ...senderUserName }

        const uid = firebase.auth().currentUser?.uid
        removeNotification(item).then(() => {
            newListId().then(() => {
                db.collection("users-collections-lists")
                    .doc(uid)
                    .set({
                        [listId]: floorsData
                        // [listId]: item.notificationData,
                        // senderUserName: item.senderUserName
                    },
                        { merge: true })
                    .then(() => {
                    });
                // delete from notifications table as well 
            })
        })
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        });
        getNotifications()
        return unsubscribe;
    }, [navigation, visible, acceptLoading])

    useEffect(() => {
        getNotifications()
        newListId()
    }, [])
    const renderNotification = ({ item }) => (
        <>
            <ModalContainer>
                <Row>
                    <AvatarContainer>
                        <Avatar source={require('../../assets/images/floor_example_1.jpg')}></Avatar>
                    </AvatarContainer>
                    <NameContainer>
                        <Name>{item.senderName}</Name>
                        <UserNameContainer>{`@${item.senderUserName}`}</UserNameContainer>
                    </NameContainer>
                </Row>
                <Container2>
                    <DescText>Has sent you a list:</DescText>
                    <Description>{item.floorTitle}</Description>
                    <SurfacesContainer>
                        <Icon name="layers" size={16} color={theme.accent} />
                        <SurfacesText>{item.floorLength} surfaces</SurfacesText>
                    </SurfacesContainer>
                    <TimeContainer>
                        <Icon name="stopwatch" size={20} color={theme.accent} />
                        <Desc2Text>You will have {Math.round(72 - item.timeStampDiffrence)} hours to try out this list</Desc2Text>
                    </TimeContainer>
                    <ButtonsContainer>
                        <Button onPress={() => acceptNotification(item)}>
                            <ButtonText>{"Add this list"}</ButtonText>
                        </Button>
                        <ButtonCancel onPress={() => removeNotification(item)}>
                            <Icon name="cross" size={22} color={"white"} />
                        </ButtonCancel>
                    </ButtonsContainer>
                </Container2>
            </ModalContainer>
        </>
    );
    return (
        <Modal transparent={transparent} visible={visible} animationType={animationType}>
            <Container>
                <Window>
                    <Row>
                        <StyledText size="xlarge" weight="600" align="center">{"Notifications"}</StyledText>
                        <ExitButton onPress={() => setVisible(false)}>
                            <Icon name="circle-with-cross" size={25} color={theme.lightGrey} />
                        </ExitButton>
                    </Row>
                    <Separator></Separator>
                    {loading && <LoadingAnimation loading={loading} size="large" color={theme.accent} />}
                    {userNotifications.length === 0 &&
                        <>
                            <NoNotificationIcon source={require('../../assets/images/noNotification.png')} />
                            <NoNotification> No Notification</NoNotification></>}
                    {userNotifications.length > 0 &&
                        <FlatList
                            data={userNotifications}
                            renderItem={renderNotification}
                            keyExtractor={item => item.notificationId}
                            showsVerticalScrollIndicator={false}
                        />}
                </Window>
            </Container>
        </Modal>
    );
}
export default NotificatiosModal;
const Modal = styled.Modal`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Container = styled.View`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Window = styled.View`
    width: ${wp("92%")}px;
    height: ${(windowHeight)}px
    border-radius: ${wp("4%")}px;
   
    background-color: ${props => props.theme.white};
`
const ExitButton = styled.TouchableOpacity`
    padding: ${hp('1%')}px;
    position: absolute;
    right: 0;
`
const ButtonContainer = styled.View`
    padding: 0 ${wp('4%')}px;
`
const StyledText = styled(Text)`
    align-self: center;
    width: 100%;
    margin-top: ${hp('1%')}px;
    font-size:20px
`
const AvatarContainer = styled.View`
margin-left:20px
`
const Avatar = styled.Image`
width: 45px;
height: 45px;
border-radius: 27px;
`
const UserNameContainer = styled.Text`
`
const Name = styled.Text`
font-size:15px;
font-weight:bold
`
const NameContainer = styled.View`
align-self:center;
margin-left:15px
`
const DescText = styled.Text`
font-size:13px
`
const Container2 = styled.View`
margin-top:10px;
padding-horizontal:20px
padding-bottom:10px
`
const Description = styled.Text`
font-size: 13px
font-weight: bold
color: #265191
margin-top:5px
`
const SurfacesContainer = styled.View`
flex-direction: row;
align-items:center
margin-top:5px
`
const SurfacesText = styled.Text`
font-size:13px;
font-weight:600
margin-left:5px
`
const TimeContainer = styled.View`
flex-direction:row
margin-top:5px
`
const Desc2Text = styled.Text`
align-self:center;
font-size:11px
margin-Left:3px
`
const ButtonsContainer = styled.View`
flex-direction:row
`
const Button = styled.TouchableOpacity`
width:40%;
height:28px
background-color: ${({ theme }) => theme.accent};
border-radius: 7px;
justify-content:center
align-items:center
margin-top:10px
`
const ButtonText = styled.Text`
color : white;
font-weight: bold;
font-size:13px
`
const ButtonCancel = styled.TouchableOpacity`
width:8%;
height:28px
background-color:red
border-radius: 7px;
justify-content:center;
align-self:flex-end
align-items:center
margin-left:12px
`
const ModalContainer = styled.View`
margin-top:20px`
const Separator = styled.View`
border-color:skyblue
border-bottom-width:1px
`
const LoadingAnimation = styled(ActivityIndicator)`
    display: ${props => props.loading ? 'flex' : 'none'};
    height: 100%;
    width: 100%;
    
`
const NoNotification = styled(Text)`
align-self:center
font-size: 22px;

`
const NoNotificationIcon = styled(Image)`
align-self:center
width:200px
height:200px
margin-top:50%
`