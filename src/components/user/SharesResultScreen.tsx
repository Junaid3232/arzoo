
import { SearchBar } from 'components/common/TextInput';
import { Flex } from 'components/common/View';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'components/common/Text';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ViewProps } from 'react-native';
import { SafeAreaView, Image, View } from 'react-native';
import { FC } from 'react';
import SharesListItem from './SharesListItem';
import { FlatList } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config'
import "firebase/firestore";
const db = firebase.firestore();
import moment from 'moment';
interface ResultScreenProps extends ViewProps {
    variant: string
    searchResults?: Array<Object>
    userResults: Array<Object>
    historyData
    getHistory: () => void
}


const SharesResultsScreen: FC<ResultScreenProps> = ({ historyData, getHistory }) => {
    let senderData: { id: number; name: string; userName: string };

    // const getCurrentUser = async () => {
    //     const uid = firebase.auth().currentUser?.uid
    //     await db.collection("users")
    //         .doc(uid)
    //         .get()
    //         .then((querySnapshot) => {
    //             const id = querySnapshot.data().id;
    //             const name = querySnapshot.data().name.first + " " + querySnapshot.data().name.last;
    //             const userName = querySnapshot.data().username;
    //             senderData = {
    //                 id: id,
    //                 name: name,
    //                 userName: userName,
    //             };
    //         });
    //     return senderData
    // }

    const theme = useContext(ThemeContext)
    return (
        <ScreenWrapper>
            <Header>
                {/* <SearchBar /> */}
            </Header>
            <ResultsContainer>
                {historyData.length === 0 ?
                    <NoShareContainer>
                        <NoHistoryIcon source={require('../../assets/images/noShare.png')} resizeMode={"contain"} />
                        <NoHistoryText>You don't have share history yet!</NoHistoryText>
                    </NoShareContainer>
                    :

                    <FlatList
                        data={historyData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <SharesListItem
                                receiverName={item?.receiverName}
                                receiverUsername={item?.receiverUsername}
                                floorTitle={item?.floorTitle}
                                timeStamp={item?.timeStamp}
                                time={item?.time}
                                receiverId={item?.receiverId}
                                senderId={item?.senderId}
                                senderName={item?.senderName}
                                timeStampDifference={item?.timeStampDiffrence}
                                senderUserName={item?.senderUserName}
                                floorData={item?.floorData}
                                historyId={item?.historyId}
                                shareCount={item?.shareCount}
                                getHistory={getHistory}
                            />
                        }

                        keyExtractor={(item, index) => item.index}
                    />}
            </ResultsContainer>
            {/* <ResultsContainer
                stickyHeaderIndices={[0, 2]}>
                {searchResults &&
                    <TextWrapper
                        weight="normal"
                        color={theme.grey}
                        variant="h2">
                        Résultats de recherche
                    </TextWrapper>}

                <ColumnStart>
                    {
                        historyData?.map((item, index) => {
                            {
                                variant === 'contacts' ? (
                                    <IconButton variant={variant} rounded={true} title={item.floorTitle} subTitle={`@Timibouchio`} />
                                ) : (
                                    <SharesListItem  historyData = {historyData}/>
                                )
                            }
                        })
                    }
                </ColumnStart>
                <TextWrapper weight="normal" color={theme.grey} variant="h2">{variant === 'contacts' ? 'Contacts' : 'Partages'}</TextWrapper>
                <ColumnStart>
                    {historyData.map((item, index) => {
                        return (
                            variant === 'contacts' ? (
                                <IconButton variant={variant} rounded={true} title="Timothé Boucher" subTitle={`@Timibouchio`} />
                            ) : (
                                <SharesListItem  historyData = {historyData}/>
                            )

                        )
                    })}
                </ColumnStart> */}
            {/* </ResultsContainer> */}
        </ScreenWrapper>
    );
}
export default SharesResultsScreen;

const ScreenWrapper = styled(SafeAreaView)`
    min-height: 100%;   
    background-color: ${({ theme }) => theme.primary};
    width: 100%;
    flex:1
`
const Header = styled(Flex)`
    flex-direction: row;
    align-items: center; 
    background-color: ${({ theme }) => theme.primary};
`
const ResultsContainer = styled.View`
    width: 100%;
    padding: 0 30px;
    flex:1
`
const NoShareContainer = styled(View)`
align-items: center
justify-content: center
`
const NoHistoryIcon = styled(Image)`
width: 45%
height: 60%
align-self:center
`
const NoHistoryText = styled(Text)`
font-size: 20px
`