import { createContext, useReducer } from "react";
import { appReducer } from "./appReducer";

var localStorage = window.localStorage;
var itemsSelected = localStorage.getItem('itemsSavedOnlocalStorage') ? JSON.parse(localStorage.getItem('itemsSavedOnlocalStorage')) : [];
console.log(`objetos cargados en memoria: ${itemsSelected}`, itemsSelected);

const initialState = {
    itemsSelected,
    itemToUpdate: {
        codigo: 0,
        name: "",
        precio: 0,
        cantidad: 0
    },
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    // appReducer es similar a useState, en la medida que produce un estado y una funcion para modificarlo.
    const [state, dispatch] = useReducer(appReducer, initialState);

    const addItem = item => {
        dispatch({
            type: 'ADD_ITEM',
            payload: item
        })
    }

    const removeItem = item => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: item
        })
    }

    const updateItem = item => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: item
        })
    }

    const removeAllItems = () => {
        dispatch({
            type: 'REMOVE_ALL_ITEMS'
        })
    }

    return (
        <GlobalContext.Provider value={{
            itemsSelected: state.itemsSelected,
            itemToUpdate: state.itemToUpdate,
            addItem,
            removeItem,
            updateItem,
            removeAllItems
        }}>
            {children}
        </GlobalContext.Provider>
    )

}