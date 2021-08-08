import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'components/common/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import useTheme from 'hooks/useTheme';
import { Row, RowSpreadBetween, RowCentered, Flex } from 'components/common/View';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStoreModal } from 'context/StoreModalContext';
import { useUser } from 'context/UserContext';
import { firebase } from '../../firebase/config';

const CollectionCard = ({ type, size, collection }) => {
    const theme = useTheme()
    const [inCatalog, setInCatalog] = useState(true)

    const { setModalActive, setDetailsModalActive } = useStoreModal();
    const user = useUser();
    const db = firebase.firestore()
    const userCollectionRef = db.collection("users-collections").doc(`${user}`)

    const fetchUserCollectionStatus = () => {
        userCollectionRef.get().then((doc) => {
            if (doc.exists) {
                let currentDoc = doc.data()
                currentDoc = currentDoc[collection.collectionId]
                if (currentDoc) {
                    setInCatalog(currentDoc.active)
                }
            } else {
                console.log("[ERROR] No such document! Can't fetch user collections");
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
        }, { merge: true })
        setInCatalog(true)
    }

    const removeCollection = () => {
        db.collection("users-collections").doc(user).set({
            [collection.collectionId]: {
                active: false
            }
        }, { merge: true })
        setInCatalog(false)
    }

    useEffect(() => {
        fetchUserCollectionStatus()
    }, [collection])

    return (
        <Container size={size}>
            <Title size="normal" weight="600">Collection complète de planchers Flor Déco</Title>

            <RowContainer>
                <ImageContainer>
                    <FloorImage
                        resizeMode="center"
                        source={require('assets/images/floor_example_1.jpg')}
                        style={{ top: wp('0%'), right: wp('2%') }} />
                    <FloorImage
                        resizeMode="center"
                        source={require('assets/images/floor_example_2.jpg')}
                        style={{ top: wp('4%'), right: wp('5%') }} />
                    <FloorImage
                        resizeMode="center"
                        source={require('assets/images/floor_example_1.jpg')}
                        style={{ top: wp('8%'), right: wp('8%') }} />
                    <FloorImage
                        resizeMode="center"
                        source={require('assets/images/floor_example_2.jpg')}
                        style={{ top: wp('12%'), right: wp('11%') }} />
                </ImageContainer>
                <DetailsContainer>
                    <Row>
                        <Icon name="layers" color={theme.accent} size={20} />
                        <SurfaceAmount weight="600">120 surfaces</SurfaceAmount>
                    </Row>
                    <TagContainer>
                        {
                            collection.tags.en.map((tag, index) => {
                                return (
                                    <Tag
                                        key={index}
                                        weight="600"
                                        size={hp('1.65%')}
                                        color={theme.white}>
                                        {tag}
                                    </Tag>
                                )
                            })
                        }
                    </TagContainer>
                </DetailsContainer>
            </RowContainer>
            <BottomContainer>
                <ButtonContainer>
                    <DetailsButton>
                        <Icon name="ellipsis-vertical" size={wp('6%')} />
                    </DetailsButton>
                    <AddButton>
                        <Icon name="add" color="white" size={wp('6%')} />
                    </AddButton>
                </ButtonContainer>
                <CompanyImage
                    resizeMode="center"
                    source={require('assets/images/rona.png')} />
            </BottomContainer>
        </Container>
    );
}

export default CollectionCard;

const Container = styled.View`
    background-color: white;
    width:  ${props => props.size == 'large' ? `${wp('95%')}px` : `${wp('88%')}px`};
    border-radius: ${hp('1%')}px;
    margin-left: ${wp('2.5%')}px;
    margin-right: ${wp('2.5%')}px;
    padding: ${wp('1%')}px ${wp('4%')}px;
    border-width: 0.25px;
    border-color: ${({ theme }) => theme.lightAccent};
`;

const Title = styled(Text)`
    text-align: center;
    margin: ${wp('1%')}px 0px;
`

const DetailsContainer = styled.View`
    width: ${wp('58%')}px;
    min-height: ${hp('14%')}px;
    justify-content: center;
`

const ButtonContainer = styled(RowSpreadBetween)`
    width: ${wp('25%')}px;
`
const SurfaceAmount = styled(Text)`
    margin-left: ${wp('1.5%')}px;
`

const TagContainer = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    margin: ${wp('1.2%')}px 0;
`

const RowContainer = styled(Row)`
    min-height: ${hp('14%')}px;
`

const Tag = styled(Text)`
    background-color: ${({ theme }) => theme.accent};
    padding:${wp('0.1%')}px ${wp('0.7%')}px;
    margin-bottom: ${hp('0.6%')}px;
    margin-right:${wp('0.8%')}px;
`

const ImageContainer = styled.View`
    width: ${wp('30%')}px;
    min-height: 120px;
`

const FloorImage = styled.Image`
    width: ${wp('18%')}px;
    height: ${wp('18%')}px;
    position: absolute;
`

const BottomContainer = styled(RowSpreadBetween)`
    align-items: center;
    align-content: center;
`

const CompanyImage = styled.Image`
    height: ${wp('14%')}px;
    width: ${wp('14%')}px;
    bottom: 0;
`

const DetailsButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.lightAccent};
    width: ${wp('10%')}px;
    height: ${wp('10%')}px;
    border-radius: ${wp('50%')}px;
    align-items: center;
    justify-content: center;
    padding: ${wp('1.5%')}px;

`

const AddButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.green};
    width: ${wp('10%')}px;
    height: ${wp('10%')}px;
    border-radius: ${wp('50%')}px;
    align-items: center;
    justify-content: center;
    padding: ${wp('1.5%')}px;

`