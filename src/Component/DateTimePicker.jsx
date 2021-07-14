import React,{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        width: '250px',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    textField: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DateTimePicker(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setanchorEl] = React.useState(null);
    const [close, setClose] = React.useState(false);
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    const handleClose = () => {      
        setOpen(open)
        // setanchorEl(null);    
    };

    const save = (event) =>{
        handleClose(!open)
        // console.log(event.target.date.value);
        props.getReminder(date, time);

    }

    const getDate = (event) => {
        console.log(event.target.value);
        setDate(event.target.value)
    }

    const getTime =(event) => {
        console.log(event.target.value);
        setTime(event.target.value);
    }

    return (
        <div onMouseLeave={handleClose}>
            <form className={classes.container} noValidate anchorEl={anchorEl}>
                <TextField
                    id="date"
                    label=""
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={getDate}
                    // value={setDate}
                />

                <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, 
                    }}
                    // value={setTime}
                    onChange={getTime}
                />
            </form>
            <div className="saveButton" style={{paddingTop:"20px",paddingLeft: "150px"}}>
                <Button color="primary" variant="text" onClick={save}>
                  save
                </Button>
              </div>

        </div>
    )
}