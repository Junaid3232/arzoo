import FilterModal from "components/FilterModal";
import FloorHeader from "components/floor/FloorHeader";
import FloorResults from "components/floor/FloorResults";
import { useUser } from "context/UserContext";
import useTheme from "hooks/useTheme";
import React, { useContext, useEffect, useState, } from "react";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import { firebase } from "../../firebase/config";
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging'
import { useNavigation } from "@react-navigation/native";
import { FilterContext } from "context/FilterContext";
import { Text } from "components/common/Text";


const FloorCatalogScreen = ({ filterModalVisible }) => {
  const { user, access } = useUser();
  const theme = useTheme();
  const [searchFloorType, setSearchFloorType, searchFloorStore, setSearchFloorStore, searchFloorColor, setSearchFloorColor] = useContext<any>(FilterContext)
  // const [searchFloorType, searchFloorStore, setSearchFloorType, setSearchFloorStore] = useContext<any>(FilterContext)
  //Global Constants

  const db = firebase.firestore();
  // console.log("******SEarch floor", searchFloorStore)
  const userCollectionsRef = db.collection("users-collections");
  const collectionsRef = db.collection("collections");
  const floorRef = db.collection("floors");
  const navigation = useNavigation();

  //States
  const [loading, setLoading] = useState(false);
  const [userFloorCatalog, setUserFloorCatalog] = useState({});

  // 
  useEffect(() => {
    if (user) {

      setTimeout(() => {
        requestUserPermission()
      }, 3000);

    }
    else {
      console.log("USER NOT LOADED")
    }
  }, [user])


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      generateToken()
      // console.log("TOKEN ADDED SUCCESFULLY");
    }
  }

  const generateToken = () => {
    messaging()
      .getToken()
      .then(token => {
        saveTokenToDatabase(token);
      });
  }

  const saveTokenToDatabase = async (token) => {
    // Current User
    const userId = firebase.auth().currentUser.uid;
    // Add the token to the users datastore
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        pushToken: token,
      });
  }

  const retrieveUserCatalog = async () => {
    setLoading(true);
    try {
      if (user && access) {
        let floorCol;
        if (access == 'pro' || access == 'admin') {

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

        } else { // if access is free this else will run

          //if conditions for filtering in Free mode
          if (searchFloorType === 'All' && searchFloorStore === 'All') {
            floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").get()
          }
          else if (searchFloorType === 'All' && searchFloorStore !== 'All') {
            floorCol = await floorRef.where("access", "==", "free").where("status", "==", "active").where("store.name", "==", searchFloorStore).get()
          }
          else if (searchFloorType !== 'All' && searchFloorStore === 'All') {
            floorCol = await floorRef.where("access", "==", "free").where("status", "==", "active").where("type", "==", searchFloorType).get()
          }
          else if (searchFloorType !== 'All' && searchFloorStore !== 'All') {
            floorCol = await floorRef.where("access", "==", "free").where("status", "==", "active").where("type", "==", searchFloorType).where("store.name", "==", searchFloorStore).get()
          }
          // if (searchFloorType === 'All' && searchFloorStore === 'All' && searchFloorStore === 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").get()
          // }
          // else if (searchFloorType === 'All' && searchFloorStore !== 'All' && searchFloorColor === 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("store.name", "==", searchFloorStore).get()
          // }
          // else if (searchFloorType !== 'All' && searchFloorStore === 'All' && searchFloorColor === 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("type", "==", searchFloorType).get()
          // }
          // else if (searchFloorType === 'All' && searchFloorStore === 'All' && searchFloorColor !== 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("color.en", "==", searchFloorColor).get()
          // }
          // else if (searchFloorType !== 'All' && searchFloorStore === 'All' && searchFloorColor !== 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("color.en", "==", searchFloorColor).where("type", "==", searchFloorType).get()
          // }
          // else if (searchFloorType === 'All' && searchFloorStore !== 'All' && searchFloorColor !== 'All') {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("color.en", "==", searchFloorColor).where("store.name", "==", searchFloorStore).get()
          // }
          // else {
          //   floorCol = await floorRef.where("status", "==", "active").where("access", "==", "free").where("type", "==", searchFloorType).where("store.name", "==", searchFloorStore).where("color.en", "==", searchFloorColor).get()
          // }
        }
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

        setUserFloorCatalog(floorCatalog);
        // console.log("*********FLOORES", floorCatalog)

      } else {
        console.log("[ERROR] User not loaded");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  // console.log("*******FLOORE CATALOG", Object.entries(userFloorCatalog))


  useEffect(() => {
    async function runAtStartup() {
      await retrieveUserCatalog();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await setLoading(false);
    }
    runAtStartup();
  }, [user, access, searchFloorStore, searchFloorType, searchFloorColor]);
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     retrieveUserCatalog()
  //   });
  //   return unsubscribe;
  // }, [searchFloorStore, searchFloorType]);
  const OnResetClick = () => {
    setSearchFloorType('All')
    setSearchFloorStore('All')
    setSearchFloorColor('All')
  }

  return (
    <Container>
      <LoadingAnimation loading={loading} size="large" color={theme.accent} />
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
      <FloorResultList
        loading={loading}
        type={"catalog"}
        floors={userFloorCatalog}
      />
    </Container>
  );
};

export default FloorCatalogScreen;

const Container = styled.View`
  background-color: ${(props) => props.theme.primary};
  height: 100%;
  align-items: ${(props) => (props.loading ? "center" : "flex-start")};
  justify-content: ${(props) => (props.loading ? "center" : "flex-start")};
`;

const LoadingAnimation = styled(ActivityIndicator)`
  display: ${(props) => (props.loading ? "flex" : "none")};
  height: 100%;
  width: 100%;
`;

const FloorResultList = styled(FloorResults)`
  display: ${(props) => (props.loading ? "none" : "flex")};
`;

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