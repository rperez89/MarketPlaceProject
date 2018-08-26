import { connect } from 'react-redux'
import ManageStores from './ManageStores'
import { addStore, getStores } from './ManageStoresActions'

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
        }
    }
}

const ManageStoresContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStores)

export default ManageStoresContainer
