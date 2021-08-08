import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import IIcon from 'react-native-vector-icons/MaterialIcons'
import FilterModal from '../FilterModal';
import StoreFront from '../../assets/images/storefront.svg';
import TextInput from 'components/common/TextInput';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import useTheme from 'hooks/useTheme';
import SearchDropDown from 'components/user/SearchDropdown';
import { firebase } from "../../firebase/config";
import { useUser } from "context/UserContext";
import { useEffect } from 'react';
import { StatusBar } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const FloorHeader = (props) => {
    const { user } = useUser();
    //Global Constants
    const db = firebase.firestore();
    const userCollectionsRef = db.collection("users-collections");
    const collectionsRef = db.collection("collections");
    const floorRef = db.collection("floors");
    //States
    const [userFloorCatalog, setUserFloorCatalog] = useState<any>({});
    const results: Array<any> = [];
    const theme = useTheme();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { type, listData, setListData, errorText, setErrorText, showErrorText, setShowErrorText, isTitleError, setIsTItleError, isDescError, setIsDescError, inputTitle, inputDesc, getSearchQuery } = props
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [resultsFound, setResultsFound] = useState<any>([])

    const retrieveUserCatalog = async () => {
        try {
            if (user) {
                // //Retrieve user collections
                // let userCollectionDoc = await userCollectionsRef.doc(user).get();
                // let userCollections = [];
                // if (userCollectionDoc.exists) {
                //     Object.entries(userCollectionDoc.data()).map((entry) => {
                //         const [key, value] = entry;
                //         if (value.active === true && !userCollections.includes(key)) {
                //             userCollections.push(key);
                //         }
                //     });
                // } else {
                //     console.log("[Error] No such document!");
                // }
                // //Retrieve Floors for each collections
                // let userFloors = [];
                // for (let uid of userCollections) {
                //     let collectionsDoc = await collectionsRef.doc(uid).get();
                //     if (collectionsDoc.exists) {
                //         Object.keys(collectionsDoc.data().floors).forEach((key: String) => {
                //             userFloors.push(key);
                //         });
                //     } else {
                //         console.log("No such document!");
                //     }
                // }
                // //Retrieve Floors in database
                // let floorCatalog = {};
                // let floorArray: Array<any> = [];
                // for (let uid of userFloors) {
                //     let floorDoc = await floorRef.doc(uid).get();
                //     if (floorDoc.exists) {
                //         floorCatalog = { ...floorCatalog, [uid]: floorDoc.data() };
                //         floorArray = [...floorArray, { id: uid, data: floorDoc.data() }]
                //     } else {
                //         console.log("[Error] No such document");
                //     }
                // }
                let floorCol = await floorRef.where("status", "==", "active").get()


                let floorCatalog = {};
                let floorArray: Array<any> = [];

                await floorCol.forEach(doc => {
                    // console.log(doc.id, " => ", doc.data());
                    floorCatalog = { ...floorCatalog, [doc.id]: { ...doc.data() } };
                    floorArray = [...floorArray, { id: doc.id, data: doc.data() }]
                })
                setUserFloorCatalog(floorArray);
            } else {
                console.log("[ERROR] User not loaded");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const searchingFunction = () => {
        setResultsFound([]);


        for (let i = 0; i < userFloorCatalog?.length; i++) {
            if (
                userFloorCatalog[i].data?.name?.en?.indexOf(searchQuery) >= 0
                ||
                userFloorCatalog[i]?.data?.store?.name?.indexOf(searchQuery) >= 0
                ||
                userFloorCatalog[i]?.data?.color?.en?.indexOf(searchQuery) >= 0
                ||
                userFloorCatalog[i]?.data?.color?.fr?.indexOf(searchQuery) >= 0

            ) {

                results.push(userFloorCatalog[i]);
                // console.log("RESULTSSSSS", results);

                setResultsFound(results);
            }
        }
    };


    useEffect(() => {
        searchingFunction()
    }, [searchQuery])
    useEffect(() => {
        async function runAtStartup() {
            await retrieveUserCatalog();
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        runAtStartup();
    }, [user]);
    return (
        <>

            {type === 'slct' ? (
                <>
                    <InputContainer>
                        <TextInput
                            placeholder={listData.title ? listData.title : t('list_title')}
                            onChangeText={text => setListData({ ...listData, title: text })}
                            inputRef={inputTitle}
                            errorText={errorText}
                            showErrorText={showErrorText.title}
                            width={`100%`}
                            fontSize={"16px"}
                            list={true} />
                        <TextInput
                            placeholder={t('desc')}
                            onChangeText={text => setListData({ ...listData, desc: text })}
                            inputRef={inputDesc}
                            errorText={errorText}
                            showErrorText={showErrorText.desc}
                            width={`100%`}
                            fontSize={"16px"}
                            list={true} />
                    </InputContainer>
                </>
            ) : (<></>)}
            <Container {...props} type={type}>
                <SearchBlock>
                    <SearchBar type={type}
                        value={searchQuery}
                        //  onChangeText={(value) => getSearchQuery(value)}
                        onChangeText={(value) => {
                            setSearchQuery(value)
                        }}
                    />
                    <IconContainer>
                        <Icon size={25} name="search-outline" color={theme.lightGrey} />
                    </IconContainer>
                    {searchQuery.length > 0 &&
                        <CancelIcon onPress={() => setSearchQuery('')}>
                            <IIcon size={25} name="cancel" color={theme.lightGrey} />
                        </CancelIcon>}
                    {searchQuery.length > 0 &&
                        <DropDown>
                            <SearchDropDown searchQuery={searchQuery} resultsFound={resultsFound} allFloors={userFloorCatalog} />
                        </DropDown>
                    }
                </SearchBlock>

                <HeaderButton bgColor={theme.white} onPress={() => setFilterModalVisible(!filterModalVisible)}>
                    <FIcon size={20} name="filter" color={theme.accent} />
                </HeaderButton>
                <FilterModal
                    transparent={true}
                    animationType="fade"
                    visible={filterModalVisible}
                    setVisible={setFilterModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setFilterModalVisible(!filterModalVisible);
                    }} />
            </Container>
        </>
    );
}

export default FloorHeader;

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: ${props => props.type === 'store' || props.type === 'slct' ? 'flex-start' : 'space-around'};
    align-items: center;
    padding-top: ${props => props.paddingTop ? props.paddingTop : "15px"};
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : "15px"};
    padding-right: 10px;
    padding-left: 10px;
`;

const SearchBar = styled.TextInput`
    font-size: 18px;
    background-color: ${props => props.theme.inputBG};
    padding: 5px;
    font-weight: 400;
    padding-left: 40px;
    border-radius: 7px;
    width: ${widthPercentageToDP('75%')}px;
    height: 40px;
    border-width: 0.5px;
    margin-right: ${props => props.type === 'store' || props.type === 'slct' ? '10px' : '0px'};
    border-color: ${props => props.theme.borderColor};
`
const SearchBlock = styled.View`

    
`
const IconContainer = styled.View`
    position: absolute;
    height: 100%;
    justify-content: center;
    margin-left: 7px;
`
const CancelIcon = styled.TouchableOpacity`
    position: absolute;
    right:4px;
    top:5px;
    zIndex:10;
`
const HeaderButton = styled.TouchableOpacity`
    height: 40px;
    background-color: ${props => props.bgColor};
    width: 55px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
`

const InputContainer = styled.View`
    padding: 0 10px;
    margin-top: 10px;
`
const DropDown = styled.View`
    flex-direction:column;
    position: absolute;
    top:36px;
    background-color:white;
    width: ${widthPercentageToDP('75%')}px;
    maxHeight:400px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding-horizontal:30px;
    elevation: 1;
`