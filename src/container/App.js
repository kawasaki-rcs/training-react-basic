import { connect } from 'react-redux'

import App from '../App'

import { setMainError } from '../module/App';

const mapStateToProps = state => {
    return { 
        errorOpen: state.App.errorOpen,
        errorMessage: state.App.errorMessage,
        openReLoginDlg: state.Login.openReLoginDlg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMainError: (data) => dispatch(setMainError(data)),
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp




