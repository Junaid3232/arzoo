import React, { createContext, useState } from 'react';
export const PrivateModeContext = createContext<boolean>();

export const PrivateModeProvider = props => {
    const [privateMode, setPrivateMode] = useState<boolean>()

    return (
        <PrivateModeContext.Provider value={[privateMode, setPrivateMode]}>
            {props.children}
        </PrivateModeContext.Provider>
    )
}