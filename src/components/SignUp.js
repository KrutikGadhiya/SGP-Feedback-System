import React, { useState } from 'react'
import { Avatar, Button, TextField, OutlinedInput, Grid, Box, Typography, Container, FormControl, Select, InputLabel, MenuItem, InputAdornment, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Face from '@material-ui/icons/FaceOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import Blob2 from '../images/svgs/Blob1.svg'

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
    zIndex: theme.zIndex.tooltip
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '0.75em',
    color: '#fff'
  },
}));

export default function SignUp() {
  const classes = useStyles()
  const [detail, setDetail] = useState({ password: '', confirmPassword: '', name: '', email: '', role: '' });
  const [showPass, setShowPass] = useState(false)
  const [showCPass, setShowCPass] = useState(false)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setDetail({ ...detail, [prop]: event.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.main}>
        <img className={classes.blob1} src={Blob2} alt="Blob1" />
        <img className={classes.blob2} src={Blob2} alt="Blob2" />
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
                // error={true}
                value={detail.name}
                onChange={handleChange('name')}
                autoFocus
              />
              <TextField
                variant="outlined"
                // margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={detail.email}
                onChange={handleChange('email')}
                autoComplete="email"
              />
              <FormControl style={{ margin: "0.5em 0 0 0" }} fullWidth variant='outlined'>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  margin="normal"
                  type={showPass ? 'text' : 'password'}
                  required
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

              <FormControl style={{ margin: "0.5em 0" }} fullWidth variant='outlined'>
                <InputLabel htmlFor="Cpassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="Cpassword"
                  label="Confirm Password"
                  margin="normal"
                  type={showCPass ? 'text' : 'password'}
                  required
                  fullWidth
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
              <FormControl fullWidth required variant="outlined" className={classes.formControl}>
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
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Faculty"}>Faculty</MenuItem>
                  {/* <MenuItem value={"Alimini"}>Alumini</MenuItem> */}
                  {/* <MenuItem value={"Employer"}>Employer</MenuItem> */}
                </Select>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
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