import React,{} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';



const drawerWidth = 240;

const styles = theme =>  ({
  drawer: {
    marginTop: '30px',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    marginTop:'25px',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop:'25px',
    width: 50,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  listItems: {
    letterSpacing: '.01785714em',
    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
    fontSize: '.875rem',
    fontWeight:'500',
    lineHeight:'1.25rem',
    paddingLeft: '24px',
    color: '#202124',
    borderRadius: '55px',
  
  '&:focus':{
    backgroundColor: '#feefc3',
    borderRadius: '55px',
  },
  '&:hover':{
    backgroundColor:"#F6F2F1"
  },
  '&::selection':{
    backgroundColor:"#feefc3"
  }
},

selectedListItems: {
    letterSpacing: '.01785714em',
    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
    fontSize: '.875rem',
    fontWeight:'500',
    lineHeight:'1.25rem',
    paddingLeft: '24px',
    color: '#202124',
    borderRadius: '35px',
    backgroundColor: '#feefc3',
  
  '&:focus':{
    backgroundColor: '#feefc3',
    borderRadius: '55px',
  },
  '&:hover':{
    backgroundColor:"#F6F2F1",
    borderRadius: '55px',
  },
  '&::selection':{
    backgroundColor:"#feefc3",
    borderRadius: '55px',
  }
},
 
})





class SideNav extends React.Component {
    constructor(props){
        super(props)
        this.state={
          open : false,
          head:""
        }
    }

    
    handleDrawerOpen = () => {
      console.log("drawer open")
       this.props.drawerOpen() 
    };
     handleDrawerClose = () => {
       console.log("drawer close")
        this.props.drawerClose()
    };
    onChange = (head) => {
      
      this.props.onChange(head)

      if(head === "Keep"){
        this.props.history.push('/Dashboard/Notes');
      }
      else if(head === "Archieve"){
        this.props.history.push('/Dashboard/Archieve');
      } else if (head === "Trash"){
        this.props.history.push('/Dashboard/Trash');
      } 
      // else if(head === "Keep"){
      //   this.props.history.push('Dashboard/Notes');
      // }
      
    };

    // archieveSelect =(head) => {
    //   onchange(head);

    // }
    
    
    render() { 
      // console.log(this.props.onSelection);
      const { classes } = this.props;
        return ( 
            <div className="root">
       <Drawer
          variant="permanent" 
          // onMouseOver={this.handleDrawerOpen} onMouseLeave={this.handleDrawerClose}
          className={this.props.open ? classes.drawerOpen : classes.drawerClose}
          classes={{
            paper:this.props.open ? classes.drawerOpen : classes.drawerClose 
          }}
          anchor='left'>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]:this.props.open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
        <List>
          <ListItem onClick={()=> this.onChange("Keep")}  className={this.props.onSelection == "Keep" ? classes.selectedListItems : classes.listItems}>
            <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem >
          <ListItem onClick={()=> this.onChange("Reminder")} className={this.props.onSelection == "Reminder" ? classes.selectedListItems : classes.listItems}>
            <ListItemIcon>
              <NotificationsOutlinedIcon/>
              
              </ListItemIcon>
            <ListItemText primary="Reminders" ></ListItemText>
          </ListItem>
          <ListItem onClick={()=> this.onChange("Edit Labels")} className={this.props.onSelection == "Edit Labels" ? classes.selectedListItems : classes.listItems}>
            <ListItemIcon><EditIcon/></ListItemIcon>
            <ListItemText primary="EditLabels"></ListItemText>
          </ListItem>
          <ListItem  onClick={()=> this.onChange("Archieve")} className={this.props.onSelection == "Archieve" ? classes.selectedListItems : classes.listItems}>
            <ListItemIcon><ArchiveIcon/></ListItemIcon>
            <ListItemText primary="Archieve"></ListItemText>
          </ListItem>
          <ListItem onClick={()=> this.onChange("Trash")} className={this.props.onSelection == "Trash" ? classes.selectedListItems : classes.listItems}>
            <ListItemIcon><DeleteOutlineIcon/></ListItemIcon>
            <ListItemText primary="Trash"></ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
         );
    }
}
 
export default withRouter(withStyles(styles) (SideNav)) ;
