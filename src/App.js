import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from "./components/SignIn";
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><SignIn /></Route>
        <Route exact path='/signup'><SignUp /></Route>
      </Switch>
    </Router>
  );
}

export default App;
