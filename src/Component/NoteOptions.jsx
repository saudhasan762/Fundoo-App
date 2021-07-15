import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import SystemUpdateAltOutlinedIcon from "@material-ui/icons/SystemUpdateAltOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import RestoreFromTrashRoundedIcon from "@material-ui/icons/RestoreFromTrashRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ReminderPopper from "./ReminderPopper";
import '../Css/NoteOptions.css'
import DateTimePicker from "./DateTimePicker";
import noteServices from "../services/noteService";
const service = new noteServices();


const useStyles = makeStyles((theme) => ({

  optionButton: {
    width: "100%"
  },
  colorPaper: {
    marginLeft: theme.spacing(3),
  },
  reminderPaper: {
    marginLeft: theme.spacing(30),
    marginTop: theme.spacing(32)
  },
  button: {
    padding: "6px",
  },
  colorMenu: {
    width: "130px",
    height: "90px",
    display: "flex",
    flexFlow: " column wrap",
  },
  ReminderMenu: {
    width: "250px",
    height: "280px",
    display: "flex",
    // flexFlow: " column wrap",
    justifyContent: "flex-start",
  },
  DeleteOptionMenu: {
    width: "250px",
    height: "280px",
    // display: "flex",
    // flexFlow: " column wrap",
  },
  colorButton: {
    margin: "2px",
    width: "5px",
    height: "5px",
    "&:hover": {
      border: "black 2px solid",
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  },

  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NoteOptions(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);
  const [edit, setEdit] = React.useState(props.setEdited);
  const [archive, setArchive] = React.useState(props.archive);
  const [trash, setTrash] = React.useState(props.trash);


  const colors = [
    { color: "#fafafa" },
    { color: "#ef9a9a" },
    { color: "#ffcc80" },
    { color: "#fff59d" },
    { color: "#dcedc8" },
    { color: "#b2dfdb" },
    { color: "#e0f7fa" },
    { color: "#4fc3f7" },
    { color: "#b39ddb" },
    { color: "#f8bbd0" },
    { color: "#a1887f" },
    { color: "#cfd8dc" },
  ];

  const deleteHandleOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const deletesHandleClose = () => {
    setAnchorE2(null);
  };


  const colorsHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const colorsHandleClose = () => {
    setAnchorEl(null);
  };

  const passColor = (e, colr) => {
    e.stopPropagation();
    if(edit){
      let data = {
        color: colr,
        noteIdList: [props.data.id],
      };
      let token = localStorage.getItem('Token');
      service.changeColor(data, token).then(()=> {
        console.log(colr);
        props.getAll();
      })
      .catch((err)=> {
        console.log("update color err"+err);
      })
    }
    props.setClr(colr);
  };

  const reminderHandleClick = (event) => {
    setAnchorE3(event.currentTarget);
  };

  const reminderHandleClose = () => {
    setAnchorE3(null);
  };

  const deleteOptionClick = (event) => {
    setAnchorE4(event.currentTarget);
  }

  const deleteOptionClose = () => {
    setAnchorE4(null);
  }




  const archiveNote = () => {
    console.log("archieve");
    let data = {
      isArchived: true,
      noteIdList: [props.data.id]
    };
    let token = localStorage.getItem('Token');
    service.archiveNote(data, token)
      .then((data) => {
        props.getAll();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOption = () => {
    console.log("inside delete Option");
    return (
      <div
        className={classes.DeleteOptionMenu}
      // className={classes.ReminderMenu}
      >
        <div>
          Are you sure want to delete
        </div>
        <div>
          <button>Cancel</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }

  const unArchiveNote = () => {
    console.log("unarchieve");
    console.log(props.editId);
    let data = {
      isArchived: false,
      noteIdList: [props.editId]
    };
    let token = localStorage.getItem('Token');
    service.archiveNote(data, token)
      .then((data) => {
        props.getall();
        props.getAll();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const restore = () => {
    console.log(props.editId);
    let data = {
      isDeleted: false,
      noteIdList: [props.editId]
    };
    let token = localStorage.getItem('Token');
    service.deleteNotes(data, token)
      .then((data) => {
        console.log(data);
        props.getall();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleted = () => {
    console.log("inside deleted");
    console.log(props.data.id);
    let data = {
      isDeleted: true,
      noteIdList: [props.data.id]
    };
    let token = localStorage.getItem('Token');
    service.deleteNotes(data, token)
      .then((data) => {
        console.log(data);
        props.getAll();
      })
      .catch((err) => {
        console.log(err);
      })
    setAnchorE2(null);
  }

  const deleteForever = () => {
    let data = {
      noteIdList: [props.editId]
    }
    let token = localStorage.getItem('Token');
    service.deleteForever(data, token)
      .then((data) => {
        console.log(data);
        props.getall()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getReminderNO = (date, time) =>{
    props.getReminderdata(date, time);
    console.log("inside note option");
    console.log(time);
  }



  const ColorBlock = () => {
    return (
      <div className={classes.colorMenu} onMouseLeave={colorsHandleClose}>
        {colors.map((color) => (
          <IconButton
            className={classes.colorButton}
            onClick={(e) => passColor(e, color.color)}
            style={{ backgroundColor: color.color }}
          ></IconButton>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.optionButton}>
      <div>
        {trash ? (
          <div>
            <IconButton className={classes.button} onClick={deleteForever}>
              <DeleteForeverRoundedIcon />
            </IconButton>
            <IconButton className={classes.button} onClick={restore}>
              <RestoreFromTrashRoundedIcon />
            </IconButton>
          </div>
        ) : (
          <div className='optionfield'>
            <IconButton className={classes.button} onClick={reminderHandleClick} >
              <AddAlertIcon />
            </IconButton>
            <IconButton className={classes.button} >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              onClick={colorsHandleClick}
              // onMouseOver={colorsHandleClick}
              className={classes.button}

            >
              <ColorLensOutlinedIcon />
            </IconButton >
            <IconButton className={classes.button} >
              <ImageOutlinedIcon />
            </IconButton>
            <IconButton className={classes.button} >
              {archive ? (
                <PublishRoundedIcon onClick={unArchiveNote} />
              ) : (
                <SystemUpdateAltOutlinedIcon onClick={archiveNote} />
              )}
            </IconButton >
            <IconButton className={classes.button} onClick={deleteHandleOpen} >
              <MoreVertOutlinedIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div
        // className={classes.colorWindow}
        style={{ display: open ? "block" : "none" }}
        onClick={colorsHandleClose}
      >
        <Paper open={Boolean(open)}>
          <Menu
            open={Boolean(open)}
            className={classes.colorPaper}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
          >
            <ColorBlock className="colorBlock" />
          </Menu>
        </Paper>
      </div>
      <div
        // className={classes.colorWindow}
        // style={{ display: open ? "block" : "none" }}
        
        >
        <Paper open={Boolean(open)}>
          <Menu
            // open={Boolean(open)}
            // className={classes.settingMenu}
            className={classes.reminderPaper}
            anchorE1={anchorE3}
            open={Boolean(anchorE3)}
            onClose={reminderHandleClose}
           >
            <ReminderPopper  getReminder={getReminderNO}/>


          </Menu>
        </Paper>
      </div>
      {/* <div
      // className={classes.colorWindow}
      // style={{ display: open ? "block" : "block" }}
      >
        <Paper>
          <Menu
            open={Boolean(open)}
            // className={classes.settingMenu}
            className={classes.DeleteOptionMenu}
            anchorE4={anchorE4}
            open={Boolean(anchorE4)}
            onClose={deleteOptionClose}>
            <deleteOption />


          </Menu>
        </Paper>
      </div> */}

      <div>
        <Paper>
          <Menu
            className={classes.settingMenu}
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={deletesHandleClose}
          >
            <MenuItem onClick={deleted}>Delete</MenuItem>
            <MenuItem >Add Label</MenuItem>
            <MenuItem>Add Drawing</MenuItem>
            <MenuItem>Add Checkboxes</MenuItem>
          </Menu>
        </Paper>
      </div>
    </div>
  );
}