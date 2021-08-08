import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'styled-components';
import Carousel from 'components/Carousel';
import { useTranslation } from 'react-i18next';
import 'localization';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FloorCard from 'components/floor/FloorCard';
import HeaderPanel from 'components/HeaderPanel';

const ProjectScreen = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <Content>
                <View>
                    <Header>
                        <ProjectTitle>This is the project title</ProjectTitle>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}><Icon name="close-circle-outline" size={35} style={{ padding: 5 }} color={'black'} /></TouchableOpacity>
                    </Header>
                    <Row>
                        <Carousel
                            style="slides"
                            itemsPerInterval={1}
                            items={[{
                                title: 'Welcome, swipe to continue.',
                            }, {
                                title: 'About feature X.',
                            }, {
                                title: 'About feature Y.',
                            }, {
                                title: 'About feature Y.',
                            }]}
                        />
                    </Row>
                    <CustomRow>

                        <HeaderPanel uid={''} />
                    </CustomRow>
                    <ProjectText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</ProjectText>
                    <FloorCard uid="Plancher stratifié Mono Serra" title={true} />
                </View>
                <Row style={{ justifyContent: 'space-between', marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
                    <Row>
                        <Button>
                            <Icon name="location-outline" size={20} color={'black'} style={{ paddingLeft: 12, paddingRight: 4 }} />
                            <FloorButtonText>
                                {t('project:find')}
                            </FloorButtonText>
                        </Button>
                    </Row>
                    <Row>
                        <Button type={"modify"}>
                            <ButtonText type="modify">{t('project:modify')}</ButtonText>
                        </Button>
                    </Row>
                </Row>
            </Content>
        </Container>
    );
}

export default ProjectScreen;

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.primary};
`;

const Content = styled.View`
    background-color: white;
    width: 98%;
    height: 99%;
    margin: 0.5% auto;
    border-radius: 25px;
    border-width: 1px;
    border-color: ${props => props.theme.borderColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.borderColor};
`

const ProjectTitle = styled.Text`
    font-size: 20px;
    font-weight: 400;
    margin-left: 15px;
`

const ProjectText = styled.Text`
    font-size: 13px;
    padding:0 20px;
    width: 100%;
`

const Row = styled.View`
    flex-direction: row;
`

const FloorButtonText = styled.Text`
    font-weight: 500;
    font-size: 15px;
    padding: 5px 0px;
    padding-right: 18px;
`

const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.type === 'modify' ? props.theme.accent : props.theme.lightAccent};
    border-radius: 5px;
`
const ButtonText = styled.Text`
    color: ${props => props.type === 'modify' ? 'white' : 'black'};
    font-weight: 500;
    font-size: 15px;
    padding: 5px 18px;
`
const CustomRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    margin-left: 20px;
`
