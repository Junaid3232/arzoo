import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Catalog from '../../assets/images/catalog.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import CatalogTag from '../CatalogTag';
import { firebase } from '../../firebase/config';
import _ from 'lodash/object';
import { useUser } from 'context/UserContext';
import useTheme from 'hooks/useTheme';

const FloorCollectionCard = ({collection}) => {
    const [inCatalog, setInCatalog] = useState(true)
    const theme = useTheme();
    const [collectionPreview, setCollectionPreview] = useState([])
    const { user } = useUser();


    const db = firebase.firestore()
    const userCollectionRef = db.collection("users-collections").doc(`${user}`)

    const fetchUserCollectionStatus = () => {
        userCollectionRef.get().then((doc) => {
            if (doc.exists) {
                let currentDoc = doc.data()
                currentDoc = currentDoc[collection.collectionId]
                if(currentDoc){
                    setInCatalog(currentDoc.active)
                }
            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }



    const addCollection = () => {
        db.collection("users-collections").doc(user).set({
            [collection.collectionId]: {
                active: true
            }
        }, {merge: true})
        setInCatalog(true)
    }

    const removeCollection = () => {
        db.collection("users-collections").doc(user).set({
            [collection.collectionId]: {
                active: false
            }
        }, {merge: true})
        setInCatalog(false)
    }

    useEffect(() => {
        fetchUserCollectionStatus()
        Object.entries(collection.floors).forEach((entry) => {
            const [key, value] = entry;
            if(collectionPreview.length === 3){
                return
            } else if(value.preview === true){
                setCollectionPreview([...collectionPreview, key])
            }
        })
      }, [collectionPreview]);

    return (
        <Container>
            <CollectionTitle>{collection.name.fr.name}</CollectionTitle>
            <Row>
                <CollectionImages>
                    <FloorImage style={{ top: '5%', right: '5%', backgroundColor: 'grey' }} />
                    <FloorImage style={{ top: '17%', right: '15%', backgroundColor: 'blue' }} />
                    <FloorImage style={{ top: '29%', right: '25%', backgroundColor: 'orange' }} />
                </CollectionImages>
                <CollectionDetails>
                    <Row>
                        <Catalog width={25} height={25} color={"blue"} />
                        <SurfaceText>{Object.keys(collection.floors).length} surfaces</SurfaceText>
                    </Row>
                    <WrapRow>
                        <CatalogTag>Bois Franc</CatalogTag>
                    </WrapRow>
                    <CustomButton color={theme.accent}>
                        <Icon name="ellipsis-horizontal-circle" size={24} color={theme.white} style={{ marginLeft: 5, marginRight: 5 }} />
                        <ButtonText color={theme.white}>Plus de détails</ButtonText>
                    </CustomButton>
                    {!inCatalog ? (
                        <CustomButton color={theme.green} onPress={() => addCollection()}>
                            <Icon name="add-circle" size={24} color={theme.white} style={{ marginLeft: 5, marginRight: 5 }} />
                            <ButtonText color={theme.white}>Ajouter à mon catalogue</ButtonText>
                        </CustomButton>
                    ) : (
                        <CustomButton color={theme.red} onPress={() => removeCollection()}>
                            <Icon name="close-circle" size={24} color={theme.white} style={{ marginLeft: 5, marginRight: 5 }} />
                            <ButtonText color={theme.white}>Retirer de mon catalogue</ButtonText>
                        </CustomButton>
                    )}
                </CollectionDetails>
            </Row>
        </Container>
    );
}

export default FloorCollectionCard;

const Container = styled.View`
    background-color: white;
    width: 95%;
    height: 220px;
    border-radius: 15px;
    border-color: ${props => props.theme.borderColor};
    border-width: 0.5px;
    margin-bottom: 5px;
    flex-direction: column;
    padding: 10px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
`

const WrapRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 8px;
`

const CollectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    height: 15%;
    margin-top: 3px;

`

const CollectionImages = styled.View`
    width: 30%;
    height: 175px;
    align-content: center;
    justify-content: center;
`

const FloorImage = styled.Image`
    background-color: gray;
    height: 75px;
    width: 75px;
    position: absolute;
`

const SurfaceText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-left: 8px;
`

const CollectionDetails = styled.View`
    width: 70%;
    height: 175px;
    padding-left: 3%;
`

const CustomButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    background-color: ${props => props.color};
    padding: 2px;
    width: 230px;
    margin: 3px 0;
`

const ButtonText = styled.Text`
    color: ${props => props.color};
    font-weight: 700;
    font-size: 15px;
`
