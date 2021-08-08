import React, { createContext, useState } from 'react';
export const FilterContext = createContext<any>();

export const FilterProvider = props => {
    const [searchFloorType, setSearchFloorType] = useState<string>('All')
    const [searchFloorStore, setSearchFloorStore] = useState<string>('All')
    const [searchFloorColor, setSearchFloorColor] = useState<string>('All')
    const [addedFloors, setAddedFloors] = useState(false)
    const [getSelectedListId, setGetSelectedListId] = useState<any>('')

    return (
        <FilterContext.Provider
            value={[
                searchFloorType,
                setSearchFloorType,
                searchFloorStore,
                setSearchFloorStore,
                searchFloorColor,
                setSearchFloorColor,
                addedFloors,
                setAddedFloors,
                getSelectedListId,
                setGetSelectedListId
            ]}>
            {props.children}
        </FilterContext.Provider>
    )
}