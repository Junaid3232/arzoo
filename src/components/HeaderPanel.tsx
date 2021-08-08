import React from 'react';
import styled from 'styled-components/native';
import useTheme from 'hooks/useTheme';

const HeaderPanel = ({uid}) => {
    const theme = useTheme();
    return (
            <Profile>
                <ProfileImage />
                <ProfileName>Jean-Jacques Martin</ProfileName>
            </Profile>
    );
}

export default HeaderPanel;

const Profile = styled.View`
    flex-direction: row;
    align-items: center;
`

const ProfileImage = styled.Image`
    height: 27px;
    width: 27px;
    border-radius: 20px;
    background-color: black;
`

const ProfileName = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color: black;
    font-weight: 600;
`