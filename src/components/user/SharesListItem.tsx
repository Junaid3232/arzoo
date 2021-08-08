import { IconButton } from 'components/common/Button';
import { ColumnStart, Row } from 'components/common/View';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/common/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ViewProps } from 'react-native';
import { FC } from 'react';
import ContactCard from './ContactCard'
import "firebase/firestore";
import { firebase } from '../../firebase/config'
const db = firebase.firestore();
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface ShareListItemProps extends ViewProps {
    sent?: boolean,
    downloaded?: boolean,
    receiverName?: string,
    floorTitle?: string,
    title?: string,
    receiverUsername?: string,
    timeStamp?: any,
    time?: any,
    receiverId,
    floorData,
    senderId,
    senderName,
    senderUserName,
    historyId?: string,
    shareCount?: number,
    // timeStampDifference?: number
    getHistory?: () => void
}
const SharesListItem: FC<ShareListItemProps> = ({
    receiverName,
    floorTitle,
    receiverUsername,
    time,
    receiverId,
    floorData,
    senderId,
    senderName,
    senderUserName,
    historyId,
    shareCount,
    getHistory,
    // timeStampDifference,
    timeStamp
}) => {
    const theme = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation();
    // const [timeRemaining, setTimeRemaining] = useState<any>(timeStampDifference)
    let currentTime = new Date().getTime()
    timeStamp = Math.abs(currentTime - timeStamp) / 36e5; // for finding difference of hrs 

    //     floorTitle,
    //     receiverUsername,
    //     time,
    //     receiverId,
    //     floorData,
    //     senderId,
    //     senderName,
    //     senderUserName);




    const resendFloor = () => {
        let timeStamp = new Date().getTime()
        setLoading(true)
        db.collection("users-notifications")
            .doc(receiverId)
            .collection('notifications')
            .doc()
            .set({
                notificationId: Date.now().toString(36) + Math.random().toString(36).substr(2),
                senderId: senderId,
                senderName: senderName,
                senderUserName: senderUserName,
                receiverId: receiverId,
                receiverUserName: receiverUsername,
                notificationData: floorData,
                timeStamp: timeStamp
            })
            .then(() => {
                setLoading(false)
                setShareCount()
                // console.log(" RESENDED");
            });
    }

    const setShareCount = () => {
        const uid = firebase.auth().currentUser?.uid
        db.collection("users-shares-history")
            .doc(uid)
            .collection("history")
            // .doc()
            .where('historyId', '==', historyId)
            .get()
            .then(snapshots => {
                if (snapshots.size > 0) {
                    snapshots.forEach(element => {
                        db.collection("users-shares-history")
                            .doc(uid)
                            .collection("history")
                            .doc(element.id)
                            .update({ shareCount: element.data().shareCount + 1 })
                    })
                }
                getHistory()
            })
    }

    // const fetchShareCount = () => {
    //     const uid = firebase.auth().currentUser?.uid
    //     db.collection('users-shares-history')
    //     .doc(uid)
    //     .collection("history")
    //     .where('historyId', '==' , historyId)
    //     .get()
    //     .then((querySnapshot)=>{

    //     })
    // }


    return (
        <>
            <IconButton rounded={true} variant="share" title={receiverName} subTitle={`@${receiverUsername}`} icon="person-circle-outline" size={55} onPress={() => resendFloor(historyId)} loading={loading} shareCount={shareCount} />

            <ShareDetails>
                <Text size="13px">{t("user:you_shared")}</Text>
                <Text size="14px" weight="bold">{floorTitle}</Text>
                <TimestampWrapper>
                    <Icon name="checkmark" color={theme.accent} size={20} />
                    <Text size="13px" color={theme.grey}>{t('user:sent_the')}{time}</Text>
                </TimestampWrapper>
                {/* <TimestampWrapper>
                    <Icon name="checkmark-done" color={theme.accent} size={20} />
                    <Text size="13px" color={theme.grey}>{t('user:downloaded')} March 10th at 10:45</Text>
                </TimestampWrapper> */}
                {72 - timeStamp > 0 && <TimestampWrapper>
                    <Icon name="alarm" color={theme.accent} size={20} />
                    <Text size="13px" color={theme.grey}>{t('user:time_left_1')}{72 - timeStamp?.toFixed(0)} hours {t('user:time_left_2')}</Text>
                </TimestampWrapper>}
            </ShareDetails>
        </>
    );
}

export default SharesListItem;
const ShareDetails = styled(ColumnStart)`
    margin-left: 70px;
`
const TimestampWrapper = styled(Row)`
`
const SmallButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.accent};;
`