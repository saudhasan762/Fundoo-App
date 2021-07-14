import { Component } from "react";
import {Route} from 'react-router-dom'
import Header from "../Component/Header";
import '../Css/Dashboard.css'
import SideNav from "../Component/sideNav";
import TakeNote from "../Component/TakeNote";
import Notes from "../Component/Notes";
import ArchievNotes from "../Component/ArchieveNotes";
import TrashNotes from "../Component/TrashNotes";
import Search from '../Component/Search'
import ProtectedRoute from "../ProtectedRoute";


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSelect: false,
            head: "Keep",
            callNotes: false,
            search:""
        }
    }

    onSearch = (value) => {
        console.log(value);
        this.setState({search: value});
    }

    onSelect = (value) => {
        this.setState({ head: value })
        console.log(value);


    }

    callGetAllNotes = () => {
        this.setState({ callNotes: true })
    }

    responseGetAllNotes = () => {
        this.setState({ callNotes: false })
    }

    selection = () => {
        if (this.state.head == "Keep") {
            return (<Notes getAll={this.callGetAllNotes}></Notes>)
        } else if (this.state.head == "Archieve") {
            return (
                <div className="mainContentss">
                    <ArchievNotes />
                </div>
            )
        } else if (this.state.head == "Trash") {
            return (
                <div className="mainContentss">
                    <TrashNotes />
                </div>
            )
        } else {
            return (<Notes getAll={this.callGetAllNotes} />)
        }
    }


    render() {

        return (
            <div>
                <Header onHeadSelect={this.onSelect} getSearch={this.onSearch}></Header>

                {/* <Notes  selectedValue={this.state.head}/> */}

                {/* {this.selection()} */}
                <ProtectedRoute exact path='/Dashboard/Notes' >
                    <Notes getAll={this.callGetAllNotes}></Notes>
                </ProtectedRoute>

                <ProtectedRoute exact path='/Dashboard/Search' >
                    <Search search={this.state.search}></Search>
                </ProtectedRoute>

                <ProtectedRoute exact path='/Dashboard/Trash' >
                    <div className="mainContentss">
                        <TrashNotes />
                    </div>
                </ProtectedRoute>

                <ProtectedRoute exact path='/Dashboard/Archieve' >
                    <div className="mainContentss">
                        <ArchievNotes />
                    </div>
                </ProtectedRoute>



            </div>
        )
    }
}