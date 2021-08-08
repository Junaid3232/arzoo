import React, { createContext, useState } from 'react';
export const UnitsContext = createContext();

export const UnitsProvider = props => {
    const [unit, setUnit] = useState()

    return (
        <UnitsContext.Provider value={[unit, setUnit]}>
            {props.children}
        </UnitsContext.Provider>
    )
}