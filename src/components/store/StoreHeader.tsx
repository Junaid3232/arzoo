import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'components/common/Text';
import TextInput from 'components/common/TextInput';
import { SearchBar } from 'components/common/TextInput';
import { Row, RowJustifyCentered } from 'components/common/View';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import useTheme from 'hooks/useTheme';

const StoreHeader = ({ title, navigation }) => {

    const theme = useTheme();
    return (
        <Container>
            <RowJustifyCentered>
                <Absolute onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color="white" size={35} />
                </Absolute>
                <StyledText size="xlarge" color="white" weight="600">{title}</StyledText>
            </RowJustifyCentered>
            <SearchRow>
                <SearchBar height={hp('5%')}/>
                <HeaderButton bgColor={theme.white}>
                    <FIcon size={hp('2.5%')} name="filter" color={theme.accent} />
                </HeaderButton>
            </SearchRow>
        </Container>
    );
}

export default StoreHeader;

const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.primaryDark};;
`;

const Absolute = styled.TouchableOpacity`
    position: absolute;
    left: 0;
`

const SearchRow = styled(Row)`
    margin: ${hp('1.8%')}px ${wp('5%')}px;
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