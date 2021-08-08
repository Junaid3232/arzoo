import styled, { css } from 'styled-components/native';
import { ViewProps } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface TextProps extends ViewProps {
    variant?: String
    color?: String
    weight?: String
    size?: String
    margin?: string
    marginTop?: string
    marginBot?: string
    width: string
    align?: string
    underline?: boolean
}

export const Text = styled.Text<TextProps>`
    font-size: ${props => props.size ? props.size : `${hp('1.8%')}px`};
    text-decoration-line: ${props => props.underline ? "underline" : 'none'};
    color: ${props => props.color ? props.color : 'black'};
    font-family: "Hind-Regular";
    width: ${props => props.width ? props.width : 'auto'};
    font-weight: ${props => props.weight ? props.weight : 'normal'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0'};
    margin-bottom: ${props => props.marginBot ? props.marginBot : '0'};
    text-align: ${props => props.align ? props.align : 'left'};
    text-decoration-color:gray
    ${(props) =>
        props.variant === 'h2' &&
        css`
               font-size: 22px;
               font-weight: ${props => props.weight ? props.weight : 'bold'};

    `}
    ${(props) =>
        props.variant === 'h3' &&
        css`
               font-size: 20px;
               font-weight: ${props => props.weight ? props.weight : 'bold'};
    `}
    ${(props) =>
        props.variant === 'h4' &&
        css`
               font-size: 18px;
               font-weight: ${props => props.weight ? props.weight : 'bold'};
    `}
    ${(props) =>
        props.variant === 'small' &&
        css`
               font-size: 14px;
               font-weight: ${props => props.weight ? props.weight : 'normal'};
    `}
    ${(props) =>
        props.size === '1.9' &&
        css`
               font-size: ${hp('1.9%')}px;
    `}
    ${(props) =>
        props.size === '1.8' &&
        css`
               font-size: ${hp('1.8%')}px;
    `}
    ${(props) =>
        props.size === 'normal' &&
        css`
               font-size: ${hp('2%')}px;
    `}
    ${(props) =>
        props.size === 'large' &&
        css`
               font-size: ${hp('2.2%')}px;
    `}
    ${(props) =>
        props.size === 'xlarge' &&
        css`
               font-size: ${hp('2.6%')}px;
    `}
`