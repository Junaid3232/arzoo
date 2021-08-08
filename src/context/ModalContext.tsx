import { createContext, useContext } from 'react';
export type ModalContextType = {
    emailModal: boolean;
    setEmailModal: (emailModal: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>({ emailModal: false, setEmailModal: emailModal => console.warn('no editMode provider')});
export const useModal = () => useContext(ModalContext);
