import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Services from '../services/noteService'
import NoteOptions from '../Component/NoteOptions'
import Typography from '@material-ui/core/Typography';
import pin from '../Asset/download.svg'
const service = new Services();

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

export default function TrashNotes(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    var [title, setTitle] = React.useState("");
    var [note, setNote] = React.useState("");
    const [clr, setClr] = React.useState("#fafafa");
    const [noteId, setNoteId] = React.useState();
    const [trash, setTrash] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getTrashNotes();
    }, []);

    const getTrashNotes = () => {
        console.log("inside getTrashNotes");
        let token = localStorage.getItem('Token');
        service.getTrashNotes(token)
            .then((data) => {
                let arrayData = data.data.data.data;
                let array = arrayData.reverse();
                console.log("Trash Note List" + array);
                setData(array);
                this.props.getAll();
            })
            .catch((err) => {
                console.log("error = " + err);
            });
    };

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
                            <div
                                // onMouseEnter={(e) => {
                                
                                //   setClr(clr);
                                // }}
                                onMouseOver={setEdit(true)}
                                className="noteOption">
                                <NoteOptions trash={trash} editId={data.id} setClr={setClr} getall={getTrashNotes} />
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