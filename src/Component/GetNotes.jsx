import Typography from '@material-ui/core/Typography';
import NoteOptions from './NoteOptions';
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Chip } from "@material-ui/core";
import { Chip } from '@material-ui/core';
import moment from 'moment';
import '../Css/GetNotes.css'
import pin from '../Asset/download.svg'

const useStyles = makeStyles((theme) => ({
    noteText: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px",
    }
}));

export default function GetNotes(props) {
    const classes = useStyles();
    const [clr, setClr] = React.useState("#fafafa");
    const [msg, setMsg] = React.useState("");

    // const getall = (e) => {
    //     console.log(e);
    //     setMsg("inside ");
    //     props.listenToGetNotes("listne");
    // }

    const Note = () => {
        return (
            <>
                <div className="AllNotes">
                    {props.notes
                        .filter((data) => data.isDeleted === false)
                        .filter((data) => data.isArchived === false)
                        .map((data) => (
                            <div
                                className="noteBlock"
                                style={{ backgroundColor: data.color }}>
                                <div className="inputBlock" >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography className={classes.noteText} style={{ width: '90%' }}>{data.title}</Typography>
                                        <img src={pin} alt="" className="pin"></img>
                                    </div>
                                    <Typography className={classes.noteText} >{data.description}</Typography>
                                    {/* <div>
                            <Chip label={data.reminder}></Chip>
                        </div> */}
                                    {data.reminder != "" ?
                                        <Chip label={moment(new Date(data.reminder)).format("MMM DD,h:mm A")} style={{ width: "140px" }}></Chip>
                                        : null}
                                </div>
                                <div className="optionContainer">
                                    <div className="noteOption"
                                    >
                                        <NoteOptions
                                            setColor={clr}
                                            setClr={setClr}
                                            data={data}
                                            getAll={props.getAll}

                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </>
        )
    }

    return (
        <div className="mainnContent" style={{ paddingTop: '25px', paddingLeft: '100px', width: '100%', display: 'block' }}>
            <div className="displayNotes" style={{ width: '100%', display: 'block' }}>
                <Note />
            </div>
        </div>
    );
};
