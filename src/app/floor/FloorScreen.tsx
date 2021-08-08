import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native'
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native'
import FloorCatalogScreen from './FloorCatalogScreen';
import FloorFavoritesScreen from './FloorFavoritesScreen';
import FloorListScreen from './FloorListScreen';
import 'localization';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import StoreFront from '../../assets/images/storefront.svg';
import Catalog from '../../assets/images/catalog.svg';
import CatalogOutline from '../../assets/images/catalog-outline.svg';
import Favorite from '../../assets/images/favorite.svg';
import FavoriteOutline from '../../assets/images/favorite-outline.svg';
import FloorHeader from 'components/floor/FloorHeader';
import useTheme from 'hooks/useTheme';
import { firebase } from '../../firebase/config';
const db = firebase.firestore();
import "firebase/firestore";
import moment from 'moment'

const FloorScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const receiverData = route?.params?.item
  let senderData: { id: number; name: string; userName: string };
  let [prevRoute, setPrevRoute] = useState("")
  const {t, i18n} = useTranslation()
  
  const [favoriteSwitch, setFavoriteSwitch] = useState(false)

  console.log(i18n.language)
  console.log('wassup')
  const [index, setIndex] = useState(0);
  const key = route?.params?.key

  const [routes] = useState([
    { key: 'cat', title:  i18n.language == 'en' ? 'Catalog' : 'Catalogue'},
    { key: 'fav', title: i18n.language == 'en' ?'Favorites' : 'Favoris'},
    { key: 'sto', title: i18n.language == 'en' ?'Lists': 'Listes'},
  ]);

  const [filters, setFilters] = useState(['floorType']);

  const renderScene = SceneMap({
    cat:() => <FloorCatalogScreen />,
    fav: () => <FloorFavoritesScreen/>,
    sto: () => <FloorListScreen />
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (key === 2) {
        setIndex(2)
      }
    });
    return unsubscribe;
  }, [navigation, key])
  const iconDimension = 25
  const renderTabBarItem = props => {
    let element = <TabBarItem {...props} />
    if (props.navigationState.index === props.navigationState.routes.indexOf(props.route)) {
      element = <TabBarItem {...props} style={{ backgroundColor: theme.primary }} />
    } else {
      element = <TabBarItem {...props} style={{ backgroundColor: theme.primaryDark }} />
    }
    if (prevRoute === "Contact") { // check if user want to send floor than hide headers
      return null
    }
    else
      return (
        element

      )
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)' }}
      style={{ backgroundColor: theme.primaryDark, shadowColor: 'rgba(0,0,0,0)' }}
      activeColor={theme.accent}
      getLabelText={({ route }) => route.title}
      renderTabBarItem={renderTabBarItem}
      renderIcon={({ route, focused, color }) => {

        let title = route.title
        let element = <StoreFront width={iconDimension} height={iconDimension} fill={theme.accent} />

        if(title == 'Catalog' || title == 'Catalogue'){
          element = focused ? <Catalog width={iconDimension} height={iconDimension} /> : <CatalogOutline width={iconDimension} height={iconDimension} />
        } else if(title == 'Favorites' || title == 'Favoris'){
          element = focused ? <Favorite width={iconDimension} height={iconDimension} /> : <FavoriteOutline width={iconDimension} height={iconDimension} />
        } else{
          element = focused ? <Icon name={`list`} size={iconDimension} color={theme.accent} /> : <Icon name={`list`} size={iconDimension} color={theme.white} />
        }

        return (
          element
        )
      }}
    />
  );
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        {prevRoute === 'Contact' ? null :
          <Header>
            <FloorHeader navigation={navigation} style={{ backgroundColor: theme.primaryDark }} />
          </Header>}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={index => setIndex(index)}
          renderTabBar={renderTabBar}
        />
      </Container>
    </>
  );
}
export default FloorScreen;

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.primaryDark};
  height: 100%;
`;
const Header = styled.View`
zIndex:10
`