import { connect } from 'react-redux'

import { reqLogin } from '../module/Login'
import Login from '../component/Login'

import { reqPush } from '../module/session'

// React Component 内の props と、Redux Store 内の state とを結びつけた連想配列を返す
const mapStateToProps = state => {
    return { 
        isReqLogin: state.Login.isReqLogin,
    }
}

// React Component 内の props と、Redux Store 内の Action とを結びつけた連想配列を返す
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




