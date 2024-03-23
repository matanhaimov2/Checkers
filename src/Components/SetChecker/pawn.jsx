import React, { Component } from 'react';


// CSS 
import './setchecker.css'

// React Icons
import { GiPawn } from "react-icons/gi";
// import { GiSpawnNode } from "react-icons/gi";

class Pawn extends Component {

    state = {
        id : this.props.id,
        color : this.props.color,
        location : this.props.pos,
        isQueen : false
    }
    

    render() {
        return (
            <div id={this.state.id}>
                <GiPawn className={`setchecker-${this.state.color}-pawn`}/>
            </div>
        )
    }
};

export default Pawn;