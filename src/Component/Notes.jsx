import React from "react";
import { Component, Profiler } from "react";
import TakeNote from "./TakeNote";
import '../Css/Notes.css'
import { Dialog } from "@material-ui/core";
import GetNotes from "./GetNotes";
import TrashNotes from "./TrashNotes";
import Service from '../services/noteService.js'
import ArchievNotes from "./ArchieveNotes";
const service = new Service();



export default function Notes(props) {
    const [show, setShow] = React.useState([]);

    React.useEffect(() => {
        getAllNotes()
    } ,[]);

    const getAllNotes = () => {
        let token = localStorage.getItem('Token');
        service.getNotes(token)
            .then((data) => {
                let arrayData = data.data.data.data;
                let array = arrayData.reverse();
                console.log(array);
                setShow(array);
            })
            .catch((err) => {
                console.log("error = " + err);
            });      
    };

    const callback = (
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions
    ) => {
        console.log(id);
        console.log(phase);
        console.log(actualDuration);
        console.log(baseDuration);
        console.log(startTime);
        console.log(commitTime);
        console.log(interactions);
    }

    



    return (
        <div className="mainContent" >
            <div style={{ alignSelf: 'center' }}>
                <TakeNote getAll={getAllNotes} />
            </div>
            <Profiler id="GetNotes" onRender={callback}>
                <GetNotes notes={show} getAll={getAllNotes}  />
            </Profiler>
            
            <div style={{paddingLeft:'100px'}}>
                
                
                {/* <ArchievNotes /> */}
                {/* <TrashNotes getAll={getAllNotes}/> */}
            </div>


        </div>
    )

}