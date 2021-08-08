import { createContext, useContext } from 'react';
export type NetworkContextType = {
    connectionType: string;
    setConnectionType: (connectionType: string) => void;
    isConnected: boolean | null;
    setIsConnected:(isConnected: boolean | null) => void;
}

export const NetworkContext = createContext<NetworkContextType>({ connectionType: '', setConnectionType: connectionType => console.warn('no editMode provider'), isConnected: false, setIsConnected: isConnected => console.warn('no editMode provider')});
export const useNetwork = () => useContext(NetworkContext);
