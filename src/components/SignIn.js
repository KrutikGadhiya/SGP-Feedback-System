import React from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Face from '@material-ui/icons/FaceOutlined'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import bgImg from '../images/svgs/blob-scene-haikei.svg'

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1565c0',
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
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '0.75em'
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.main}>
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
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant='body2'>
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