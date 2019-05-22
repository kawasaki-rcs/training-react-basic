import { take, takeEvery, put, call, fork, race, delay } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    REQUEST_LOGIN, 
    FETCH_ERROR,
    FETCH_TIMEOUT,
    REQ_PUSH,
} from './actionTypes'

import { setPersistPath } from './others'
import { sessionCheck } from './session'

import {
    fetchLogin,
    successLogin,
    failureLogin,
} from './Login'

// fetch タイムアウト時間定数
const TIMEOUT_SECOND = () => process.env.REACT_APP_TIMEOUT_SECOND || 30000

//-- ログインタスク
function* runReqLogin(action) {
    try {
        const { res, timeout } = yield race({
            res: call(fetchLogin, action.payload),
            timeout: delay(TIMEOUT_SECOND()),
        })

        const { payload, error } = res
        if ( timeout ) yield put({ type: FETCH_TIMEOUT })
        if ( payload || !error ) {
            //- 成功
            //yield put(validToken())
            yield put(successLogin(payload))
        } else {
            //- エラー
            yield put(failureLogin(error))
            console.log(payload, error)
        }

    } catch (err) {
        yield put(failureLogin())
        yield put({ type: FETCH_ERROR })
        console.log(err)
    }
}

//-- ログインリクエスト受付
function* handleReqLogin() {
    yield takeEvery(REQUEST_LOGIN, runReqLogin)
  }

// セッション確認用のラッパーpushのリクエスト単位の実行タスク
function* runReqPush(action) {
    yield put(sessionCheck(action.payload))
    yield put(setPersistPath(action.payload))
    yield put(push(action.payload))
}

// セッション確認用のラッパーpush受付
function* handleReqPush() {
    yield takeEvery(REQ_PUSH, runReqPush);
}

// redux-sagaのタスク実行の大本になるジェネレート関数
export default function* rootSaga() {
    yield fork(handleReqLogin);
    yield fork(handleReqPush);
}



