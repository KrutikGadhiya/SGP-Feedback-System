import React, { useState } from 'react'
import { Avatar, Button, TextField, Grid, Box, Typography, Container, FormControl, InputAdornment, IconButton, OutlinedInput, InputLabel, Snackbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import Blob1 from '../images/svgs/Blob1.svg'
import { useHistory } from 'react-router-dom'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4A5CFF',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Feedback System
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  blob1: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      left: "-60%",
      top: "-50%"
    },
    // [theme.breakpoints.between('xs', 'sm')]: {
    //   left: "-100%",
    //   top: "-70%"
    // },
    [theme.breakpoints.up('md')]: {
      left: "-20%",
      top: "-50%"
    },
    zIndex: -1
  },
  blob2: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      right: "-60%",
      bottom: "-50%"
    },
    [theme.breakpoints.up('md')]: {
      right: "-20%",
      bottom: "-50%"
    },
    zIndex: -1
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: '3em',
    height: '3em'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    // zIndex: theme.zIndex.modal
    background: '#fff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '0.75em'
  },
}));

export default function SignIn() {
  const classes = useStyles()
  const history = useHistory()
  const [showPass, setShowPass] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [detail, setDetail] = useState({ password: '', email: '' });
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkPass, setCheckPass] = useState(false)

  const handleChange = (prop) => (event) => {
    setDetail({ ...detail, [prop]: event.target.value });
    checkFields(prop === 'email' ? emailRegex : passRegex, event.target.value, prop === 'email' ? setCheckEmail : setCheckPass)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const checkFields = (regex, value, type) => {
    if (!regex.test(value)) {
      type(true)
    } else {
      type(false)
    }
  }

  const handleSubmit = () => {
    if (detail.password === '' || detail.email === '') {
      return
    }

    fetch('https://sgp-feedback-system.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(detail)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setOpenSnack(true)
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('token', JSON.stringify(res.token))
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.main}>
        <img className={classes.blob1} src={Blob1} alt="Blob1" />
        <img className={classes.blob2} src={Blob1} alt="Blob2" />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnack}
          onClose={() => setOpenSnack(false)}
          message="Success"
          key={'topright'}
        />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircle style={{ fontSize: 30 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={checkEmail}
                autoComplete="email"
                value={detail.email}
                onChange={handleChange('email')}
                autoFocus
              />
              <FormControl style={{ margin: "0.5em 0 0 0" }} fullWidth variant='outlined'>
                <InputLabel error={checkPass} htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  margin="normal"
                  type={showPass ? 'text' : 'password'}
                  required
                  fullWidth
                  error={checkPass}
                  value={detail.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(!showPass)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link style={{ textDecoration: 'none' }} to="/forget">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{ textDecoration: 'none' }} to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}