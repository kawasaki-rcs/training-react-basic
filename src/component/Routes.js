import React from 'react'
import { Switch } from 'react-router-dom'

import { Redirect, Route } from 'react-router-dom'

import Login from '../container/Login'
import Top from '../container/Top'


// 認証済み判定
const isAuthenticated = () => localStorage.hasOwnProperty("token") 

// component にて isPrivate が false と明確に定義されている箇所以外は要認証ページとして扱う
const AuthRoute = ({component, ...props}) => {
    const { isPrivate } = component;
    
    if ( isAuthenticated() ){
      if (isPrivate === false) {
        return <Redirect to='/top' />;
      }
      else {
        return <Route { ...props } component={ component } />;
      }
    }
    else {
      if (isPrivate === false) {
        return <Route { ...props } component={ component } />;
      }
      else {
        return <Redirect to='/login' />;
      }
    }
}

const Routes = () => (
        <Switch>
            <AuthRoute exact path='/login' component={Login}/>
            <AuthRoute path='/top' component={Top}/>
            <AuthRoute component={Login}/>
        </Switch>
)


export default Routes