import React, { createContext, useState } from 'react';

import { Dispatch, SetStateAction, /* and others */ } from "react";

type FloorFilterContextValue = {
  floorFilter: Array<String>
  // type, you get when hovering over `setState` from `useState`
  setFloorFilter: Dispatch<SetStateAction<Array<String>>>;
};


export const FloorFilterContext = createContext<FloorFilterContextValue | undefined>(undefined);

const FloorFilterContextProvider = ({children}) => {
    const [floorFilter, setFloorFilter] = useState([''])

    return (
        <FloorFilterContext.Provider value={[floorFilter, setFloorFilter]}>
            {children}
        </FloorFilterContext.Provider>
    );
}

export default FloorFilterContextProvider;
