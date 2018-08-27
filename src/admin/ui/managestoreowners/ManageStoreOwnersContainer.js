import { connect } from 'react-redux'
import ManageStoreOwners from './ManageStoreOwners'
import { addStoreOwner, getStoreOwners, getAccountAddress } from './ManageStoreOwnersActions'

const mapStateToProps = (state, ownProps) => {
    return {
        storeOwnerList: state.admin.storeOwnerList,
        address: state.admin.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUpFormSubmit: (storeOwnerAddress) => {
            dispatch(addStoreOwner(storeOwnerAddress))
        },
        getStoreOwners: () => {
            dispatch(getStoreOwners())
        },
        getAddress: () => {
            dispatch(getAccountAddress())
        }
    }
}

const ManageStoreOwnersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStoreOwners)

export default ManageStoreOwnersContainer
