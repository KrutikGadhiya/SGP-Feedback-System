import { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';
import { closeSnack } from "./redux/reducers/snackSlice";
import SignIn from "./components/SignIn"
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard/Dashboard'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 10,
    color: '#fff',
  },
}));

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
  const dispatch = useDispatch()
  const classes = useStyles()
  const snackOpen = useSelector((state) => state.snack.open)
  const snackMsg = useSelector((state) => state.snack.message)
  const snackType = useSelector((state) => state.snack.type)
  const isLoading = useSelector((state) => state.loading.isLoading)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (JSON.parse(localStorage.getItem('user')).role === 'admin') {
        history.push('/dashboard');
      } else {
        history.push('/feedback');
      }
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnack())}
      >
        <Alert
          severity={snackType}
          variant="filled"
          onClose={() => dispatch(closeSnack())}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
      <Switch location={location}>
        <Route exact path='/'><SignIn /></Route>
        <Route exact path='/signup'><SignUp /></Route>
        <ProtecedRoute exact path='/dashboard'><Dashboard home /></ProtecedRoute>
        <ProtecedRoute exact path='/user'><Dashboard user /></ProtecedRoute>
        <ProtecedRoute exact path='/feedback'><Dashboard newfeedback /></ProtecedRoute>
        <ProtecedRoute exact path='/students'><Dashboard students /></ProtecedRoute>
        <ProtecedRoute exact path='/settings'><Dashboard settings /></ProtecedRoute>
      </Switch>
    </div>
  );
}

export default App