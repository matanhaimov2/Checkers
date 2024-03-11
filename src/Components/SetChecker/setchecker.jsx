import React, { Component } from 'react';


// CSS 
import './setchecker.css'

// React Icons
import { GiPawn } from "react-icons/gi";
import { GiSpawnNode } from "react-icons/gi";



class SetChecker extends Component {

    state = {
        color : this.props.color,
        location : this.props.pos,
        isQueen : false
    }
    

    render() {
        return (
            <div>
                {/* do here if color is black it will show a picture of black piece and if the color is white it will show an img of white piece */}
                {this.state.location===this.props.pos && this.state.color==='White' ? (
                    <GiPawn className='setchecker-white-pawn'/>
                ) : (
                    <GiPawn className='setchecker-black-pawn'/>
                )}

            </div>

        )
    }
};

export default SetChecker;
