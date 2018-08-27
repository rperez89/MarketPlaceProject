import { connect } from 'react-redux'
import Store from './Store'
import { addStore, getStores, getStoreSelected, getStoreName, getStoreInfo } from '../managestores/ManageStoresActions'

const mapStateToProps = (state, ownProps) => {
    return {
        storeAddress: state.storeowner.storeAddress,
        storeName: state.storeowner.storeName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUpFormSubmit: (storeName) => {
            dispatch(addStore(storeName))
        },
        getStores: () => {
            dispatch(getStores())
        },
        onStoreClick: (storeAddress) => {
            dispatch(getStoreSelected(storeAddress))
        },
        getCurrentStoreName: () => {
            dispatch(getStoreName())
        },
        getStoreInfo: () => {
            dispatch(getStoreInfo())
        }
    }
}

const StoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)

export default StoreContainer
