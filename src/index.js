import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'

import myStore, { persistor } from './module/rootReducer'
import ErrorBoundary from './component/ErrorBoundary'

// デザインフレームワーク全体に適用される設定（＝テーマ）
const theme = createMuiTheme({
    typography: {
        fontFamily: "'Noto Sans JP', sans-serif",
        fontDisplay: "swap",
        useNextVariants: true,
    },
})

ReactDOM.render(
    <Provider store={myStore} >
        <PersistGate persistor={persistor} >
            <MuiThemeProvider theme={theme} >
                <ErrorBoundary >
                    <App />
                </ErrorBoundary>
            </MuiThemeProvider>
        </PersistGate>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
