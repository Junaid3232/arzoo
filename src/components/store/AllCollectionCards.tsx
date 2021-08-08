import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'components/common/Text';
import CollectionCard from './CollectionCard';
import { firebase } from '../../firebase/config';

const AllCollectionCards = ({ type }) => {

    //Global Constants
    const db = firebase.firestore()
    const collectionsRef = db.collection("collections")
    const storeRef = db.collection("store")
    //States
    const [collections, setCollections] = useState([])

    const retrieveCollections = async (type) => {

        //Retrieve Collections dependent on type
        let typeDoc;
        if(type == 'featured'){
            typeDoc = await storeRef.doc('featured').get()
        } else if(type == 'popular'){
            typeDoc = await storeRef.doc('popular').get()
        } else if(type == 'free'){
            typeDoc = await storeRef.doc('free').get()
        }
        let packageCollections = [];
        if (typeDoc.exists) {
          Object.entries(typeDoc.data()).map((entry) => {
            const [key, value] = entry;
            if (value.active === true && !packageCollections.includes(key)) {
              packageCollections.push(key);
            }
          });
        } else {
          console.log("[Error] No such document!");
        }

        //Retrieve Floors for each collections
        collectionsRef
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (collections.some(e => e.collectionId === doc.id) !== true) {
                        setCollections([...collections, { collectionId: doc.id, name: doc.data().text, floors: doc.data().floors, tags: doc.data().tags, desc: doc.data().desc }])
                    }
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    useEffect(() => {
        retrieveCollections(type)
    }, [collections]);

    return (
        <Container>
            <StyledText
                size="xlarge"
                weight="600">
                {type == 'popular' ? 'Most Popular' : 'Featured'}
            </StyledText>
            <SideScroll horizontal={true}>
                {
                    collections &&
                    collections.map((collection)=>{
                        return(
                            <CollectionCard
                                collection={collection}
                                size={'normal'}
                                imageLink={require('assets/images/image_porcelain.jpg')} />
                        )
                    })
                }
            </SideScroll>
        </Container>
    );
}

export default AllCollectionCards;

const Container = styled.View`
  
`;

const StyledText = styled(Text)`
    padding: ${hp('1.5%')}px ${wp('3%')}px;
`

const SideScroll = styled.ScrollView`
    padding-bottom: ${hp('1.5%')}px;
`