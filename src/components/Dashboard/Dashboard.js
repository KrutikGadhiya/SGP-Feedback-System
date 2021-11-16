import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { HomeOutlined, AddCircleOutlineOutlined, SpeakerNotes, Timeline } from "@material-ui/icons"
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import Home from './Home/Home';
import AddQueList from './AddQueTemplateList/AddQueList';
import Analytics from './Analytics';
import Students from './Students';
import Profile from './Profile'
import SubmitFeed from '../Dashboard/NewFeedback/SubmitFeed'
import NewFeedback from './NewFeedback/NewFeedback'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/userSlice'

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  active: {
    background: "#f4f4f4"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("sm")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '100%',
    // width: 100 - drawerWidth
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  panel: {
    display: 'flex',
    width: '100%'
  },
  root: {
    display: "flex"
  },
  avatar: {
    background: '#fff'
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  toolbar: theme.mixins.toolbar,
}));

function ResponsiveDrawer(props) {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const role = useSelector((state) => state.user.role)
  const avatar = useSelector((state) => state.user.avatar)
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleConfirmation = () => {
    setAnchorEl(null);
    setConfirmation(false)
  }
  const handleLogout = () => {
    setConfirmation(false)
    dispatch(logout())
    localStorage.clear()
    history.push('/')
  }

  const listItems = role === "admin" || JSON.parse(localStorage.getItem('user')).role === 'admin' ? [
    { text: "Home", icon: <HomeOutlined />, path: "/dashboard" },
    { text: "Add Question List", icon: <SpeakerNotes />, path: "/addQue" },
    { text: "New Feedback", icon: <AddCircleOutlineOutlined />, path: "/feedback" },
    // { text: "Students", icon: <PeopleOutlineOutlined />, path: "/students" },
    // { text: "Settings", icon: <SettingsOutlined />, path: "/settings" },
  ] : role === "student" || JSON.parse(localStorage.getItem('user')).role === 'student' ? [
    { text: "Feedback", icon: <HomeOutlined />, path: "/feedback" },
  ] : [
    { text: "Analytics", icon: <Timeline />, path: "/analytics" },
  ]



  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {
          listItems.map((item, index) => {
            return (
              <ListItem
                button
                key={index}
                onClick={() => history.push(item.path)}
                className={location.pathname === item.path ? classes.active : null}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
          })
        }
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Welcome {JSON.parse(localStorage.getItem('user')).userName}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {!avatar ? <AccountCircle /> : <Avatar className={classes.avatar} alt="user avatar" src={avatar} />}
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={"User-Menu"}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                history.push('/profile')
                handleMenuClose()
              }}
            >Profile</MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
            <MenuItem onClick={() => setConfirmation(true)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box className={classes.panel}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.home ? <Home /> : <></>}
          {props.addQue ? <AddQueList /> : <></>}
          {props.students ? <Students /> : <></>}
          {props.profile ? <Profile /> : <></>}
          {props.settings ? <Analytics /> : <></>}
          {props.newfeedback ? <NewFeedback /> : <></>}
          {props.submitFeed ? <SubmitFeed /> : <></>}
        </main>
      </Box>
      <Dialog
        open={confirmation}
        onClose={handleConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure, You want to Logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmation} color="primary">
            NO
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func
};

export default ResponsiveDrawer;
