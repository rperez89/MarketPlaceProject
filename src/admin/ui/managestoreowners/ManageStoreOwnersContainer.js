import { connect } from 'react-redux'
import ManageStoreOwners from './ManageStoreOwners'
import { addStoreOwner, getStoreOwners } from './ManageStoreOwnersActions'

const mapStateToProps = (state, ownProps) => {
    return {
        storeOwnerList: state.admin.storeOwnerList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUpFormSubmit: (storeOwnerAddress) => {
            dispatch(addStoreOwner(storeOwnerAddress))
        },
        getStoreOwners: () => {
            dispatch(getStoreOwners())
        }
    }
}

const ManageStoreOwnersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStoreOwners)

export default ManageStoreOwnersContainer
