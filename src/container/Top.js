import { connect } from 'react-redux'

//import {  } from '../module/Top'
import Top from '../component/Top'

import { reqPush } from '../module/session'

const mapStateToProps = state => {
    return { 
        //isReqLogin: state.Login.isReqLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //reqLogin: (data) => dispatch(reqLogin(data)),
        reqPush: (data) => dispatch(reqPush(data)),
    }
}

const TopApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Top)

export default TopApp




