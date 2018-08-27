const initialState = {
    storeOwnerList: null,
    address: ''
}

const adminReducer = (state = initialState, action) => {
    if (action.type === 'STOREOWNER_ADDED') {
        return Object.assign({}, state, {
            //storeOwnerList: action.payload
        })
    }
    if (action.type === 'GET_STOREOWNERS') {
        return Object.assign({}, state, {
            storeOwnerList: action.payload
        })
    }
    if (action.type === 'SET_ADDRESS') {
        return Object.assign({}, state, {
            address: action.payload
        })
    }
    return state
}

export default adminReducer
