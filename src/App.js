import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { About } from './components/common/About'
import Navbar from './components/common/Navbar'

function App() {
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/crises')
      const data = await res.json()
      console.log(data)
    }
    getData()
  })

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  ) 
}

export default App
