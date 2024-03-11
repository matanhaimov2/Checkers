import React, { Component } from 'react';

// Components
import SetChecker from '../../../Components/SetChecker/setchecker';


// This is one cube in the board
class Cube extends Component {

    state = {
        content: 'White', // white black nothing
        locationWhite: this.props.listOfWhite, // a1,b1...
    }

    state2 = {
        content: 'Black', // white black nothing
        locationBlack: this.props.listOfBlack, // a1,b1...
    }

    setPiece = (pos, color) => {

        // waitng...
    }

    removePiece = () => {

        // waitng...
    }

    // do function set piece - call it when setting all pieces at the begining and when someone makes a move


    render() {
        const { pos } = this.props;
        const { locationWhite } = this.state;
        const { locationBlack } = this.state2;


        return (
            <div id='cube' onClick={() => this.setPiece(pos)} key={pos} pos={this.props.pos} className={`checkers-object-wrapper ${(((this.props.xIndex) + (this.props.boardY.length - (this.props.yIndex + 1))) % 2 === 0 ? "dark" : "light")}`}>

                {locationWhite.map((item, i) => (
                    item === this.props.pos && (
                        <SetChecker key={i} color={this.state.content} />
                    )
                ))}

                {locationBlack.map((item, i) => (
                    item === this.props.pos && (
                        <SetChecker key={i} color={this.state2.content} />
                    )
                ))}



            </div>
        )
    }
};

export default Cube;