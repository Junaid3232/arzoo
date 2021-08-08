import React from 'react';
import styled from 'styled-components/native';
import { Flex, Row, Column } from 'components/common/View';
import { Text } from 'components/common/Text';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ViewProps } from 'react-native';
import { FC } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


interface ProfileHeaderProps extends ViewProps  {
    value: {
        name: {
            first: string,
            last: string
        }
    }
}

const ProfileHeader: FC<ProfileHeaderProps> = ({value, ...rest}) => {

    const theme = useContext(ThemeContext);

    return (
        <Row {...rest}>
            <ProfileImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/arzo-e1a41.appspot.com/o/user%2Fimages%2FIMG_20190818_113509.jpg?alt=media&token=9df5b5df-aa18-448b-a67c-911eaa73f0c2"}} />
            <Flex style={{justifyContent: 'center', marginLeft: wp('4%')}}>
                <Text marginBot={hp("-0.9%")} size="xlarge" weight="bold">{value?.name.first} {value?.name.last}</Text>
            </Flex>
        </Row>
    );
}

export default ProfileHeader;

const ProfileImage = styled.Image`
    height: ${hp("12%")}px;
    width: ${hp("12%")}px;
    background-color: white;
    border-radius: ${hp("7.5%")}px;
`;
