import { take, takeEvery, put, call, fork, race, delay } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    REQUEST_LOGIN, 
    FETCH_ERROR,
    FETCH_TIMEOUT,
    REQ_PUSH,
    REQUEST_ATTEND,
    SUCCESS_LOGIN,
    INVALID_TOKEN,
} from './actionTypes'

import { setPersistPath } from './others'
import { sessionCheck } from './session'

import {
    fetchLogin,
    successLogin,
    failureLogin,
} from './Login'
import { fetchAttend, resAttend } from './Top';
import { setMainError } from './App';
import { parseErrorResponse } from './common';

// fetch タイムアウト時間定数
const TIMEOUT_SECOND = () => process.env.REACT_APP_TIMEOUT_SECOND || 30000

//-- 汎用タスク
// 目的別 takeEvery(ACTION, task) から呼出し
// take(ACTION) で呼び出してしまうと、エラー発生時にアクション受付処理ごと終わってしまう
function* runAuthReq(fetchAC, resAC, action) {
    // 認可失敗時に認証と再要求を行うためのループ処理
    while (true) {
      // fetchAC の call に一定秒以上かかると timeout = true のみ返される
      try {
            const { res, timeout } = yield race({
                res: call(fetchAC, action.payload),
                timeout: delay(TIMEOUT_SECOND())
            })

            if ( timeout ) {
                yield put( { type: FETCH_TIMEOUT } )
                break
            }

            const { payload, error } = res
            if ( !payload || error ) {
                if (true) {

                    const { payload, error } = res
                }
                //-- トークン無効エラー

                if ( true ) { // 本来は想定エラーであるかチェックをしておいたほうが良い
                //if ( error === EXPIRED_TOKEN_ERR ) {
                    yield put(setMainError({ errorMessage: "再ログインして下さい。" }))
                    yield put( { type: INVALID_TOKEN } )
                    yield take(SUCCESS_LOGIN)
                    continue
                }

                //-- いずれのトークンエラーでもなかった場合
                //! 上記で全て無効トークン判定に拾われるので以下は無意味
                console.log("予期されないエラー")
                console.log(payload, error)
                yield put(setMainError({ errorMessage: parseErrorResponse(error) }))
                break
            } else {
                //-- リクエスト成功
                yield put(resAC(payload, action))
                break
            }
      } catch (err) {
            //-- fetch 処理全体のエラー (ドメイン解決失敗等)
            console.log(err)
            yield put(setMainError({ errorMessage: parseErrorResponse(err) }))
            yield put( { type: FETCH_ERROR } )
            break
      }
    }
  }
  

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
            yield put(setMainError({ errorMessage: "ログインに失敗しました。IDとパスワードを再確認して下さい。" }))
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

//-- 出欠リクエスト受付
function* handleReqAttend() {
    yield takeEvery(REQUEST_ATTEND, runAuthReq, fetchAttend, resAttend) // => runAuthReq(fetchAttend, resAttend, action)
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
    yield fork(handleReqAttend);
    yield fork(handleReqPush);
}



