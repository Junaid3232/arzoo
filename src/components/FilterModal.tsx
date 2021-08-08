import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import SearchTags from './SearchTags';
import 'localization';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList, Image, View, StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Text } from './common/Text';
import DropDownPicker from 'react-native-dropdown-picker';
import { FilterContext } from 'context/FilterContext';
import CheckBox from '@react-native-community/checkbox';

const FilterModal = (props) => {
    // const [searchFloorType, setSearchFloorType, searchFloorStore, setSearchFloorStore] = useContext<any>(FilterContext)
    // console.log("************FORM CONTEccT", searchFloorType)
    // console.log("******FLOOR STORE", searchFloorStore)
    const [ // from context
        searchFloorType,
        setSearchFloorType,
        searchFloorStore,
        setSearchFloorStore,
        addedFloors,
        setAddedFloors,
        searchFloorColor,
        setSearchFloorColor
    ] = useContext<any>(FilterContext)
    let SelectFloorTypes = [
        {
            id: 0,
            type: 'All',
            value: 'All',
            select: true
        },
        {
            id: 1,
            type: 'Ceramic',
            value: 'Ceramic',
            image: require('../assets/images/image1.jpg'),
            select: false
        },
        {
            id: 2,
            type: 'Hardwood',
            image: require('../assets/images/image2.jpg'),
            value: 'Hardwood',
            select: false
        }, {
            id: 3,
            type: 'Prelard flottan',
            image: require('../assets/images/image1.jpg'),
            value: 'Prelard flottan',
            select: false
        }
    ]
    let SelectStore = [
        {
            id: 0,
            store: 'All',
            value: 'All',
            select: true
        },
        {
            id: 1,
            store: 'Flor Deco',
            value: 'Flordeco',
            image: require('../assets/images/image_porcelain.jpg'),
            select: false
        },
        {
            id: 2,
            store: 'Arzo',
            value: 'Arzo',
            image: require('../assets/images/rona.png'),
            select: false
        }, {
            id: 3,
            store: 'Home depot',
            value: 'homedepot',
            image: require('../assets/images/homeDepot.png'),
            select: false
        }
    ]
    const [selectType, setSelectType] = useState()
    const [floorTypesList, setFloorTypesList] = useState(SelectFloorTypes)
    const [floorShapesList, setFloorShapesList] = useState(SelectStore)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const floorTypeSelectFunction = (index) => {
        let array = [...SelectFloorTypes]
        array[index].select = true
        setFloorTypesList(array)
        setSearchFloorType(array[index].value)
        for (let i = 0; i < SelectFloorTypes.length; i++) {
            if (i !== index) SelectFloorTypes[i].select = false
        }
    }
    const floorStoreSelectFunction = (index) => {
        let array = [...SelectStore]
        array[index].select = true
        setFloorShapesList(array)
        setSearchFloorStore(array[index].value)
        for (let i = 0; i < SelectStore.length; i++) {
            if (i !== index) SelectStore[i].select = false
        }
    }
    // console.log("*****SEARCH", searchFloorType, searchFloorStore)
    const { t } = useTranslation();
    const theme = useTheme();
    // const [floorType, setFloorType] = useState('All')
    // const [color, setColor] = useState('All')
    // const [shape, setShape] = useState('All')
    // let floorColors = [
    //     { label: "Colors", value: 'All', details: null },
    //     { label: 'White', value: 'White', details: null },
    //     { label: "Black", value: 'Black', details: null },
    //     { label: 'Grey', value: 'Grey', details: null },
    //     { label: 'Dark grey', value: 'Dark grey', details: null },
    //     { label: 'Light grey', value: 'Light grey', details: null },
    //     { label: 'Taupe', value: 'Taupe', details: null },
    //     { label: 'Cement', value: 'Cement', details: null },
    //     { label: 'Blanco', value: 'Blanco', details: null },
    //     { label: 'Carbon', value: 'Carbon', details: null },
    //     { label: 'Mink', value: 'Mink', details: null },
    //     { label: 'Beige', value: 'Beige', details: null },
    //     { label: 'Musk', value: 'Musk', details: null },
    //     { label: 'Baugi', value: 'Baugi', details: null },
    //     { label: 'Taupe', value: 'Taupe', details: null },
    //     { label: 'Sand', value: 'Sand', details: null },
    //     { label: 'Iron', value: 'Iron', details: null },
    //     { label: 'Emerald', value: 'Emerald', details: null },
    //     { label: 'Teak', value: 'Teak', details: null },
    //     { label: 'Ocean', value: 'Ocean', details: null },
    //     { label: 'Grey', value: 'Grey', details: null },
    //     { label: 'Ivory', value: 'Ivory', details: null },
    //     { label: 'Perla', value: 'Perla', details: null },
    //     { label: 'Loki', value: 'Loki', details: null },
    //     { label: 'Anthracite', value: 'Anthracite', details: null },
    //     { label: 'Copper', value: 'Copper', details: null },
    // ]
    // let floorShapes = [
    //     { label: "Shape", value: 'All', details: null },
    //     { label: 'red', value: 'red', details: null },
    //     { label: "blue", value: 'blue', details: null },
    //     { label: 'Green', value: 'green', details: null },
    //     { label: 'Gray', value: 'gray', details: null },
    // ]
    // let floorTypes = [
    //     { label: t('floor:all'), value: 'All', details: null },
    //     { label: t('floor:hardwood'), value: 'hardwood', details: null },
    //     { label: t('floor:engineeredWood'), value: 'engineeredWood', details: null },
    //     { label: t('floor:preOil'), value: 'preOiledWood', details: null },
    //     { label: t('floor:laminate'), value: 'laminate', details: null },
    //     { label: t('floor:vinylPlank'), value: 'vinylPlank', details: null },
    //     { label: t('floor:ceramic'), value: 'ceramic', details: null },
    //     { label: t('floor:carpet'), value: 'carpet', details: null },
    //     { label: t('floor:vinylFlakes'), value: 'vinylFlakes', details: null },
    // ]

    const renderItemType = ({ item, index }) => (
        <MainContainer  >
            <FloorsContainer select={item.select} onPress={() => floorTypeSelectFunction(index)}>
                <FloorTypeImage resizeMode={'contain'} source={item.image} />
                <Text
                    marginTop={'5px'}
                    align={'center'}
                    size={'14px'}
                >{item.type}</Text>
            </FloorsContainer>
        </MainContainer>
    );
    const renderItemStore = ({ item, index }) => (
        <MainContainer  >
            <FloorsContainer select={item.select} onPress={() => floorStoreSelectFunction(index)}>
                <FloorStoreImage resizeMode={'center'} source={item.image} />
                <Text
                    marginTop={'5px'}
                    align={'center'}
                    size={'14px'}
                >{item.store}</Text>
            </FloorsContainer>
        </MainContainer>
    );
    const onPressReset = () => {
        setAddedFloors(false)
        setSearchFloorType('All')
        setSearchFloorStore('All')
        setSearchFloorColor('All')
        // to make floor type reset 
        let array = [...SelectFloorTypes]
        for (let i = 0; i < SelectFloorTypes.length; i++) {
            SelectFloorTypes[0].select = true
            SelectFloorTypes[i].select = false
        }
        setFloorTypesList(array)
        // for floor store filter reset
        let array2 = [...SelectStore]
        for (let i = 0; i < SelectStore.length; i++) {
            SelectStore[0].select = true
            SelectStore[i].select = false
        }
        setFloorShapesList(array2)
    }
    return (
        <Modal {...props}>
            <Container>
                <Window>
                    <HeaderRow>
                        <Title>{t('filter')}</Title>
                        <TouchableOpacity onPress={() => props.setVisible(!props.visible)}><Icon size={25} name="closecircle" color={theme.red} /></TouchableOpacity>
                    </HeaderRow>
                    <View style={{ marginLeft: 10 }}>
                        <Text weight={'bold'} marginTop={'5px'} >Floor type</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={floorTypesList}
                        renderItem={renderItemType}
                        keyExtractor={item => item.id.toString()} />
                    <View style={{ marginLeft: 10 }}>
                        <Text weight={'bold'} marginTop={'5px'} >Store</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={floorShapesList}
                        renderItem={renderItemStore}
                        keyExtractor={item => item.id.toString()} />
                    {props.showCheckbox &&
                        <CheckboxContainer>
                            <CheckBox
                                disabled={false}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                boxType={'square'}
                                value={addedFloors}
                                lineWidth={3}
                                onCheckColor={"#018ABE"}
                                onTintColor={"#018ABE"}
                                onValueChange={(newValue) => {
                                    setToggleCheckBox(newValue)
                                    setAddedFloors(newValue)
                                }}
                            />
                            <TextContainer>
                                <Text>Show floors only for this list</Text>
                            </TextContainer>
                        </CheckboxContainer>}

                    {/* <Row style={{ paddingTop: 5, zIndex: 1 }}>


                        <DropDownPicker
                            items={floorColors}
                            defaultValue={color}
                            containerStyle={dropDownStyles.containerStyle}
                            style={dropDownStyles.style}
                            arrowColor={'white'}
                            itemStyle={dropDownStyles.itemStyle}
                            dropDownStyle={dropDownStyles.dropDownStyle}
                            activeLabelStyle={{ fontWeight: 'bold', color: 'white' }}
                            onChangeItem={item => {
                                setColor(item.value)
                                setSearchFloorColor(item.value)
                            }}
                            labelStyle={{ fontSize: 16, color: 'white' }}
                        />
                        <DropDownPicker
                            items={floorShapes}
                            defaultValue={shape}
                            containerStyle={dropDownStyles.containerStyle}
                            style={dropDownStyles.style}

                            itemStyle={dropDownStyles.itemStyle}
                            arrowColor={'white'}

                            dropDownStyle={dropDownStyles.dropDownStyle}
                            activeLabelStyle={{ fontWeight: 'bold', color: 'white' }}
                            onChangeItem={item =>
                                setShape(item.value)
                            }
                            labelStyle={{ fontSize: 16, color: 'white' }}
                        />

  
                    </Row> */}
                    <ButtonsContainer>
                        <Button reset={true} onPress={() => onPressReset()}>
                            <ButtonTitle>Reset</ButtonTitle>
                        </Button>
                        <Button onPress={() => props.setVisible(!props.visible)}>
                            <ButtonTitle>Confirm</ButtonTitle>
                        </Button>
                    </ButtonsContainer>
                </Window>
            </Container>
        </Modal>
    );
}

export default FilterModal;

const Modal = styled.Modal`
    
`
const Container = styled.View`
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Window = styled.View`
    width: 320px;
    height: 550px;
    border-radius: 15px;
    background-color: ${props => props.theme.primaryGrey};
`
const HeaderRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.borderColor};
`
const Title = styled.Text`
    font-size: 20px;
`
const FloorsContainer = styled.TouchableOpacity`
background-color:white;
border-width:1px
border-radius:5px;
border-color:white;
margin-left:10px;
margin-top:10px;
border-color: ${props => props.select ? '#018ABE' : 'transparent'};
border-width:${props => props.select ? '3px' : '3px'}
`
const MainContainer = styled.View`
`
const FloorTypeImage = styled.Image`
width:100px;
height:100px;
border-top-left-radius:5px;
border-top-right-radius:5px;
`
const FloorStoreImage = styled.Image`
width:100px;
height:80px;
border-top-left-radius:5px;
border-top-right-radius:5px;
`
// const Row = styled.View`
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
// `
// const ItemTitle = styled.Text`
//     font-size: 16px;
//     font-weight: bold;
// `
// const SelectFloorTypes = styled.Flatlist`
// `
const TypeText = styled.Text`
text-align:center;
margin-vertical:5px
`
const Button = styled.TouchableOpacity`
background-color:${props => props.reset ? props.theme.red : 'green'}
justify-content:center;
align-items:center;
width:45%;
align-self:center;
border-radius:10px;
margin-bottom:15px;
`
const ButtonTitle = styled.Text`
color:white
padding:10px
font-size:16px
font-weight:bold
`
const CheckboxContainer = styled.View`
padding-horizontal:20px;
padding-bottom:15px;
flex-direction:row
`
const TextContainer = styled.View`
padding-left:10px;
`
const ButtonsContainer = styled.View`
flex-direction:row
justify-content:space-evenly
padding-bottom:20px
`
// const dropDownStyles = StyleSheet.create({
//     containerStyle: {
//         height: 40,
//         borderColor: '#018ABE',
//         width: 100,
//         margin: 10,
//         marginBottom: 40
//     },
//     style: {
//         borderTopLeftRadius: 25, borderTopRightRadius: 25,
//         borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: '#018ABE',
//         zIndex: 999
//     },
//     itemStyle: {
//         justifyContent: 'flex-start',
//     },
//     dropDownStyle: {
//         backgroundColor: '#018ABE',
//         borderTopLeftRadius: 0,
//         borderTopRightRadius: 0,
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//     },
// })