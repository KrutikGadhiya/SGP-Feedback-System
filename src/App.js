import { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { userInfo, loggin } from "./redux/reducers/userSlice";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';
import { closeSnack } from "./redux/reducers/snackSlice";
import SignIn from "./components/SignIn"
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard/Dashboard'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  }
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
  const [isReq, setIsReq] = useState(true)
  // const JWTtoken = useSelector((state) => state.user.token)

  useEffect(() => {
    let push
    if (localStorage.getItem('token')) {
      if (JSON.parse(localStorage.getItem('user')).role === 'admin') {
        push = '/dashboard'
      } else {
        if (JSON.parse(localStorage.getItem('user')).role === 'student')
          push = '/feedback'
        else
          push = '/analytics'
      }
      const id = JSON.parse(localStorage.getItem('user'))._id
      const token = localStorage.getItem('token').slice(1, -1)
      console.log(token)
      axios.get(`https://sgp-feedback-system.herokuapp.com/api/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          // console.log(res)
          // localStorage.clear()
          localStorage.setItem("user", JSON.stringify(res.data));
          // localStorage.setItem("token", token);
          dispatch(
            userInfo({
              userName: res.data.userName,
              email: res.data.email,
              isVerified: res.data.isVerified,
              role: res.data.role,
              institute: res.data.institute,
              department: res.data.department,
              id: res.data._id,
              token: token,
              avatar: res.data.avatar,
              sem: res.data.sem,
              year: res.data.year
            })
          );
          dispatch(loggin());
          history.push(push)
          setIsReq(false)
        }).catch((err) => console.log(err))
    } else {
      setIsReq(false)
    }
  }, [dispatch, history])
  return (
    <div>
      {/* <Backdrop className={classes.request} open={isReq}>
        <CircularProgress color='inherit' />
      </Backdrop> */}
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
        <Route exact path='/'><SignIn isReq={isReq} /></Route>
        <Route exact path='/signup'><SignUp /></Route>
        <ProtecedRoute exact path='/profile'><Dashboard profile /></ProtecedRoute>
        <ProtecedRoute exact path='/dashboard'><Dashboard home /></ProtecedRoute>
        <ProtecedRoute exact path='/addQue'><Dashboard addQue /></ProtecedRoute>
        <ProtecedRoute exact path='/feedback'><Dashboard newfeedback /></ProtecedRoute>
        <ProtecedRoute exact path='/students'><Dashboard students /></ProtecedRoute>
        <ProtecedRoute exact path='/analytics'><Dashboard settings /></ProtecedRoute>
        <ProtecedRoute exact path='/submitFeed'><Dashboard submitFeed /></ProtecedRoute>
      </Switch>
    </div>
  );
}

export default App