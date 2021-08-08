import FloorCollectionCard from 'components/floor/FloorCollectionCard';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { firebase } from '../../firebase/config';
import FloorHeader from 'components/floor/FloorHeader';
import { ThemeContext } from 'styled-components';
import StoreHomeScreen from './StoreHomeScreen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SubscriptionModal from 'components/store/SubscriptionModal';
import { StoreModalContext } from 'context/StoreModalContext';
import DetailsModal from 'components/store/DetailsModal';

const StoreScreen = ({ navigation }) => {

    //Global States
    const theme = useContext(ThemeContext)

    const [modalActive, setModalActive] = useState(false);
    const [detailsModalActive, setDetailsModalActive] = useState(false);

    //Global Constants
    const db = firebase.firestore()
    const collectionsRef = db.collection("collections")
    //States
    const [collections, setCollections] = useState([])


    const retrieveCollections = () => {
        collectionsRef
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (collections.some(e => e.collectionId === doc.id) !== true) {
                        setCollections([...collections, { collectionId: doc.id, name: doc.data().text, floors: doc.data().floors }])
                    }
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    useEffect(() => {
        retrieveCollections()
    }, [collections]);

    return (
        <SafeContainer>
            <StoreModalContext.Provider value={{modalActive, setModalActive, detailsModalActive, setDetailsModalActive}}>
                <Container>
                    <StoreHomeScreen />
                </Container>
                <SubscriptionModal
                    transparent={true}
                    animationType="fade"
                    visible={modalActive}
                    setVisible={setModalActive}
                />
                <DetailsModal
                    transparent={true}
                    animationType="fade"
                    visible={detailsModalActive}
                    setVisible={setDetailsModalActive}
                />
            </StoreModalContext.Provider>
        </SafeContainer>
    );
}

export default StoreScreen;

const SafeContainer = styled.SafeAreaView`
background-color: ${props => props.theme.primaryDark};
`

const Container = styled.ScrollView`
    background-color: ${props => props.theme.primary};
    height: 100%;
    /* padding: ${hp('1.5%')}px ${wp('4.5%')}px; */

`;

const Content = styled.View`
    align-items: center;
    padding-top: 10px;
`
