import '../Css/GetNotes.css'
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
// import InputBase from "@material-ui/core/InputBase";
// import Dialog from "@material-ui/core/Dialog";
import Typography from '@material-ui/core/Typography';
import pin from '../Asset/download.svg'
import NoteOptions from "./NoteOptions";
import noteServices from "../services/noteService";

const service = new noteServices();


const useStyles = makeStyles((theme) => ({
  dialogBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dialogOptions: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  noteText: {
    wordWrap: "break-word",
    margin: "4px 4px 4px 4px"
  }
}));

export default function ArchievNotes(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  var [title, setTitle] = React.useState("");
  var [note, setNote] = React.useState("");
  const [clr, setClr] = React.useState("#fafafa");
  const [noteId, setNoteId] = React.useState();
  const [data, setData] = React.useState([]);
  const [archive, setArchive] = React.useState(true);


  React.useEffect(() => {
    getArchiveNotes();
  }, []);

  const getArchiveNotes = () => {
    let token = localStorage.getItem('Token');
    service.getArchiveNotes(token)
      .then((data) => {
        let arrayData = data.data.data.data;
        let array = arrayData.reverse();
        console.log(array);
        setData(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Note = () => {
    return (
      <div className="AllNotes">
        {data.map((data) => (
          <div
            className="noteBlock"
            style={{ backgroundColor: data.color }}>
            <div className="inputBlock" >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography className={classes.noteText} style={{ width: '90%' }}>{data.title}</Typography>
                <img src={pin} alt="" className="pin"></img>
              </div>
              <Typography className={classes.noteText} >{data.description}</Typography>
            </div>
            <div className="optionContainer">
              <div onMouseEnter={(e) => {

                setClr(clr);
              }}
                onMouseOver={setEdit(true)}
                className="noteOption">
                <NoteOptions
                  getall={getArchiveNotes}

                  archive={archive}
                  setColor={clr}
                  setClr={setClr}
                  editId={data.id}

                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <Note />
    </div>
  )
}
