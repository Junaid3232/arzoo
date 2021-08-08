import React from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text } from 'components/common/Text';
import { Row, RowCentered, RowJustifyCentered } from 'components/common/View';

const AttributeCard = ({ imageLink, title, type }) => {
    return (
        <Container type={type}>
            <RowJustifyCentered>
                <LogoImage
                    resizeMode={type == 'category' ? 'cover' : 'contain'}
                    source={{ uri: imageLink }}
                    type={type}
                />
            </RowJustifyCentered>
            {
                type == 'category' ? (
                    <StyledRow>
                        <StyledText
                            size={hp('1.8%')}
                            weight="600"
                            type={type}
                        >
                            {title}
                        </StyledText>
                    </StyledRow>
                ) : (
                    <></>
                )
            }
        </Container>
    );
}

export default AttributeCard;

const Container = styled.TouchableOpacity`
    background-color: white;
    width: ${wp('30%')}px;
    margin-left: ${wp('1.5%')}px;
    margin-right: ${wp('1.5%')}px;
    border-radius: ${hp('1%')}px;
`;

const LogoImage = styled.Image`
    border-top-left-radius: ${hp('1%')}px;
    border-top-right-radius: ${hp('1%')}px;
    width: ${props => props.type == 'category' ? `${wp('30%')}px` : `${wp('22%')}px`};
    height: ${props => props.type == 'category' ? `${hp('14%')}px` : `${hp('11%')}px`};
`

const StyledRow = styled.View`
    justify-content: center;
    align-items: center;
    margin: ${hp('0.3%')}px;
`

const StyledText = styled(Text)`
    text-align: center;
    margin-top: ${hp('0.5%')}px;
`