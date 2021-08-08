import React from 'react';
import styled from 'styled-components/native';
import 'localization';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/common/Text';
import { FlatList } from 'react-native';
const SearchDropdown = ({ resultsFound, allFloors }) => {
    const navigation = useNavigation();
    return (
        <Container>
            <FlatList
                data={resultsFound}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) =>
                    <SearchComponent onPress={() => {
                        navigation.navigate("FloorsSearched", { SearchOn: item?.data?.name?.en, allFloors: allFloors })
                    }
                    }>
                        <Text>{item?.data?.name?.en}</Text></SearchComponent>}
                keyExtractor={(item) => item.index}
            />
        </Container>
    )
}
export default SearchDropdown;
const Container = styled.View`
flex:1
`
const SearchComponent = styled.TouchableOpacity`
padding:8px;
`
const Separator = styled.View`
background-color:#328ABE
height:0.5
`