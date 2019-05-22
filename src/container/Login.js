import { connect } from 'react-redux'

import { reqLogin } from '../module/Login'
import Login from '../component/Login'

import { reqPush } from '../module/session'

const mapStateToProps = state => {
    return { 
        isReqLogin: state.Login.isReqLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqLogin: (data) => dispatch(reqLogin(data)),
        reqPush: (data) => dispatch(reqPush(data)),
    }
}

const LoginApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginApp




