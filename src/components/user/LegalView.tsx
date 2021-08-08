import { Text } from 'components/common/Text';
import React from 'react';
import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';

const LegalView = ({params}) => {


    return (
        <Container>
            <Text size="xlarge" weight="bold" align="center">TERMS OF USE</Text>
            <TextContent>
                <Text align="justify">Please read this End User License Agreement (“EULA”) before You purchase a License Key for the Sketch Mac App and subsequently download and use the Sketch Mac App.

                    By purchasing a License Key and/or downloading and using the Sketch Mac App, You agree, without reservation to be bound by the terms of this EULA. If You do not agree with the terms of this EULA, please do not purchase a License Key and/or download and use the Sketch Mac App.

                    If You accept the terms and conditions in this EULA on behalf of a company or other legal entity, You warrant that You have full legal authority to accept the terms and conditions in this EULA on behalf of such company or other legal entity, and to legally bind such company or other legal entity.

                    You may not accept this EULA if You are not of legal age to form a binding contract with Sketch.

                    Definitions
                    In this EULA the expressions below shall have the meaning assigned to them in this clause, unless the context requires otherwise:

                    “Activate” turning the Trial version into the Full version of the same application with the License Key provided by Sketch;
                    “Contributor” You when You are assigned the role of contributor via the Sketch collaboration tool Sketch for Teams;
                    “Contributor version” the license to Use the Sketch Mac App for the term that You qualify as a Contributor;
                    “Documentation” the detailed information about the Sketch Mac App, its features and the system requirements as made available on the website of Sketch, as amended from time to time;
                    “Full version” the license for the Sketch Mac App for the term specified on the webpage of the store where You purchase the license, or in any applicable agreement concerning the purchase of the license (as stand-alone product or as part of a subscription) to Use the Sketch Mac App;
                </Text>
            </TextContent>
        </Container>
    );
}

export default LegalView;

const Container = styled.View`
    background-color: white;
    border-radius: ${hp("3%")}px;
    margin-top: ${hp("2.5%")}px;
    padding: ${hp("0%")}px ${wp("2%")}px;
    padding-top: ${hp("1%")}px;
    height: ${hp("83%")}px;
    width: ${wp("92%")}px;
    align-self: center;
`;

const TextContent = styled.ScrollView`
    margin: ${hp("0%")}px ${wp("0%")}px;
    margin-top: ${hp("1%")}px;
    padding: ${hp("0%")}px ${wp("4%")}px;
`