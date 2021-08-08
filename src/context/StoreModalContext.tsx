import { createContext, useContext } from 'react';

export type StoreModalContextType = {
    modalActive: boolean;
    setModalActive: (modalActive: boolean) => void;
    detailsModalActive: boolean;
    setDetailsModalActive: (detailsModalActive: boolean) => void;
}

export const StoreModalContext = createContext<StoreModalContextType>({ modalActive: false, setModalActive: modalActive => console.warn('no modals provider'), detailsModalActive: false, setDetailsModalActive: detailsModalActive => console.warn('no modals provider')});
export const useStoreModal = () => useContext(StoreModalContext);