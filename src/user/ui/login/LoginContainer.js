import { connect } from 'react-redux'
import LoginButton from './Login'
import { loginUser } from './LoginActions'

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUserClick: (event) => {
            event.preventDefault();

            dispatch(loginUser())
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginButton)

export default LoginContainer
