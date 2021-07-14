import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import TextField from '@material-ui/core/TextField';
import NoteOptions from "./NoteOptions";
import Services from "../services/noteService.js";
import "../Css/TakeNote.css"
import pin from '../Asset/download.svg'
import { Chip } from "@material-ui/core";
import moment from 'moment';
const service = new Services();


const useStyles = makeStyles((theme) => ({
  titleInput: {
    padding: "10px 15px",
    width: "100%",
    
  },
  input: {
    width: "92%"
  },
  noteInput: {
    padding: "10px 15px",
  },
  closeNotes: {
    padding: '10px 10px 10px 10px',
    fontSize: '17px',
    justifySelf: "flex-end",
    fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
    borderRadius: '5px',
    cursor: 'pointer',
  }
}));

export default function TakeNote(props) {
  const classes = useStyles();
  var [showTitle, titleDisplay] = React.useState();
  var [title, setTitle] = React.useState();
  var [note, setNote] = React.useState();
  var [archieve, setArchieve] = React.useState(false);
  const [clr, setClr] = React.useState();
  const [id, setNoteId] = React.useState();
  const [isPinned, setPinned] =React.useState(false);
  const [reminder, setReminder] =React.useState("");

  const clickedNote = () => {
    titleDisplay(true);
  };

  const closeNote = () => {
    let data = {
      title: title,
      description: note,
      color:clr,
      reminder: reminder,
      archieve : archieve,
      isPinned : isPinned
    }
    if (data.title == undefined && data.description == undefined) {
      console.log("No Data");
      setClr("#fafafa");
      titleDisplay(false);
      return null;
    }
    let token = localStorage.getItem('Token');
    service.addNote(data,token)
      .then((data) => {
        console.log(data);
        console.log("data send successfully");
        props.getAll();
      })
      .catch((err) => {
        console.log(err);
      });
    setTitle("");
    setNote("");
    setClr("#fafafa");
    titleDisplay(false);
    setReminder("");
  };

  const getReminderTN = (date, time) => {
    console.log(reminder);
    console.log(time);
    if (date !== null && time !== null){
      let Reminder = date +", "+ time;
      console.log(Reminder);
      setReminder(Reminder);
      // console.log(Reminder);
      console.log("inside takenote");
    }
    
  }
 
  return (
    <div
      className="addNotesMain"
      onClickAway={closeNote}
      style={{ backgroundColor: clr }}
    >
      <div className="notesField" onClick={clickedNote}>
      <div
          className="addNoteField"
          style={{ display: showTitle ? "block" : "none" }}
        >
          <div className="titleInput" className={classes.titleInput} >
            <InputBase
              className={classes.input}
              placeholder="Title"
              value={title}
              width="80%"
              onChange={(e) => setTitle(e.target.value)}
            /><img src={pin} alt="" ></img>
          </div>
        </div>
        <div class="simpleNoteShow">
          <div className="noteInput">
            <div>
            <InputBase
              className={classes.input}
              placeholder="Take a note..."
              value={note}
              fullWidth
              multiline
              onChange={(e) => setNote(e.target.value)}
            />
            {reminder !== '' && (
              <div style={{ display: showTitle ? "block" : "none" }}>
              <Chip label={reminder}></Chip>
            </div>
            )}
            
            </div>
          </div>
          <div style={{ display: showTitle ? "none" : "block" }}>
            <IconButton>
              <CheckBoxOutlinedIcon />
            </IconButton>
            <IconButton>
              <BrushOutlinedIcon />
            </IconButton>
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
          </div>
        </div>
        
      </div>
      <div
        className="addNoteField"
        style={{ display: showTitle ? "block" : "none" }}
      >
        <div className="addNoteOptions">
          <NoteOptions
            setClr={setClr}
            getall={props.getall}
            dialogOff={props.dialogOff}
            getReminderdata={getReminderTN}
          />
       
         <div className="closeNotes">  <IconButton  className={classes.closeNotes} onClick={closeNote}>
            CLOSE
          </IconButton></div>
        </div>
      </div>
    </div>
  );
}