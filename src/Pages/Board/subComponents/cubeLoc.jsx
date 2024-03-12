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

    setPiece = (pos) => {
        console.log(pos)

        var newFirstStr;
        var newFirstNumber;
        var newSecondStr;
        var newSecondNumber;


        if (this.state.locationWhite.includes(pos)) { // for example: b2

            let indexOfX = this.props.boardX.indexOf(pos[0]) // pos[0] = b, indexOfX => 1           
            let indexOfY = this.props.boardY.indexOf(parseInt(pos[1])) // pos[1] = 7, indexOfY => 6  

            var letterAfter = this.props.boardX[indexOfX + 1] // c
            var numberAfter = this.props.boardY[indexOfY + 1] // 8
            var letterBefore = this.props.boardX[indexOfX - 1] // a
            var numberBefore = this.props.boardY[indexOfY - 1] // 6

            if(!numberAfter) { // in case 2 edges pawn is selected
                if(letterBefore) {
                    newSecondStr = letterAfter + numberBefore 
                    newSecondNumber = letterBefore + numberBefore 
                    console.log(newSecondStr, newSecondNumber) 
                }
                else { // in case 1 edge pawn is selected
                    newSecondStr = letterAfter + numberBefore 
                    console.log(newSecondStr) 
                }
            }

            else if(!letterAfter) { // in case 2 edges pawn is selected
                newFirstNumber = letterBefore + numberAfter
                newSecondNumber = letterBefore + numberBefore 
                console.log(newFirstNumber, newSecondNumber) 

            }

            else if(!letterBefore) { // in case 2 edges pawn is selected
                if(numberAfter) {
                    newFirstStr = letterAfter + numberAfter
                    newSecondStr = letterAfter + numberBefore
                    console.log(newFirstStr, newSecondStr) 
                }
                else { // in case 1 edge pawn is selected
                    newFirstStr = letterAfter + numberAfter
                    console.log(newFirstStr)
                }
            }

            else if(!numberBefore) { // in case 2 edges pawn is selected
                newFirstStr = letterAfter + numberAfter   
                newFirstNumber = letterBefore + numberAfter
                console.log(newFirstStr, newFirstNumber) 

            }

            else if(!numberAfter && !letterBefore) {
                newSecondStr = letterAfter + numberBefore 
                console.log(newSecondStr)

            }

            else{ // in case 4 edges pawn is selected
                newFirstStr = letterAfter + numberAfter // c8    
                newFirstNumber = letterBefore + numberAfter // a8
                newSecondStr = letterAfter + numberBefore //c6
                newSecondNumber = letterBefore + numberBefore // a6   
                console.log(newFirstStr, newSecondStr, newFirstNumber, newSecondNumber) 
                // select edge pawn is missing
            }

        }
        else if (this.state2.locationBlack.includes(pos)) {
            console.log('blackishere')
        }
        else {
            // empty cube 
        }

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
                    item === pos && (
                        <SetChecker key={i} color={this.state.content} />
                    )
                ))}

                {locationBlack.map((item, i) => (
                    item === pos && (
                        <SetChecker key={i} color={this.state2.content} />
                    )
                ))}



            </div>
        )
    }
};

export default Cube;