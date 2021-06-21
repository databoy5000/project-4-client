import { Redirect, Route } from 'react-router'
import { isAuthenticated, isNGO, removeToken } from '../lib/auth'

export function SecureRoute({ component: Component, ...rest }) {
  if (!isAuthenticated()) {
    removeToken()
    return (
      <Redirect to="/login"/>
    )
  }
  return <Route {...rest} component={Component}/>
}

export function NGOSecureRoute({ component: Component, ...rest }) {
  if (!isNGO()) {
    return (
      <Redirect to="/login"/>
    )
  }
  return <Route {...rest} component={Component}/>
}