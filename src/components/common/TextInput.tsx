import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, TextPropTypes, ViewProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
// import { Tooltip } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';
import { FC } from 'react';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TextInput = (props) => {
    const [errorVisible, setErrorVisible] = useState(props.showErrorText)

    useEffect(()=>{
        console.log("########",props)
    },[])
    // const [visible, setVisible] = useState(true);

    const { inputRef } = props

    const theme = useTheme();
    return (
        <Row {...props}>
            <Container style={styles.containerStyle} bgColor={props.color} {...props} ref={inputRef} placeholderTextColor={theme.lightGrey} >
           
            </Container>
            {
                props.showErrorText ?
                    <IconBlock>
                        <Tooltip
                            isVisible={props.isVisible}
                            content={<ErrorText>{props.errorText}</ErrorText>}
                            backgroundColor='rgba(0,0,0,0)'
                            disableShadow={true}
                            contentStyle={{ backgroundColor: ` rgb(0,0,0)`, padding: 10, width: 320, display: 'flex' }}
                            arrowStyle={{ display: 'flex' }}
                            onClose={() => props.setIsVisible(false)}
                            placement={"bottom"}
                        >
                            <Icon onPress={() => props.setIsVisible(!props.isVisible)} name={props.isVisible ? "error" : "error-outline"} size={25} style={{}} color={theme.red} />
                        </Tooltip>
                    </IconBlock>
                    :
                    <></>
            }
        </Row>
    );
}

export default TextInput;

const Row = styled.View.attrs(props => ({
    fullWidth: '100%',
    halfWidth: '50%'
}))`
    flex-direction:row;
    width: ${props => props.width ? props.width : props.fullWidth};
    margin-top: ${props => props.marginTop ? props.marginTop : 0};
`

const Container = styled.TextInput.attrs(props => ({
    fullWidth: '100%',
    halfWidth: '50%'
}))`
    font-size: ${props => props.fontSize ? props.fontSize : `${hp('2.3%')}px`};
    background-color: ${props => props.bgColor ? props.bgColor : props.theme.white};
    padding: ${props => props.list ? "10px" : `${hp('1.9%')}px`};
    margin-bottom: ${hp('2%')}px;
    font-weight: 400;
    width: 100%;
    border-radius: ${wp("2%")}px;
`

const IconBlock = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 58px;
    width: 58px;
    margin-left: -50px;
`

const ErrorText = styled.Text`
    font-size: 16px;
    color: white;
`

const styles = StyleSheet.create({
    containerStyle: {
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.16,
        // shadowRadius: 2,
        // elevation: 3,
    },
    errorIcon: {
        width: '100%'
    }
})



interface SearchBarProps extends ViewProps {
    width?: string
    onChangeText : string
    height?: number
}


export const SearchBar: FC<SearchBarProps> = ({width, onChangeText, height}) => {
    const theme = useTheme();
    return (
        <SearchBlock>
            <SearchInput height={height} onChangeText={onChangeText} autoCorrection={false}/>
            <IconContainer>
                <IIcon size={25} name="search-outline" color={theme.lightGrey} />
            </IconContainer>
        </SearchBlock>
        
    )
};

const SearchBlock = styled.View`
    flex: 4;
    /* width: 500px; */
    justify-content: center;
`
const SearchInput = styled.TextInput`
    font-size: ${hp('2%')}px;
    background-color: ${props => props.theme.inputBG};
    padding: 5px;
    font-weight: 400;
    border-radius: 10px;
    width: 100%;
    height: ${props => props.height ? props.height : `${hp('4.4%')}px`};
    padding:0px 40px;
    margin-right: ${props => props.type === 'store' || props.type === 'slct' ? '10px' : '0px'};
`
const IconContainer = styled.View`
    position: absolute;
    height: 100%;
    justify-content: center;
    margin-left: 7px;
`

export const SmallTextInput = (props) => {
    const theme = useTheme();

    const {width, onChangeText, height, inputRef} = props
    return (
            <SmallInput 
                {...props} 
                height={height} 
                onChangeText={onChangeText} 
                autoCorrection={false}
                ref={inputRef} 
                placeholderTextColor={theme.grey}/>
                
        
    )
}

const SmallInput = styled.TextInput`
    font-size: ${hp('2%')}px;
    background-color: ${props => props.theme.inputBG};
    padding: 5px;
    font-weight: 400;
    border-radius: 10px;
    width: 100%;
    height: ${props => props.height ? props.height : `${hp('4.4%')}px`};
    padding:0px 10px;
    color: ${({ theme }) => theme.black};
`