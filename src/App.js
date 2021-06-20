import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { About } from './components/common/About'
import Navbar from './components/common/Navbar'
import CrisisCreate from './components/crises/CrisisCreate'
import CrisisEdit from './components/crises/CrisisEdit'
import CrisisShow from './components/crises/CrisisShow'
import Dashboard from './components/common/Dashboard'
import ResourcesEdit from './components/resources/ResourcesEdit'

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
        <Route path="/editcrisis" component={CrisisEdit}/>
        <Route path="/crises/:crisisId" component={CrisisShow}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/editngoresources" component={ResourcesEdit}/>
      </Switch>
    </Router>
  ) 
}

export default App
