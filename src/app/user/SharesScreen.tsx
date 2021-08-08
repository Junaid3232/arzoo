import React, { useEffect, useState } from 'react';
import SharesResultsScreen from 'components/user/SharesResultScreen';
import { firebase } from '../../firebase/config'
import "firebase/firestore";
const db = firebase.firestore();
import moment from 'moment';

const SharesScreen = () => {
    let historyArray: {
        historyId: number;
        receiverName: string;
        receiverUsername: string;
        floorTitle: string
        time: any
        senderName: string
        senderId
        floorData
        timeStamp
        senderUserName
        receiverId
        shareCount: number;
        timeStampDiffrence: number

    }[] = [];


    useEffect(() => {
        getHistory()
    }, [])

    const [history, setHistory] = useState<any>([])

    const getHistory = () => {
        const uid = firebase.auth().currentUser?.uid
        firebase
            .firestore()
            .collection("users-shares-history")
            .doc(uid)
            .collection("history")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    let currentTime = new Date().getTime()
                    let timeStamp = element.data().timeStamp;
                    let timeStampDiffrence = Math.abs(currentTime - timeStamp) / 36e5;
                    const floorData = element.data().notificationData
                    const historyId = element.data().historyId;
                    const receiverName = element.data().receiverName;
                    const receiverUsername = element.data().receiverUserName;
                    const receiverId = element.data().receiverId
                    const senderName = element.data().senderName;
                    const senderUserName = element.data().senderUserName;
                    const senderId = element.data().senderId
                    const floorTitle = element.data().notificationData.title
                    const shareCount = element.data().shareCount
                    const time = element.data().time


                    historyArray.push({
                        historyId: historyId,
                        receiverName: receiverName,
                        receiverUsername: receiverUsername,
                        senderName: senderName,
                        senderId: senderId,
                        floorTitle: floorTitle,
                        time: time,
                        timeStamp: timeStamp,
                        timeStampDiffrence: timeStampDiffrence,
                        floorData: floorData,
                        senderUserName: senderUserName,
                        receiverId: receiverId,
                        shareCount: shareCount

                    });

                    historyArray.sort(function (x, y) {
                        return y.timeStamp - x.timeStamp;
                    })
                    setHistory(historyArray)

                })
            })

    }

    return (
        <SharesResultsScreen
            variant="shares"
            userResults={["test", "test2"]}
            historyData={history}
            getHistory={getHistory}
        />
    );
}
export default SharesScreen;