import FloorHeader from 'components/floor/FloorHeader';
import FloorResults from 'components/floor/FloorResults';
import { useUser } from 'context/UserContext';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import useTheme from 'hooks/useTheme';
import { firebase } from '../../firebase/config';
import { ActivityIndicator } from 'react-native-paper';
import { FilterContext } from 'context/FilterContext';
import { Text } from 'components/common/Text';
const FloorFavoritesScreen = () => {
  const [loading, setLoading] = useState(false);
  const { user, access } = useUser();
  const theme = useTheme();
  //Global Constants
  const db = firebase.firestore();
  const userFavoritesRef = db.collection('users-collections-favorites');
  const floorRef = db.collection('floors');

  const [userFavorites, setUserFavorites] = useState({});
  const [searchFloorType, setSearchFloorType, searchFloorStore, setSearchFloorStore, searchFloorColor, setSearchFloorColor] = useContext<any>(FilterContext)
  const retrieveUserFavorites = async () => {
    setLoading(true);
    try {
      if (user) {
        //Retrieve user favorites
        let userFavoritesDoc = await userFavoritesRef.doc(user).get();
        let userFavorites = [];
        if (userFavoritesDoc.exists) {
          Object.entries(userFavoritesDoc.data()).map((entry) => {
            const [key, value] = entry;
            if (value.active === true && !userFavorites.includes(key)) {
              userFavorites.push(key);
            }
          });
        } else {
          console.log('[Error] No such document!');
        }

        let favoritesObject = {};


        for (let uid of userFavorites) {
          let floorDoc = await floorRef.doc(uid).get();
          if (floorDoc.exists) {
            if (access == 'pro' || access == 'admin') {
              if (floorDoc.data().type === searchFloorType && floorDoc.data().store.name === searchFloorStore) {
                favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              }
              else if (floorDoc.data().type !== searchFloorType && floorDoc.data().store.name === searchFloorStore) {
                favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              }
              else if (floorDoc.data().type === searchFloorType && floorDoc.data().store.name !== searchFloorStore) {
                favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              }
            } else {

              // if (searchFloorType === "All" && searchFloorStore === "All"){
              //   favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              // }
              // else if (searchFloorType !== "All" && floorDoc.data().type === searchFloorType && floorDoc.data().store.name === searchFloorStore) {
              //   favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              // }
              // else if (floorDoc.data().type !== searchFloorType && floorDoc.data().store.name === searchFloorStore) {
              //   favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              // }
              // else if (floorDoc.data().type === searchFloorType && floorDoc.data().store.name !== searchFloorStore) {
              //   favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              // }
              if (searchFloorType === "All" && searchFloorStore === "All") {
                favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
              }
              else if (searchFloorType !== "All" && searchFloorStore === "All") {
                if (floorDoc.data().type === searchFloorType) {
                  favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
                }
              }
              else if (searchFloorType === "All" && searchFloorStore !== "All") {
                if (floorDoc.data().store.name === searchFloorStore) {
                  favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
                }
              }
              else if (searchFloorType !== "All" && searchFloorStore !== "All") {
                if (floorDoc.data().store.name === searchFloorStore && floorDoc.data().type === searchFloorType) {
                  favoritesObject = { ...favoritesObject, [uid]: { ...floorDoc.data(), showDetail: false } }
                }
              }

            }

          } else {
            console.log('[Error] No such document');
          }
        }
        // pushing empty blocks to avoid irregular shapes
        let indexRow = 0;
        if (Object.keys(favoritesObject).length === 1) {
          indexRow = 2;
        } else if (Object.keys(favoritesObject).length === 2) {
          indexRow = 1;
        } else if (Object.keys(favoritesObject).length >= 3) {
          indexRow =
            Object.keys(favoritesObject).length % 3 === 2
              ? 1
              : Object.keys(favoritesObject).length % 3 === 1
                ? 2
                : 0;
        }
        for (let i = 0; i < indexRow; i++) {
          favoritesObject = {
            ...favoritesObject,
            ['YLJ3OGGLXFms0qaxRzWhvv' + i]: {
              emptyBlock: true,
            },
          };
        }

        setUserFavorites(favoritesObject);
        setLoading(false);
      } else {
        console.log('[ERROR] User not loaded');
      }
    } catch (err) {
      console.log(`${err} [ERROR] User not loaded`);
    }
  };

  useEffect(() => {
    retrieveUserFavorites()
  }, [user, access, searchFloorStore, searchFloorType])
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
      <FloorResults
        listId={undefined}
        loading={loading}
        type={'fav'}
        floors={userFavorites}
      />
    </Container>
  );
};

export default FloorFavoritesScreen;

const Container = styled.View`
  background-color: ${(props) => props.theme.primary};
  height: 100%;
`;

const LoadingAnimation = styled(ActivityIndicator)`
  display: ${(props) => (props.loading ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
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