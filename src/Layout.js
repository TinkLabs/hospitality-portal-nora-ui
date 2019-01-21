import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import empty from 'is-empty';
import { withSnackbar } from 'notistack';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import SyncIcon from '@material-ui/icons/Sync';
import CategoryIcon from '@material-ui/icons/Category';
import AreaIcon from '@material-ui/icons/Place';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';


import LinearLoadingBar from './components/LinearLoadingBar';

import { toggleMenu, popNotification } from './redux/actions';

const styles = {
  wrapper: {
    borderRadius: "10px",
    margin: "0 auto",
    width: "80%",
    backgroundColor: "#fff",
    marginTop: "10px"
  },
  background: {
    backgroundColor: "#ddd",
    margin: "0",
    padding: "0",
  },
  list: {
    width: 250,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    marginLeft: 20
  },
  
};

const sideList = (
  <div className={styles.list}>
    <List>
      <Link to="/restaurant/index">
        <ListItem button to="#/restaurant/index">
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary={"Restaurant"}/>
        </ListItem>
      </Link>
      <Link to="/sync/index">
        <ListItem button>
          <ListItemIcon><SyncIcon /></ListItemIcon>
          <ListItemText primary={"Sync"}/>
        </ListItem>
      </Link>
      <Link to="/public/vote/6092">
        <ListItem button>
          <ListItemIcon><AreaIcon /></ListItemIcon>
          <ListItemText primary={"Testing Votes"}/>
        </ListItem>
      </Link>
    </List>
    
  </div>
);
class Layout extends React.Component{
  
  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  componentDidUpdate(){
    if(this.props.notifications.size > 0){
      this.props.enqueueSnackbar(this.props.notifications.first());
      this.props.popNotification();
    }
  }
  
  toggleMenu(open) {
    this.props.toggleMenu(open);
  }
  
  render(){
    console.log("fetching:"+this.props.fetching);
    return (
      <div className={this.props.classes.background}>
        <LinearLoadingBar visable={this.props.fetching}/>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography className={this.props.classes.title} variant="h6" color="inherit">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.props.showMenu} onClose={() => {this.toggleMenu(false)}}>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => {this.toggleMenu(false)}}
            onClick={() => {this.toggleMenu(false)}}
          >
            {sideList}
          </div>
        </Drawer>
        <Dialog
          open={!empty(this.props.error)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Oops! Something went wrong"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ERROR: {this.props.error}
              </DialogContentText>
            </DialogContent>
        </Dialog>
        <div className={this.props.classes.wrapper}>
          {this.props.children}
        </div>
      </div>
    )
  }
  
}

let mapStateToProps = (state) => {
  let ui = state.ui;
  return {
    showMenu: ui.get('showMenu'),
    title: ui.get('title'),
    fetching: ui.get('fetching'),
    error: ui.get('error'),
    notifications: ui.get('notifications'),
  };
}

let mapActionToProps = {
  toggleMenu,
  popNotification,
};


export default connect(mapStateToProps, mapActionToProps)(
  withSnackbar(withStyles(styles)(Layout))
);