import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { About } from './components/common/About'
import Navbar from './components/common/Navbar'
import CrisisCreate from './components/crises/CrisisCreate'
import CrisisEdit from './components/crises/CrisisEdit'
import CrisisShowNGO from './components/crises/CrisisShowNGO'
import CrisisShowHS from './components/crises/CrisisShowHS'
import NGODashboard from './components/dashboards/NGODashboard'
import HSDashboard from './components/dashboards/HSDashboard'
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
        <Route path="/hs/dashboard" component={HSDashboard}/>
        <Route path="/hs/crises/:crisisId/edit" component={CrisisEdit}/>
        <Route path="/hs/crises/:crisisId" component={CrisisShowHS}/>
        <Route path="/hs/createcrisis" component={CrisisCreate}/>
        <Route path="/ngo/dashboard" component={NGODashboard}/>
        <Route path="/ngo/crises/:crisisId" component={CrisisShowNGO}/>
        <Route path="/ngo/editngoresources" component={ResourcesEdit}/>
      </Switch>
    </Router>
  ) 
}

export default App
