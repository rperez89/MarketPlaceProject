const initialState = {
    storeOwnerList: null
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
    return state
}

export default adminReducer
