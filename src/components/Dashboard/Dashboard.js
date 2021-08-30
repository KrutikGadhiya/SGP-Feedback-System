import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { PersonOutlineOutlined, HomeOutlined, AddCircleOutlineOutlined, SettingsOutlined, PeopleOutlineOutlined } from "@material-ui/icons"
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import Home from './Home';
import User from './User';
import Settings from './Settings';
import Students from './Students';
import NewFeedback from './NewFeedback'

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
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  toolbar: theme.mixins.toolbar,
}));

const listItems = [
  { text: "Home", icon: <HomeOutlined />, path: "/dashboard" },
  { text: "User", icon: <PersonOutlineOutlined />, path: "/user" },
  { text: "New Feedback", icon: <AddCircleOutlineOutlined />, path: "/newfeedback" },
  { text: "Students", icon: <PeopleOutlineOutlined />, path: "/students" },
  { text: "Settings", icon: <SettingsOutlined />, path: "/settings" },
]

function ResponsiveDrawer(props) {
  const history = useHistory()
  const location = useLocation()
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
            Welcome User
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
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
          {props.user ? <User /> : <></>}
          {props.students ? <Students /> : <></>}
          {props.settings ? <Settings /> : <></>}
          {props.newfeedback ? <NewFeedback /> : <></>}
        </main>
      </Box>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func
};

export default ResponsiveDrawer;
