import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose,
} from 'redux'

import createSagaMiddleware from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'

import history from '../wrapper/myHistory'

import rootSaga from './sagas'
import { App } from './App'
import { Login } from './Login'
import { Top } from './Top'


//---- Store の永続化設定

//-- Reducer 全体の persistConfig (永続化設定)
const persistConfig = {
    transforms: [immutableTransform()],
    key: "ExbplusReduxStore",
    storage,
    //whitelist: [ '' ],
    blacklist: [ 
        // Session で維持する状態は全て記録しない
        'Session',
        // 以下、特殊な persistConfig 指定のため全体から外した状態
        'App',
        'Login',
        'Top',
    ],
}


//-- リクエスト中の状態を保存しないための特殊な persistConfig 集

const appConfig = {
    key: 'App',
    storage: storage,
    blacklist: ['errorOpen', 'errorMessage'],
    transforms: [immutableTransform()]
}

const loginConfig = {
    key: 'Login',
    storage: storage,
    blacklist: ['isRequest'],
    transforms: [immutableTransform()]
}

const topConfig = {
    key: 'Top',
    storage: storage,
    blacklist: ['isReqAttend'],
    transforms: [immutableTransform()]
}

const myReducer = combineReducers({
    App: persistReducer(appConfig, App),
    Login: persistReducer(loginConfig, Login),
    Top: persistReducer(topConfig, Top),
    router: routerReducer,
})


// 非同期タスク処理のためのミドルウェア redux-saga 生成
const sagaMiddleware = createSagaMiddleware()

// history API ルーティングのためのミドルウェア react-router-redux 生成
const rtMiddleware = routerMiddleware(history)

// 永続化設定を加えた reducer を生成
const persistedReducer = persistReducer(persistConfig, myReducer)

// Redux の Store の本体を生成
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(sagaMiddleware, rtMiddleware)
)(createStore)

const myStore = createStoreWithMiddleware(persistedReducer)

/* // Redux の Store の本体を生成 (以前の redux の書き方)
const myStore = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
        sagaMiddleware,
        rtMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
)
*/

// redux-saga の受付タスク開始
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(myStore)

export default myStore

