import FloorHeader from 'components/floor/FloorHeader';
import FloorResults from 'components/floor/FloorResults';
import { useEditMode } from 'context/ListEditModeContext';
import { useUser } from 'context/UserContext';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Alert, BackHandler, SafeAreaView, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import { firebase } from '../../firebase/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import 'localization';
import { ActivityIndicator } from 'react-native-paper';
import FloorListHeader from 'components/floor/FloorListHeader';
import { FilterContext } from 'context/FilterContext';
import { Text } from 'components/common/Text';

const SelectFloorScreen = () => {
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
    const { user, access } = useUser();
    const { t } = useTranslation();
    const route = useRoute();

    const [listId, setListId] = useState(String)
    const [loading, setLoading] = useState(true)


    const editList = route?.params?.editList
    const storedListId = route?.params?.storedListId
    const content = route?.params?.content

    // console.log(content)

    const newListId = () => {
        var dt = new Date().getTime();
        setListId('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }))
    }



    //Global Constants
    const db = firebase.firestore()
    const userCollectionsRef = db.collection("users-collections")
    const collectionsRef = db.collection("collections")
    const floorRef = db.collection("floors")
    const activeRef = db.collection("users-collections-lists").doc(`${user}`)

    //States - IMPROVE CODE BELOW
    const [userFloorCatalog, setUserFloorCatalog] = useState({})

    const [listData, setListData] = useState({ title: '', desc: '' })
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const [errorText, setErrorText] = useState('')
    const [showErrorText, setShowErrorText] = useState({ title: false, desc: false })
    const [userAddedList, setUserAddedList] = useState({})

    let inputTitle = useRef(null);
    const [isTitleError, setIsTitleError] = useState(false)
    let inputDesc = useRef(null);
    const [isDescError, setIsDescError] = useState(false)
    const [selectedFloorId, setSelectedFloorId] = useState<any>()


    const [newListObject, setNewListObject] = useState({})


    const retrieveOnlyAddedList = async () => {
        setLoading(true);
        try {
            let floorsInList = await activeRef.get()
            let userSelectedList: any = []
            if (floorsInList.exists) {

                Object.entries(floorsInList.data()).map((entry) => {

                    const [key, value] = entry;
                    if (key === getSelectedListId) {

                        userSelectedList.push(entry[1].floors)
                        console.log("FREEE FLOOORS    +++++", userSelectedList)
                    }

                })
            } else {
                console.log("[Error] No such document!");
            }

            let userListTilesKeys: any = []
            if (floorsInList.exists) {

                Object.entries(userSelectedList[0]).map((entry) => {
                    userListTilesKeys.push(entry[0])

                })
                console.log("JJJJJJJJJ", userListTilesKeys)
            } else { console.log("ERROR") }

            let userAdded = {};
            for (let uid of userListTilesKeys) {
                console.log("*****UID", uid)
                let floorDoc = await floorRef.doc(uid).get()
                if (searchFloorType === "All" && searchFloorStore === "All") {
                    userAdded = { ...userAdded, [uid]: { ...floorDoc.data(), showDetail: false } }
                }
                else if (searchFloorType !== "All" && searchFloorStore === "All") {
                    if (floorDoc.data().type === searchFloorType) {
                        userAdded = { ...userAdded, [uid]: { ...floorDoc.data(), showDetail: false } }
                    }
                }
                else if (searchFloorType === "All" && searchFloorStore !== "All") {
                    if (floorDoc.data().store.name === searchFloorStore) {
                        userAdded = { ...userAdded, [uid]: { ...floorDoc.data(), showDetail: false } }
                    }
                }
                else if (searchFloorType !== "All" && searchFloorStore !== "All") {
                    if (floorDoc.data().store.name === searchFloorStore && floorDoc.data().type === searchFloorType) {
                        userAdded = { ...userAdded, [uid]: { ...floorDoc.data(), showDetail: false } }
                    }
                }

            }
            // pushing empty blocks to avoid irregular shapes
            let indexRow = 0;
            if (Object.keys(userAdded).length === 1) {
                indexRow = 2;
            }
            else if (Object.keys(userAdded).length === 2) {
                indexRow = 1;
            }
            else if (Object.keys(userAdded).length >= 3) {
                indexRow = Object.keys(userAdded).length % 3 === 2 ? 1 : Object.keys(userAdded).length % 3 === 1 ? 2 : 0
            }
            for (let i = 0; i < indexRow; i++) {
                userAdded = {
                    ...userAdded, ["YLJ3OGGLXFms0qaxRzWhvv" + i]: {
                        "emptyBlock": true
                    }
                }
            }
            setLoading(false)



            setUserAddedList(userAdded)
        } catch (err) {

        }
    }
    const retrieveUserCatalog = async () => {
        setLoading(true);
        try {
            if (user && access) {
                let floorCol;

                // if (userSelectedList.exists) {
                //     let onlyListId: any = []
                // Object.entries(userSelectedList.data()).map((entry) => {
                //     const [key, value] = entry;
                //     // userSelectedList.push(entry[1].floors)
                //     console.log("ONly Key ID+++++", key)

                // })
                // }
                // await floorsInList.forEach(doc => {
                // console.log("******ADDED", floorsInList.data())
                // }
                // )

                // if (access == 'pro' || access == 'admin') {

                // floorCol = await floorRef.where("status", "==", "active").get()
                //if conditions for filtering in Free mode
                if (searchFloorType === 'All' && searchFloorStore === 'All') {
                    floorCol = await floorRef.where("status", "==", "active").get()
                }
                else if (searchFloorType === 'All' && searchFloorStore !== 'All') {
                    floorCol = await floorRef.where("status", "==", "active").where("store.name", "==", searchFloorStore).get()
                }
                else if (searchFloorType !== 'All' && searchFloorStore === 'All') {
                    floorCol = await floorRef.where("status", "==", "active").where("type", "==", searchFloorType).get()
                }
                else if (searchFloorType !== 'All' && searchFloorStore !== 'All') {
                    floorCol = await floorRef.where("status", "==", "active").where("type", "==", searchFloorType).where("store.name", "==", searchFloorStore).get()
                }
                else if (searchFloorType === 'All' && searchFloorStore === 'All' && addedFloors === true) {
                    floorCol = await floorRef.where("active", "==", true).get()
                }
                // } else { // if access is free this else will run

                //     //if conditions for filtering in Free mode
                //     if (searchFloorType === 'All' && searchFloorStore === 'All') {
                //         floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").get()
                //     }
                //     else if (searchFloorType === 'All' && searchFloorStore !== 'All') {
                //         floorCol = await floorRef.where("access", "==", "free").where("status", "==", "active").where("store.name", "==", searchFloorStore).get()
                //     }
                //     else if (searchFloorType !== 'All' && searchFloorStore === 'All') {
                //         floorCol = await floorRef.where("access", "==", "free").where("status", "==", "active").where("type", "==", searchFloorType).get()
                //     }
                //     else if (searchFloorType !== 'All' && searchFloorStore !== 'All') {
                //         floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("type", "==", searchFloorType).where("store.name", "==", searchFloorStore).get()
                //     }
                // }

                let floorCatalog = {};
                await floorCol.forEach(doc => {
                    floorCatalog = { ...floorCatalog, [doc.id]: { ...doc?.data(), showDetail: false, emptyBlock: false } };
                })

                // pushing empty blocks to avoid irregular shapes
                let indexRow = 0;
                if (Object.keys(floorCatalog).length === 1) {
                    indexRow = 2;
                }
                else if (Object.keys(floorCatalog).length === 2) {
                    indexRow = 1;
                }
                else if (Object.keys(floorCatalog).length >= 3) {
                    indexRow = Object.keys(floorCatalog).length % 3 === 2 ? 1 : Object.keys(floorCatalog).length % 3 === 1 ? 2 : 0
                }
                for (let i = 0; i < indexRow; i++) {
                    floorCatalog = {
                        ...floorCatalog, ["YLJ3OGGLXFms0qaxRzWhvv" + i]: {
                            "emptyBlock": true
                        }
                    }
                }

                setUserFloorCatalog(floorCatalog)

            } else {
                console.log('[ERROR] User not loaded')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const checkInputs = () => {
        if (listData.title.length <= 1) {
            setErrorText(t('authentication:first_name_error'))
            setShowErrorText({ title: true, desc: false })
            inputTitle.current.focus();
            return false
        }
        return true
    }
    const saveList = async () => {
        if (!editList) {
            let result = await checkInputs();
            if (result) {
                await activeRef.set(
                    {
                        [listId]: {
                            floors: newListObject,
                            title: listData.title,
                            desc: listData.desc,
                        },
                    },
                    { merge: true },
                );
                navigation.goBack();
            }
        } else {
            console.log(
                JSON.stringify({
                    floors: newListObject,
                    title: listData.title == '' ? content.title : listData.title,
                    desc: listData.desc == '' ? content.desc : listData.desc,
                }),
            );
            await activeRef.update(
                {
                    [listId]: {
                        floors: newListObject,
                        title: listData.title == '' ? content.title : listData.title,
                        desc: listData.desc == '' ? content.desc : listData.desc,
                    },
                },
                { merge: true },
            );
            navigation.goBack();
        }
    };
    const OnResetClick = () => {
        setSearchFloorType('All')
        setSearchFloorStore('All')
    }
    useEffect(() => {
        if (!editList) {
            newListId()
        } else {
            setListId(storedListId)
            console.log(storedListId)
        }
        async function runAtStartup() {
            // await retrieveUserCatalog()
            await retrieveUserCatalog()
            await retrieveOnlyAddedList()

            await new Promise(resolve => setTimeout(resolve, 1500));
            await setLoading(false)
        }
        runAtStartup()
    }, [user, searchFloorStore, searchFloorType, addedFloors]);
    console.log("CINTTEX CHECk", addedFloors)
    return (
        <>
            <FloorListHeader content={content} listData={listData} setListData={setListData} type="slct" paddingTop={"0px"} errorText={errorText} setErrorText={setErrorText} showErrorText={showErrorText} setShowErrorText={setShowErrorText} inputTitle={inputTitle} inputDesc={inputDesc} isTitleError={isTitleError} setIsTitleError={setIsTitleError} isDescError={isDescError} setIsDescError={setIsDescError} />
            <Container loading={loading}>

                <StatusBar barStyle="dark-content" />

                {/* CLEAN STATES BELOW */}
                {searchFloorStore !== 'All' || searchFloorType !== 'All' ?
                    <FilterItems>
                        <Text size={'large'} weight={'bold'}>Filters</Text>
                        <FilterContainer1>
                            <AppliedFilterContainer>
                                <AppliedFilter>
                                    <Text color={'white'}>{searchFloorType}</Text>
                                </AppliedFilter>
                                <AppliedFilter>
                                    <Text color={'white'}>{searchFloorStore}</Text>
                                </AppliedFilter>
                            </AppliedFilterContainer>
                            <ResetButton onPress={() => OnResetClick()}>
                                <Text color={'white'}>Reset</Text>
                            </ResetButton>
                        </FilterContainer1>
                    </FilterItems> : null}

                <LoadingAnimation loading={loading} size="large" color={theme.accent} />
                <FloorResultList loading={loading} type="slct" listId={listId} editList={editList} floors={addedFloors == true ? userAddedList : userFloorCatalog} listObject={newListObject} />
                <SaveButton onPress={saveList}>
                    <Icon name="save" size={35} color={theme.white} />
                </SaveButton>
            </Container>
        </>
    );
}

export default SelectFloorScreen;

const Container = styled.SafeAreaView`
    background-color: ${props => props.theme.primary};
    height: 100%;
    flex:1
`;

const SaveButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    right: 30px;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.accent};
`

const LoadingAnimation = styled(ActivityIndicator)`
    display: ${props => props.loading ? 'flex' : 'none'};
    height: 70%;
    margin-bottom: 300px;
    width: 100%;
`

const FloorResultList = styled(FloorResults)`
    display: ${props => props.loading ? 'none' : 'flex'};;
`
const FilterItems = styled.View`
padding:10px;


`
const AppliedFilter = styled.View`
background-color:#018ABE
border-radius:15px
padding-horizontal:20px;
padding-vertical:3px;
margin-left:5px;
margin-top:5px


`

const AppliedFilterContainer = styled.View`
flex-direction:row;
display:flex;
align-items:center;

`
const ResetButton = styled.TouchableOpacity`
background-color:tomato;
border-radius:8px
padding-horizontal:25px;
padding-vertical:2px;
justify-content:center;
align-items:center;


`
const FilterContainer1 = styled.View`
flex-direction:row;
justify-content:space-between;
width:100%

`