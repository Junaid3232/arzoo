import React from 'react';
import styled, {css} from 'styled-components/native';
import {ViewProps} from 'react-native';

interface ViewComponentProps extends ViewProps {

}

export const View = styled.View<ViewComponentProps>`

`;

export const Flex = styled(View)`

`

export const FlexCentered = styled(Flex)`
    align-items: center;
    justify-content: center;
`

export const Row = styled(View)`
    flex-direction: row;
`;

export const RowSpreadBetween = styled(Row)`
    justify-content: space-between;
`

export const RowSpreadAround = styled(Row)`
    justify-content: space-around;
`

export const RowCentered = styled(Row)`
    align-items: center;
`

export const RowJustifyCentered = styled(Row)`
    justify-content: center;
`

export const RowEnd = styled(RowCentered)`
    justify-content: flex-end;
`

export const Column = styled(View)`
    flex-direction: column;
    align-items: center;
`

export const ColumnStart = styled(View)`
    align-items: flex-start;
`