import React, { useState } from 'react'
import axios from 'axios'
import {
  Avatar, Button, TextField, OutlinedInput, Grid, Box,
  Typography, Container, FormControl, Select, InputLabel,
  MenuItem, InputAdornment, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import Face from '@material-ui/icons/FaceOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import { useDispatch } from "react-redux";
import { openSnack } from "../redux/reducers/snackSlice";
import { set, reset } from '../redux/reducers/loadingSlice'
import Blob2 from '../images/svgs/Blob1.svg'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

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
    overflow: 'hidden',
    zIndex: 1
  },
  blob1: {
    position: 'absolute',
    // top: '-50%',
    // left: theme.breakpoints.down('md') ? '-10%' : '-20%',
    [theme.breakpoints.down('sm')]: {
      left: "-60%",
      bottom: "-50%"
    },
    [theme.breakpoints.up('md')]: {
      left: "-20%",
      bottom: "-50%"
    },
    zIndex: -10
  },
  blob2: {
    position: 'absolute',
    // bottom: "-50%",
    // right: "-20%",
    [theme.breakpoints.down('sm')]: {
      right: "-60%",
      top: "-50%"
    },
    [theme.breakpoints.up('md')]: {
      right: "-20%",
      top: "-50%"
    },
    zIndex: -10
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    padding: '0.75em',
    color: '#fff'
  },
}));

export default function SignUp() {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [detail, setDetail] = useState({ password: '', confirmPassword: '', name: '', email: '', role: '', department: '', institute: '' });
  const [vCode, setVCode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  // const [openSnack, setOpenSnack] = useState({ open: false, message: 'Success' })
  const [showCPass, setShowCPass] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkPass, setCheckPass] = useState(false)
  const [checkCPass, setCheckCPass] = useState(false)
  const [checkName, setCheckName] = useState(false)

  const checkFields = (regex, value, type) => {
    if (!regex.test(value)) {
      type(true)
    } else {
      type(false)
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setDetail({ ...detail, [prop]: event.target.value });
    checkFields(prop === 'email' ? emailRegex : (prop === 'name' ? nameRegex : passRegex), event.target.value, prop === 'email' ? setCheckEmail : (prop === 'name' ? setCheckName : (prop === 'confirmPassword' ? setCheckCPass : setCheckPass)))
  };

  const handleVerification = () => {
    if (vCode === '') return
    dispatch(set())
    axios.post('https://sgp-feedback-system.herokuapp.com/api/verify', {
      email: detail.email,
      otp: vCode,
      reSend: false
    })
      .then(res => {
        console.log(res.data)
        dispatch(reset())
        // setOpenSnack({ open: true, message: 'E-mail Verified Successfully' })
        dispatch(openSnack({ message: 'E-mail Verified Successfully', type: "success" }))
        setOpenDialog(false)
        history.push('/')
      })
      .catch(err => {
        console.error(err)
        dispatch(reset())
        dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      })
  }

  const handleSubmit = () => {
    if (detail.password === '' || detail.email === '' || detail.name === '' || detail.role === '' || detail.department === '' || detail.institute === '') {
      return
    }
    dispatch(set())
    axios.post('https://sgp-feedback-system.herokuapp.com/api/signup', {
      email: detail.email,
      password: detail.password,
      role: detail.role,
      userName: detail.name,
      department: detail.department,
      institute: detail.institute
    })
      .then(res => {
        console.log(res)
        dispatch(reset())
        // if (res.status === 200) {
        // setOpenSnack({ open: true, message: 'Successfully Signed-UP' })
        dispatch(openSnack({ message: 'Successfully Signed-UP', type: "success" }))
        setOpenDialog(true)
        // } else {
        //   if (res.status === 422) {
        //     // eslint-disable-next-line no-throw-literal
        //     throw res.message
        //   } else {
        //     // eslint-disable-next-line no-throw-literal
        //     throw res.message
        //   }
        // }
      })
      .catch(err => {
        console.error(err)
        console.log(err.response.data.message)
        dispatch(reset())
        // setOpenSnack({ open: true, message: err.response.data.message })
        dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.main}>
        <img className={classes.blob1} src={Blob2} alt="Blob1" />
        <img className={classes.blob2} src={Blob2} alt="Blob2" />
        {/* <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnack.open}
          onClose={() => setOpenSnack({ ...openSnack, open: false })}
          message={openSnack.message}
          key={'topright'}
        /> */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">E-Mail Verification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Verify your Email, an 6 - digit Verification code has been sent to your E-mail.
            </DialogContentText>
            <TextField
              autoFocus
              variant='filled'
              margin="dense"
              id="otp"
              label="Verification Code"
              type="number"
              value={vCode}
              onChange={e => setVCode(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleVerification} color="primary">
              Verify
            </Button>
          </DialogActions>
        </Dialog>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Face style={{ fontSize: 30 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                error={checkName}
                value={detail.name}
                onChange={handleChange('name')}
                autoFocus
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={detail.email}
                error={checkEmail}
                onChange={handleChange('email')}
                autoComplete="email"
              />
              <FormControl style={{ margin: "0.5em 0 0 0" }} fullWidth variant='outlined'>
                <InputLabel error={checkPass} htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  // margin="normal"
                  type={showPass ? 'text' : 'password'}
                  required
                  error={checkPass}
                  fullWidth
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

              <FormControl style={{ margin: "0.5em 0 0 0" }} fullWidth variant='outlined'>
                <InputLabel error={checkCPass} htmlFor="Cpassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="Cpassword"
                  label="Confirm Password"
                  // margin="normal"
                  type={showCPass ? 'text' : 'password'}
                  required
                  fullWidth
                  error={checkCPass}
                  value={detail.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowCPass(!showCPass)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth required style={{ margin: "0.5em 0 0 0" }} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={detail.role}
                  onChange={handleChange('role')}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"faculty"}>Faculty</MenuItem>
                  <MenuItem disabled value={"alumini"}>Alumini</MenuItem>
                  {/* <MenuItem value={"employer"}>Employer</MenuItem> */}
                  <MenuItem disabled value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required style={{ margin: "0.5em 0" }} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Institute</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={detail.institute}
                  onChange={handleChange('institute')}
                  label="Institute"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"CSPIT"}>CSPIT</MenuItem>
                  <MenuItem value={"DEPSTAR"}>DEPSTAR</MenuItem>
                  {/* <MenuItem value={"alumini"}>I2IM</MenuItem>
                  <MenuItem value={"employer"}>PDPIAS</MenuItem>
                  <MenuItem value={"admin"}>RPCP</MenuItem> */}
                </Select>
              </FormControl>
              <FormControl fullWidth required variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={detail.department}
                  onChange={handleChange('department')}
                  label="Department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"CE"}>CE</MenuItem>
                  <MenuItem value={"EC"}>EC</MenuItem>
                  <MenuItem value={"CL"}>CL</MenuItem>
                  <MenuItem value={"EE"}>EE</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                </Select>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link style={{ textDecoration: 'none', textAlign: 'right' }} to="/">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </div>
          <Box mt={4}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </ThemeProvider >
  );
}