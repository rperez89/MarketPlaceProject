const initialState = {
    storeList: [],
    currentStore: ''
}

const storeOwnerReducer = (state = initialState, action) => {
    if (action.type === 'STORE_ADDED') {
        return Object.assign({}, state, {
            currentStore: action.payload
        })
    }
    if (action.type === 'GET_STORES') {
        return Object.assign({}, state, {
            storeList: action.payload
        })
    }
    return state
}

export default storeOwnerReducer
