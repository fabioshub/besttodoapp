import React, { Component } from 'react';
import './note.css'

class Note extends Component {
    render() {
        return(
            <div style={{margin: "10px 0", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center",    boxShadow: "0px 4px 14px -2px rgba(107,107,107,0.20)", borderRadius: "2px", height: "60px"}} >
                <p style={{margin: "5px 20px", fontSize: "0.9em", color: "Grey"}}>{this.props.comment}</p>
                <div style={{margin: "0px 10px"}}>
                    {/* <button id="donebutton" onClick={this.props.done}> <i class="fas fa-check"></i></button> */}
                    <button id="deletebutton" onClick={this.props.delete}> <i class="fas fa-times-circle"></i></button>
                </div>
            </div>
        )
    }
}

export default Note;