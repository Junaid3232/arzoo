import { Text } from 'components/common/Text';
import React from 'react';
import styled from 'styled-components/native';
import AttributeCard from './AttributeCard';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AllAttributeCards = ({ type, attributes }) => {
    return (
        <Container>
            <StyledText
                size="xlarge"
                weight="600">
                {type == 'category' ? 'Categories' : 'Stores'}
            </StyledText>
            <SideScroll horizontal={true}>
                {
                    attributes &&
                    attributes.map((item) => {
                        return (
                            <AttributeCard
                                imageLink={item.thumbnailURL}
                                title={item.name.en}
                                type={type} />
                        )
                    })
                }
            </SideScroll>
        </Container>
    );
}

export default AllAttributeCards;

const Container = styled.View`
  
`;

const StyledText = styled(Text)`
    padding: ${hp('1.5%')}px ${wp('3%')}px;
`

const SideScroll = styled.ScrollView`
    padding-bottom: ${hp('1.5%')}px;
`