import { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import SignIn from "./components/SignIn"
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard/Dashboard'

function ProtecedRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) => (localStorage.getItem('token') ? (
        // <props.component {...data} />
        props.children
      ) : (
        <Redirect to={{ pathname: '/' }} />
      ))}
    />
  );
}


function App() {
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Provider store={store}>
      <Switch location={location}>
        <Route exact path='/'><SignIn /></Route>
        <Route exact path='/signup'><SignUp /></Route>
        <ProtecedRoute exact path='/dashboard'><Dashboard home /></ProtecedRoute>
        <ProtecedRoute exact path='/user'><Dashboard user /></ProtecedRoute>
        <ProtecedRoute exact path='/newfeedback'><Dashboard newfeedback /></ProtecedRoute>
        <ProtecedRoute exact path='/students'><Dashboard students /></ProtecedRoute>
        <ProtecedRoute exact path='/settings'><Dashboard settings /></ProtecedRoute>
      </Switch>
    </Provider>
  );
}

export default App