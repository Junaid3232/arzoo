import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import FloorResults from 'components/floor/FloorResults';
import useTheme from "hooks/useTheme";
import { ActivityIndicator } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign'
import { View } from 'react-native';
const FloorsSearchedScreen = (props) => {
  const [resultsFound, setResultsFound] = useState<any>([])
  const SearchOn = props.route.params.SearchOn
  const [loading, setLoading] = useState(false);
  const [userFloorCatalog, setUserFloorCatalog] = useState<any>(props.route.params.allFloors);
  let results: Array<any> = [];
  const theme = useTheme();

  const searchingFunction = () => {
    // console.log("***Floor data for Searching function***", SearchOn)
    setResultsFound([]);
    results = []
    for (let i = 0; i < userFloorCatalog.length; i++) {
      if (
        userFloorCatalog[i]?.data?.name?.en?.indexOf(SearchOn) >= 0
        ||
        userFloorCatalog[i]?.data?.name?.fr?.indexOf(SearchOn) >= 0
        ||
        (userFloorCatalog[i]?.data?.description?.en && userFloorCatalog[i]?.data?.description?.en.indexOf(SearchOn) >= 0)
        ||
        (userFloorCatalog[i]?.data?.color?.en && userFloorCatalog[i]?.data?.color?.en?.indexOf(SearchOn) >= 0)
        ||
        (userFloorCatalog[i]?.data?.engine?.material && userFloorCatalog[i]?.data?.engine?.material?.indexOf(SearchOn) >= 0)
        ||
        (userFloorCatalog[i]?.data?.model?.en && userFloorCatalog[i]?.data?.model?.en?.indexOf(SearchOn) >= 0)
        ||
        (userFloorCatalog[i]?.data?.store?.name?.indexOf(SearchOn) >= 0)
      ) {
        results.push(userFloorCatalog[i]);
        setResultsFound(results);
      }
    }
  };
  useEffect(() => {
    searchingFunction()
  }, [SearchOn])

  return (
    <Container>
      <Header>
        <HeaderIcon onPress={() => props.navigation.goBack()}>
          <Icon name={'left'} size={25} color={'white'} />
        </HeaderIcon>
        <HeaderText>Results - {SearchOn}</HeaderText>
      </Header>
      <Screen>


        <LoadingAnimation loading={loading} size="large" color={theme.accent} />
        {resultsFound.length === 0 ?
          <NoSearch> No Results Found!</NoSearch>
          :
          <FloorResults listId={undefined} loading={loading} type={"fav"} floors={resultsFound} searched={true} />}
      </Screen>
    </Container>
  );
}
export default FloorsSearchedScreen;
const Container = styled.View`
  background-color: #214975
  height: 100%;

  justify-content:center

`;
const Screen = styled.View`
background-color: ${props => props.theme.primary};
flex:1

`
const LoadingAnimation = styled(ActivityIndicator)`
  display: ${(props) => (props.loading ? "flex" : "none")};
  height: 100%;
  width: 100%;
`;
const NoSearch = styled.Text`
font-size:20px
color:#328ABE
text-align:center
align-self:center
`

const Header = styled.SafeAreaView`
background-color: #214975
margin-top:30
height:50px
flex-direction:row
`
const HeaderIcon = styled.TouchableOpacity`
justify-content:flex-start
padding-left:15px
margin-top:-2px
`
const HeaderText = styled.Text`
color:white;
font-size:17px
padding-left:20px


`