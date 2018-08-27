const initialState = {
    storeList: [],
    currentStore: '',
    storeAddress: '',
    storeInstance: null,
    storeName: '',
    storeInfo: null
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
            storeAddress: action.payload,
            storeInstance: action.storeInstance
        })
    }
    if (action.type === 'GET_STORE_NAME') {
        console.log('Action')
        console.log(action.storeName);
        return Object.assign({}, state, {

            storeName: action.storeName

        })
    }
    if (action.type === 'GET_STORE_INFO') {
        console.log('Action')
        console.log(action.storeInfo);
        return Object.assign({}, state, {

            storeInfo: action.storeName

        })
    }
    return state
}

export default storeOwnerReducer
