import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Navbar() {
  useLocation()
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  console.log('isLoggedIn: ', isLoggedIn)

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div className="d-flex container-fluid">
        <Link to="/" className="navbar-brand">WoRCO</Link>
        <div className="collapse navbar-collapse">
          <Link className="nav-link text-light" to="/about">About us</Link>
        </div>
        <div className="d-flex justify-content-end">
          {!isLoggedIn ?
            <>
              <Link className="btn text-light btn-outline-light m-2" to="/register">Register</Link>
              <Link className="btn text-light btn-outline-light m-2" to="/login">Log in</Link>
            </>
            :
            <>
              <div>
                <Link className="btn text-light btn-outline-light m-2" to="/createcrisis">New Crisis</Link>
                <button className="btn text-light btn-outline-light m-2" onClick={handleLogout}>Log out</button>
              </div>
            </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar