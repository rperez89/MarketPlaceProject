const initialState = {
    storeList: [],
    currentStore: '',
    storeAddress: ''
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
    if (action.type === 'STORE_SELECTED') {
        return Object.assign({}, state, {
            storeAddress: action.payload
        })
    }
    return state
}

export default storeOwnerReducer
