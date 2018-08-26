import { connect } from 'react-redux'
import Store from './Store'
import { addStore, getStores, getStoreSelected } from '../managestores/ManageStoresActions'

const mapStateToProps = (state, ownProps) => {
    return {
        storeAddress: state.storeowner.storeAddress,
        //currentStore: state.storeowner.currentStore
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
        }
    }
}

const StoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)

export default StoreContainer
