import DateTimePicker from "./DateTimePicker";
import React from "react";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    ReminderMenu: {
        width: "250px",
        height: "280px",
        display: "flex",
        // flexFlow: " column wrap",
        justifyContent: "flex-start",
      },
    }))

export default function ReminderPopper (props) {
    const classes = useStyles();
    const [dateTime, setDateTime] = React.useState(false);
    const [anchorE3, setAnchorE3] = React.useState(null);

    const callDateTime = () => {
        console.log("inside date and time");
        setDateTime(!dateTime);
      }
    
      const closePicker = () => {
        setAnchorE3(null);
      }
      const open = Boolean(anchorE3);

      const getReminderRP = (date, time) => {
        props.getReminder(date, time);
        console.log("inside ReminPopp");
        console.log(date);
      }

    return(
        <div
        className={classes.ReminderMenu}
        // className={classes.colorMenu}
        style={{ paddingLeft: "20px", paddingTop: "10px" }} 
        // onClickAway={closePicker} 
        onMouseLeave={closePicker}
        >
        {dateTime ? <DateTimePicker getReminder={getReminderRP}/>
          :
          (
            <div>
                <div >Reminder:</div>
        <div className="dateCol" onClick="#">

          <div className="day">Later Today</div>
          <div className="time">8:00PM</div>

        </div>
        <div className="dateCol" onClick="">
          <div className="day">Tomorrow</div>
          <div className="time">    8:00AM</div>
        </div>
        <div className="dateCol" onClick="">
          <div className="day">Next Week</div>
          <div className="time">Mon,8:00AM</div>
        </div>
        <div className="dateCol">Home</div>
        <div className="dateCol">Work</div>
        <div className="dateCol" style={{cursor:"pointer"}} onClick={callDateTime}>Pick date & time</div>
        <div className="dateCol">Pick Place</div>
            </div>
          
        )}
  


      </div>
    )
}