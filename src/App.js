import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { About } from './components/common/About'
import Navbar from './components/common/Navbar'
import CrisisCreate from './components/crises/CrisisCreate'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/createcrisis" component={CrisisCreate}/>
      </Switch>
    </Router>
  ) 
}

export default App
