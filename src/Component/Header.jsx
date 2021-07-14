import { Component } from 'react';
import '../Css/Header.css'
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import SideNav from './sideNav';
import KeepIcon from '../Asset/keep.png'
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import { withRouter } from 'react-router-dom';
const drawerWidth = 240;

const styles = theme =>  ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
  });

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
          drawerOpen: false,
          heading:"Keep",
          search:"",
          profile: false
        }
        this.drawerOpen = this.handleDrawerOpen.bind(this)
        this.drawerClose = this.handleDrawerClose.bind(this)
    }

    onSelect = (head) => {
      this.setState({heading:head})
      this.props.onHeadSelect(head)
    };

    handleDrawerOpen = () => {
      this.setState({drawerOpen: !this.state.drawerOpen}) 
   };
    handleDrawerClose = () => {
       this.setState({drawerOpen: false})
   };

   profileHandleOpen = () =>{
     console.log("inside profile handle click");
     this.setState({profile: !this.state.profile})
    //  console.log(this.state.profile);

   };
  //  changePage = () => {
  //   this.props.history.push('./Dashboard/Search');
  //  }
   searchHandleClick = (e) => {
    this.setState({search : e.target.value})
    console.log("insdie search handle");
    console.log(this.state.search);
    this.props.getSearch(this.state.search);
    this.props.history.push('/Dashboard/Search')
    // nextPath("./Dashboard/Search")
   }

   logOut = () => {
     localStorage.removeItem("Token");
     localStorage.removeItem("FirstName");
     localStorage.removeItem("LastName");
     localStorage.removeItem("Email");
     this.props.history.push('/');
   }
  
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className="grow">
              <CssBaseline/>
            <AppBar  position="fixed" 
             className={clsx(classes.appBar, {
             [classes.appBarShift]: this.state.open,
             })}
             >
              <Toolbar className="AppBar">
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <img src={KeepIcon} alt="KeepIcon" className="Iconpng"/>
                <span className="gb_5d">
                    {this.state.heading}
                    </span> 
                <div className="search" 
                >
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search"
                    className="inputInput"
                    // onChange={(e) => this.setState({search :e.target.value})}
                    onChange={this.searchHandleClick}
                    onClick={this.changePage}
                  />
                </div>
                <div className="grow"/>
                <div className="sectionDesktop">
                  <IconButton  >
                    <Badge>
                      <RefreshOutlinedIcon/>
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge>
                      < ViewAgendaOutlinedIcon/>
                    </Badge>
                  </IconButton>
                  <IconButton
                    
                  >
                    <SettingsOutlinedIcon/>
                  </IconButton>
                  </div>
                  <div>
                  <IconButton
                  
                  >
                    <AppsOutlinedIcon/>
                  </IconButton>
                  <IconButton
                    onClick={this.profileHandleOpen}
                  >
                    <Avatar  >S</Avatar>
                  </IconButton>
               </div>
              </Toolbar>
              
              <div className="profile-main">
              {this.state.profile ? 
              <div className="profile">
                <h2>Saud Hasan</h2>
                <p>saud.hasan@33gmail.com</p>
                <input type="button" value="Log out" onClick={this.logOut}></input>
              </div> : null}
            </div>
            </AppBar>
            
            
            
            <SideNav 
            open={this.state.drawerOpen} 
            drawerOpen={this.handleDrawerOpen} 
            drawerClose={this.handleDrawerClose} 
            onChange={this.onSelect}
            onSelection={this.state.heading}
            // onChange={() => this.onHeadChange}
             />
          </div>

            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Header)) ;