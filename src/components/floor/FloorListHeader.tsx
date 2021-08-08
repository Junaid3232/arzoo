import { Row, RowJustifyCentered } from 'components/common/View';
import useTheme from 'hooks/useTheme';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import TextInput, { SearchBar, SmallTextInput } from 'components/common/TextInput';
import { Text } from 'components/common/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import FilterModal from 'components/FilterModal';
import { firebase } from "../../firebase/config";
import { useUser } from "context/UserContext";
import SearchDropdown from 'components/user/SearchDropdown';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import IIcon from 'react-native-vector-icons/MaterialIcons'
import { FilterContext } from 'context/FilterContext';


const FloorListHeader = ({ title,
    navigationtype,
    listData,
    setListData,
    errorText,
    setErrorText,
    showErrorText,
    setShowErrorText,
    isTitleError,
    setIsTItleError,
    isDescError,
    setIsDescError,
    inputTitle,
    inputDesc,
    content }) => {
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const { t } = useTranslation();

    const navigation = useNavigation();

    const theme = useTheme();
    const [ // from context
        searchFloorType,
        setSearchFloorType,
        searchFloorStore,
        setSearchFloorStore,
        addedFloors,
        setAddedFloors,
        searchFloorColor,
        setSearchFloorColor,
        getSelectedListId,
        setGetSelectedListId
    ] = useContext<any>(FilterContext)

    const [searchQuery, setSearchQuery] = useState('')
    const [resultsFound, setResultsFound] = useState<any>([])
    const results: Array<any> = [];
    const { user } = useUser();
    const [userFloorCatalog, setUserFloorCatalog] = useState<any>({});
    //Global Constants
    const db = firebase.firestore();
    const userCollectionsRef = db.collection("users-collections");
    const collectionsRef = db.collection("collections");
    const floorRef = db.collection("floors");

    const retrieveUserCatalog = async () => {
        try {
            if (user) {
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
    console.log(searchQuery)
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
        <Container>
            <Header>
                <Absolute onPress={() => {
                    navigation.goBack()
                    setGetSelectedListId('')
                }}>
                    <Icon name="chevron-back" color="white" size={35} />
                </Absolute>
                <StyledText
                    size="xlarge"
                    color="white"
                    weight="600"
                >List</StyledText>
            </Header>
            <StyledRow>
                <SmallTextInput

                    placeholder={content?.title ? content.title : t('list_title')}
                    color={theme.inputBG}
                    onChangeText={text => setListData({ ...listData, title: text })}
                    inputRef={inputTitle}
                />
            </StyledRow>
            <StyledRow>
                <SmallTextInput
                    placeholder={content?.desc ? content.desc : t('desc')}
                    height={hp('5%')}
                    color={theme.inputBG}
                    onChangeText={text => setListData({ ...listData, desc: text })}
                    inputRef={inputDesc} />
            </StyledRow>
            <SearchRow>
                <SearchBlock>
                    <SearchBar height={hp('5%')}
                        value={searchQuery}
                        onChangeText={(value) => {
                            setSearchQuery(value)

                        }} />
                    <IconContainer>
                        <Icon size={25} name="search-outline" color={theme.lightGrey} />
                    </IconContainer>
                    {searchQuery.length > 0 &&
                        <CancelIcon onPress={() => setSearchQuery('')}>
                            <IIcon size={25} name="cancel" color={theme.lightGrey} />
                        </CancelIcon>}
                    {searchQuery.length > 0 &&
                        <DropDown>
                            <SearchDropdown searchQuery={searchQuery} resultsFound={resultsFound} allFloors={userFloorCatalog} />
                        </DropDown>
                    }
                </SearchBlock>
                <HeaderButton bgColor={theme.white} >
                    <FIcon size={hp('2.5%')} name="filter" color={theme.accent} onPress={() => setFilterModalVisible(!filterModalVisible)} />
                </HeaderButton>
            </SearchRow>
            <FilterModal
                transparent={true}
                animationType="fade"
                visible={filterModalVisible}
                setVisible={setFilterModalVisible}
                showCheckbox={true}
                onRequestClose={() => {
                    setFilterModalVisible(!filterModalVisible);
                }} />
        </Container>
    );
}

export default FloorListHeader;

const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.primaryDark};
    z-index:1
`;

const StyledRow = styled.View`
    margin: ${hp('0.5%')}px ${wp('5%')}px;
`

const Absolute = styled.TouchableOpacity`
    position: absolute;
    left: 0;
`

const SearchRow = styled(Row)`
    margin: ${hp('0.5%')}px ${wp('5%')}px;
    margin-bottom: ${hp(`1.5%`)}px;
`

const HeaderButton = styled.TouchableOpacity`
    height: ${hp('5%')}px;
    background-color: ${props => props.bgColor};
    width: ${hp('5%')}px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`

const StyledText = styled(Text)`
    margin-top: ${hp(`0.8%`)}px;
`

const Header = styled(RowJustifyCentered)`
    margin-bottom: ${hp('1.3%')}px;
    align-items: center;
`
const SearchBlock = styled.View`
width:85%
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