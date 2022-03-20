export const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                itemsSelected: [...state.itemsSelected, action.payload]
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                itemsSelected: state.itemsSelected.filter(item => item.name !== action.payload.name)
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                itemsSelected: state.itemsSelected.filter(item => item.name !== action.payload.name),
                itemToUpdate: action.payload
            }
        default:
            return state;
    }
}