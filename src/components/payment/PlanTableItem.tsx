import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from 'react-native';
import { Text, StyleSheet } from 'react-native';

const PlanTableItem = ({ titleText,
    amount,
    fontWeight = '500',
    color = 'black' }) => {
    return <Conatiner>
        <Text style={[styles.titleText, { fontWeight: fontWeight, color: color }]}>{titleText}</Text>
        <Text style={[styles.ammountText, { fontWeight: fontWeight, color: color }]}>{amount}$</Text>
    </Conatiner>
}
export default PlanTableItem
const styles = StyleSheet.create({
    titleText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: "Hind-Regular"
    },
    ammountText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: "Hind-Regular"
    }
})
const Conatiner = styled.View`
flex-direction:row;
justify-content:space-between
`
