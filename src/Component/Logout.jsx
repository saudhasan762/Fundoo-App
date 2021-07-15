import { Avatar, makeStyles, Popper } from "@material-ui/core";
import React from 'react';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        marginTop: '10px',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}))

function LogoutPopper(props){
    const history = useHistory();
    const classes = useStyles();
    const [anchorE1, setAnchorE1] = React.useState(null);

    const handleClick = (e) => {
        setAnchorE1(anchorE1 ? null : e.currentTarget);
    };

    const logout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("FirstName");
        localStorage.removeItem("LastName");
        localStorage.removeItem("Email");
        history.push('/');
    }

    const open = Boolean(anchorE1);
    const id = open ? 'simple-popper' : undefined;

    return(
        <div>
            <Avatar aria-aria-describedby={id} type="button" onClick={handleClick} style={{color:"black"}} >S</Avatar>
            <Popper id={id} open={open} anchorEl={anchorE1}>
                <div className={classes.paper}>
                    <div style={{fontSize: "24px",paddingLeft: "20px"}}>{localStorage.getItem("FirstName")}  {localStorage.getItem("LastName")}</div>
                    <div >{localStorage.getItem("Email")}</div>
                    <div style={{paddingLeft: "50px",paddingTop:"10px"}}>
                    <button type="button" onClick={logout} style={{cursor: "pointer"}}>Logout
                    </button>
                    </div>
                    

                </div>

            </Popper>
        </div>
    )
}

export default withRouter (LogoutPopper);