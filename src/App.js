import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from "./components/SignIn"
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><SignIn /></Route>
        <Route exact path='/signup'><SignUp /></Route>
        <Route exact path='/dashboard'><Dashboard home /></Route>
        <Route exact path='/user'><Dashboard user /></Route>
        <Route exact path='/newfeedback'><Dashboard newfeedback /></Route>
        <Route exact path='/students'><Dashboard students /></Route>
        <Route exact path='/settings'><Dashboard settings /></Route>
      </Switch>
    </Router>
  );
}

export default App