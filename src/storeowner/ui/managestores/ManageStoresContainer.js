import { connect } from 'react-redux'
import ManageStores from './ManageStores'
import { addStore, getStores, getStoreSelected } from './ManageStoresActions'

const mapStateToProps = (state, ownProps) => {
    return {
        storeList: state.storeowner.storeList,
        currentStore: state.storeowner.currentStore
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

    }
}

const ManageStoresContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStores)

export default ManageStoresContainer
