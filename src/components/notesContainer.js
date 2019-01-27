import React, { Component } from 'react';
import Note from './note.js';
import '../App.css'
import './tabbar.css'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import $ from 'jquery';


class NotesContainer extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            notearraynotdone: [],
            notearraydone: [],
            username: ''
        }
        this.addNote = this.addNote.bind(this)
    }

    componentWillMount() {
        this.setState({username: localStorage.getItem('username')})
    }

    componentDidMount() {
        fetch("http://localhost:5000/getnotes" , {
            host: 'localhost',
            port: 5000,
            path: '/notes',
            method: 'POST',
            type: 'application/json',
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "username": this.state.username,
            })
        })
        .then((response) => response.json())
        .then((res) => {
                this.setState({notearraynotdone: res})
            })
            .catch(e => console.log(e));
    }

    addNote(e, note) {
        e.preventDefault()
        if(note)
 {       var notes = Object.assign([], this.state.notearraynotdone);
        notes.push(note);
        this.setState({notearraynotdone: notes})
        fetch("http://localhost:5000/notes" , {
            host: 'localhost',
            port: 5000,
            path: '/notes',
            method: 'POST',
            type: 'application/json',
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "username": this.state.username,
                "note": note,
            })
        })
        .then((response) => response.json())
        .then((res) => {
        
            })
            .catch(e => console.log(e));

            this.forceUpdate()}
    }

    deleteNote = (item, index) => {
        var notes = Object.assign([], this.state.notearraynotdone);
        console.log(index)
        notes.splice(index, 1);
        this.setState({notearraynotdone: notes})
        fetch("http://localhost:5000/deletenotes" , {
            host: 'localhost',
            port: 5000,
            path: '/notes',
            method: 'DELETE',
            type: 'application/json',
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "username" : this.state.username,
                "notes": item,
            })
        })
        .then((response) => response.json())
        .then((res) => {
        
            })
            .catch(e => console.log(e));

            this.forceUpdate()
    }

    doneNote = (index) => {
        var notes = Object.assign([], this.state.notearraynotdone);
        var notesref = Object.assign([], this.state.notearraynotdone);
        notes.splice(index, 1);
        this.setState({notearraynotdone: notes})
        var notesdone = Object.assign([], this.state.notearraydone);
        notesdone.push(notesref[index])
        this.setState({notearraydone: notesdone})
    }



    render() {
    return(
       <div className="container" style={{paddingTop: "100px"}}>   
              <nav className="navbar fixed-top" style={{background: "hsl(0, 100%, 73%)", padding: "20px", borderRadius: "0 0 10px 10px", boxShadow: "0px 4px 14px -2px rgba(107,107,107,0.20)"}}>
                    <form className="container" style={{display: "flex", justifyContent: "space-around",  borderRadius: "17px"}} onSubmit={(e) => {this.addNote(e, $("input").val()); $("input").val("") }}>
                    <input style={{ border: "none", borderRadius: "4px" , height: "40px", flexGrow: "1", color: "grey"}}>
                    </input>
                    <button type="submit" style={{marginLeft: "13px", fontSize:"23px", color: "hsl(0, 100%, 73%)", border: "none", bacground: "White"}} ><i class="fa fa-plus-circle" aria-hidden="true" ></i></button>
                    </form>
        </nav>
        <div style={{display: "flex",alignItems: "left"}}>
            <p style={{marginLeft: "7px", color: "grey"}}>Hallo, {this.state.username}</p>
        </div>
           {
               this.state.notearraynotdone.map((item, index) => {
                   return (<Note comment={item} delete={this.deleteNote.bind(this, item, index)} done={this.doneNote.bind(this, index)}/>)
               })
           }
           {/* <hr style={{width: "40%", }} />
           {
               this.state.notearraydone.map((item, index) => {
                   return (<Note comment={item} />)
               })
           } */}
 
       </div>
    ) 
  }
}

export default NotesContainer;
