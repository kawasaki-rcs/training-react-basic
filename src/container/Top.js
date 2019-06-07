import { connect } from 'react-redux'

//import {  } from '../module/Top'
import Top from '../component/Top'

import { reqPush } from '../module/session'
import { reqAttend } from '../module/Top';

const mapStateToProps = state => {
    return { 
        //isReqLogin: state.Login.isReqLogin,
        username: state.Login.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //reqLogin: (data) => dispatch(reqLogin(data)),
        reqPush: (data) => dispatch(reqPush(data)),
        reqAttend: (data) => dispatch(reqAttend(data)),
    }
}

const TopApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Top)

export default TopApp




