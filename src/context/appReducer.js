export const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            window.localStorage.setItem('itemsSavedOnlocalStorage', JSON.stringify([...state.itemsSelected, action.payload]));
            return {
                ...state,
                itemsSelected: [...state.itemsSelected, action.payload]
            }
        case 'REMOVE_ITEM':
            window.localStorage.setItem('itemsSavedOnlocalStorage', JSON.stringify(state.itemsSelected.filter(item => item.name !== action.payload.name)));
            return {
                ...state,
                itemsSelected: state.itemsSelected.filter(item => item.name !== action.payload.name)
            }
        case 'UPDATE_ITEM':
            window.localStorage.setItem('itemsSavedOnlocalStorage', JSON.stringify(state.itemsSelected.filter(item => item.name !== action.payload.name)));
            return {
                ...state,
                itemsSelected: state.itemsSelected.filter(item => item.name !== action.payload.name),
                itemToUpdate: action.payload
            }
        case 'REMOVE_ALL_ITEMS':
            window.localStorage.setItem('itemsSavedOnlocalStorage', JSON.stringify([]));
            return {
                ...state,
                itemsSelected: []
            }
        
        default:
            return state;
    }   
}