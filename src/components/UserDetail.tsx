import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ColumnStart, Row } from 'components/common/View';
import { Text } from './common/Text';
import { ViewProps } from 'react-native';
import { ReactNode } from 'react';
import useTheme from 'hooks/useTheme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ViewComponentProps extends ViewProps {
    label: string,
    children?: ReactNode,
    lines?: Array<string>,
}

const UserDetail: FC<ViewComponentProps> = ({ label, lines, children }) => {

    const theme = useTheme();



    return (
        <Wrapper>
            {
                lines ? (
                    <>
                        <TextWrapper size="1.9" color={theme.grey}>{label}</TextWrapper>
                        <ColumnStart>
                            {lines.map((item, index) => {
                                return (
                                    <Text key={index} size="1.9" weight="bold">{item}</Text>
                                )
                            })}
                        </ColumnStart>
                    </>
                ) : (
                    <>
                        <TextWrapper color={theme.grey}>{label}</TextWrapper>
                        <Text size="1.9" weight="bold">{children}</Text>
                    </>
                )}

        </Wrapper>
    );
}

export default UserDetail;

const Wrapper = styled(Row)`
    margin: ${hp("0.6%")}px 0;
`

const TextWrapper = styled(Text)`
    width: ${wp("30%")}px;;
`
