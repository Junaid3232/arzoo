import { createContext, useContext } from 'react';

export type UserContextType = {
    user: String;
    setUser: (user: String) => void;
    access: String;
    setAccess: (access: String) => void;
}

export const UserContext = createContext<UserContextType>({ user: '', setUser: user => console.warn('no user provider'), access: '', setAccess: access => console.warn('no access provider')});
export const useUser = () => useContext(UserContext);