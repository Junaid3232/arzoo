import React, { useEffect } from 'react';
import { useContext , useState} from 'react';
import { ThemeContext } from 'styled-components';
import ResultsScreen from 'components/user/ResultsScreen';
import useTheme from 'hooks/useTheme';
import {Text} from 'react-native'
import { ColumnStart, Flex } from 'components/common/View';
import styled from 'styled-components/native';
import TextInput, { SearchBar } from 'components/common/TextInput';


const ContactScreen = ({route}) => {
    const key = route?.params?.key
    const notificationData = route?.params?.notificationData
    const [search, setSearch] = useState<string>("")
    const [paramKey, setParamKey] = useState("")
    return (
        <>
         <Header>
                <SearchBar onChangeText={text => setSearch(text)}/>
            </Header>
        <ResultsScreen
            variant="contacts"
            // userResults={["test", "231", "asda"]}
            searchResults={search}
            search={search} 
            prevRoute ={route.params?.key}
            notificationData={notificationData}
        />
        </>
    );
}

export default ContactScreen;

const Header = styled(Flex)`
    flex-direction: row;
    align-items: center;
    padding: 15px 30px;
    background-color: ${({ theme }) => theme.primary};
`