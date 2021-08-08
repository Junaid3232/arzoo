import { createContext, useContext } from 'react';


export type ListEditModeContextType = {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

export const ListEditModeContext = createContext<ListEditModeContextType>({ editMode: false, setEditMode: editMode => console.warn('no editMode provider')});
export const useEditMode = () => useContext(ListEditModeContext);
