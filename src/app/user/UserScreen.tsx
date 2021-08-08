import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import 'localization';
import { Text } from 'components/common/Text';
import { ColumnStart, RowSpreadBetween, Flex } from 'components/common/View';
import { UserAttributesButton, IconButton } from 'components/common/Button';
import ProfileHeader from 'components/user/ProfileHeader';
import UserDetail from 'components/UserDetail';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import useTheme from 'hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import LegalModal from 'components/user/LegalModal';
import SettingsSwitch from 'components/user/SettingsSwitch';
import { PrivateModeContext } from 'context/PrivateModeContext';
import PrivateModeModal from 'components/user/PrivateModeModal';
import Icon from 'react-native-vector-icons/AntDesign'
import IIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = firebase.auth()
const logout = () => {
    firebase.auth().signOut()
}
const UserScreen = () => {
    const [unit, setUnit] = useState<any>(true);
    const [privateMode, setPrivateMode] = useContext<any>(PrivateModeContext)
    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();
    const [user] = useAuthState(auth);
    const [modalVisible, setModalVisible] = useState(false)
    const [privateModalVisible, setPrivateModalVisible] = useState(false)
    const [addedContacts, setAddedContacts] = useState<any>([]);
    const [totalContactsLength, setTotalContactsLength] = useState<number>(0)
    const [totalShares, setTotalShares] = useState<number>(0)
    const [active, setActive] = useState()
    const [showWarning, setShowWarning] = useState("true")
    let totalContacts: {
        id: number;
        name: string;
        userName: string;
        status: string;
    }[] = [];
    const [value, loading] = useDocumentData(
        firebase.firestore().doc(`users/${user?.uid}`)
    )

    let addressLines: Array<String> = []
    
    useEffect(() => {
        if (active === true) {
            setUnit('Metric')
        }
        else if (active === false) {
            setUnit('Imperial')

        }
    }, [active])
    useEffect(() => {
        addressLines = [`${value?.address.billing.civicNumber} ${value?.address.billing.street}`, `${value?.address.billing.civicNumber}`, 'test']
    }, [loading])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const uid = firebase.auth().currentUser.uid;
            totalContacts = []
            firebase
                .firestore()
                .collection("users-contacts")
                .doc(uid)
                .collection("contacts")
                .get()
                .then((querySnapshot) => {
                    setTotalContactsLength(querySnapshot.size)
                });
            firebase
                .firestore()
                .collection("users-shares-history")
                .doc(uid)
                .collection("history")
                .get()
                .then((querySnapshot) => {
                    setTotalShares(querySnapshot.size)
                });
        });
        return unsubscribe;
    }, [navigation, totalContacts.length]);
    // console.log("UNit********", unit);
    useEffect(() => { getWarningStatus() }, [showWarning])

    useEffect(() => {
        getUnitStatus()
    }, [])

    const warningCloseButton = async () => {
        setShowWarning("false")
        try {
            await AsyncStorage.setItem("showWarningAsync", 'false')
        } catch (e) {
            // saving error
        }
    }
    const getWarningStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('showWarningAsync')
            if (value !== null) {
                // value previously stored
                setShowWarning(value)
            }
        } catch (e) {
            // error reading value
        }
    }

    const getUnitStatus  = async () => {
        try{
            const value = await AsyncStorage.getItem('activeUnitTypeAsync')
            if(value !== null){
                if(value == 'imperial'){
                    setUnit(true)
                } else {
                    setUnit(false)
                }
            } else {
                await AsyncStorage.setItem('activeUnitTypeAsync', 'imperial')
                setUnit(true)
            }
        } catch(e){
            console.log(`[ERROR]: Unable to get UnitStatus`)
        }
    }

    const setUnitType = async (bool) => {
        try{
            if(bool){
                await AsyncStorage.setItem('activeUnitTypeAsync', 'imperial')
                await setUnit(true)
            } else{
                await AsyncStorage.setItem('activeUnitTypeAsync', 'metric')
                await setUnit(false)
            }
        } catch(e){
            console.log('[ERROR] Unable to set Unit Type')
        }
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <ScreenWrapper showsVerticalScrollIndicator={false} >
                {/* {showWarning === 'true' &&
                    <ProVersionModal>
                        <CloseIcon onPress={() => warningCloseButton()}>
                            <IIcon name="close-circle" size={20} color={"white"} />
                        </CloseIcon>
                        <Icon name={'exclamationcircle'} size={35} color={'white'} />
                        <Text
                            color={'white'}
                            weight={'bold'}
                            align={'center'}
                            size={'large'}>
                            {t('user:pro_inactive')}
                        </Text>
                    </ProVersionModal>} */}
                <HeaderWrapper value={value} />
                <AttrButtonWrapper>
                    <CheckPrivateMode disabled={privateMode === true ? false : true} onPress={() => setPrivateModalVisible(!privateModalVisible)}>
                        <UserAttributesButton link={privateMode === true ? '' : "Contact"} variant={"user-attribute"} title={t('user:contacts')} attribute={totalContactsLength} color={theme.white} />
                    </CheckPrivateMode>
                    <UserAttributesButton link="Subscription" variant={"user-attribute"} title={t('user:account')} attribute={value?.profile?.accountType == 'free' ? t('free') :t('pro')} color={theme.white} params={value?.profile.accountType} />
                    <CheckPrivateMode disabled={privateMode === true ? false : true} onPress={() => setPrivateModalVisible(!privateModalVisible)}>
                        <UserAttributesButton link={privateMode === true ? '' : "Shares"} variant={"user-attribute"} title={t('user:shares')} attribute={totalShares} color={theme.white} />
                    </CheckPrivateMode>
                </AttrButtonWrapper>
                <DetailsButtonWrapper>
                    <UserDetail label={t('user:user')}>@{value?.username}</UserDetail>
                    {
                        value?.contact.phone ?
                            <UserDetail label={t('user:phone')}>{value?.contact?.phone}</UserDetail> :
                            <></>
                    }
                    {
                        value?.businessName ?
                            <UserDetail label={t('user:business')}>{value?.businessName}</UserDetail> :
                            <></>
                    }
                    {
                        value?.address?.biling?.civiNumber ?
                            <UserDetail
                                label={t('user:Address')}
                                lines={[
                                    `${value?.address?.billing?.civicNumber}${value?.address?.billing?.apt ? `-${value?.address?.billing?.apt}` : ""} ${value?.address?.billing?.street},`,
                                    `${value?.address?.billing?.city}, ${value?.address?.billing?.country},`,
                                    `${value?.address?.billing?.postalCode}`,
                                ]}
                            /> :
                            <></>
                    }
                </DetailsButtonWrapper>
                <SettingsButtonWrapper>
                    <IconButton rounded={true} icon="hammer" title={t('user:subscription')} subTitle={value?.profile?.accountType == 'free' ? t('free') :t('pro')} func={() => navigation.navigate('Subscription', value?.profile.accountType)} />
                    <UnitsContainer>
                        <IconButton rounded={true} icon="calculator" title={t('user:units')} />
                        <UnitsTextContainer>
                            {unit ?
                                <Text
                                size="1.8"

                                >{t('user:imperial')}</Text>
                                :
                                <Text
                                    weight="bold"
                                    size="1.8"

                                > {t('user:imperial')}</Text>
                            }
                            <Switch
                                onValueChange={() => {
                                    setUnitType(!unit)
                                }}
                                value={unit}
                                trackColor={{ false: "#DDDFDF", true: "#A6DBEF" }}
                                thumbColor={unit ? "#018ABE" : "#97CADB"}
                            />
                            {unit ?
                                <Text
                                    weight="bold"
                                    size="1.8"
                                >{t('user:metric')}</Text>
                                :
                                <Text
                                    size="1.8"

                                > {t('user:metric')}</Text>
                            }
                        </UnitsTextContainer>
                    </UnitsContainer>
                    {/* <IconButton rounded={true} icon="create" title={t('user:modify_profile')} /> */}
                    <IconButton rounded={true} icon="settings" title={t('user:settings')} func={() => navigation.navigate('Settings')} />
                    <IconButton rounded={true} icon="document-text" title={t('user:legal')} func={() => setModalVisible(!modalVisible)} />
                    <IconButton rounded={true} func={logout} icon="power" color={theme.red} title={t('user:disconnect')} />
                </SettingsButtonWrapper>
            </ScreenWrapper>
            <LegalModal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                setVisible={setModalVisible}
            />
            <PrivateModeModal
                transparent={true}
                animationType="fade"
                visible={privateModalVisible}
                setVisible={setPrivateModalVisible}
            />
        </Container>
    );
}

export default UserScreen;
const Container = styled.SafeAreaView`
    background-color: ${props => props.theme.primary};
`
const HeaderWrapper = styled(ProfileHeader)`
    margin: 25px 0;
`
const AttrButtonWrapper = styled(RowSpreadBetween)`
    margin: 10px 0;
`
const DetailsButtonWrapper = styled(Flex)`
    margin: 10px 0;
    margin-top: 15px;
`
const SettingsButtonWrapper = styled(ColumnStart)`
    margin: 10px 0;
`
const ScreenWrapper = styled(ScrollView)`
   background-color: ${props => props.theme.primary};
   min-height: 100%;
   padding: 0 30px;
`
const Switch = styled.Switch`

`
const UnitsContainer = styled.View`
flex-direction:row
align-items:center
`
const UnitsTextContainer = styled.View`
flex-direction:row
justify-content:space-evenly
flex:1
padding-left:25px
align-items:center
`
const CheckPrivateMode = styled.TouchableOpacity`
`
const ProVersionModal = styled.View`
background-color:	#EE4B2B
justify-content:center;
align-items:center;
border-radius:15px;
padding-horizontal:22px;
padding-vertical:10px
`
const CloseIcon = styled.TouchableOpacity`
position:absolute
top:3px;
right:3px
`