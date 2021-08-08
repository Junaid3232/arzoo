import React, { FC } from "react";
import styled from "styled-components/native";

const Title: FC<{
    titleText?: string
}> = ({ titleText }) => {
    return <TitleText>{titleText}</TitleText>
}
export default Title

const TitleText = styled.Text`
font-size:18px;
font-weight:600;
font-family: "Hind-Regular";
`