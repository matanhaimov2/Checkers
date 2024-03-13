import React, { Component } from 'react';

// Components
import SetChecker from '../../../Components/SetChecker/setchecker';


// This is one cube in the board
class Cube extends Component {

    state = {
        content: 'White', // white black nothing
        locationWhite: this.props.listOfWhite, // a1,b1...
        previousPossibleMoves: [],
    }

    state2 = {
        content: 'Black', // white black nothing
        locationBlack: this.props.listOfBlack, // a1,b1...
    }

    setPiece = (pos) => {
        console.log(pos)

        const { previousPossibleMoves } = this.state

        console.log(previousPossibleMoves) // how is there something if it accours before definition!!!

        // if theres open previousPossibleMoves to delete
        if(previousPossibleMoves) {
            console.log('are you in?')
            
            // delete style for each one
            for(let i = 0; i<previousPossibleMoves.length; i++) {
                console.log('are you in alsooo?')

                document.getElementById(previousPossibleMoves[i]).style.background  = '';        
            }
            
            // set previousPossibleMoves to none for next move
            this.setState({
                previousPossibleMoves : []
            })

            console.log(previousPossibleMoves)
        }

        // if pawn is selected
        if(this.state.locationWhite.includes(pos) || this.state2.locationBlack.includes(pos)) {
            let indexOfX = this.props.boardX.indexOf(pos[0]) // pos[0] = b, indexOfX => 7       
            let indexOfY = this.props.boardY.indexOf(parseInt(pos[1])) // pos[1] = 7, indexOfY => 6  

            let letterAfter = this.props.boardX[indexOfX + 1] // c
            let numberAfter = this.props.boardY[indexOfY + 1] // 8
            let letterBefore = this.props.boardX[indexOfX - 1] // a
            let numberBefore = this.props.boardY[indexOfY - 1] // 6

            let possibleMoves = [];
            let filteredPossibleMoves = [];

            // give player optionsToMove, but filter moving forwards (so player won't move backwards)
            if (letterAfter) {
                if(this.state.locationWhite.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterAfter + numberBefore) : null) // 6 => c6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterAfter + numberAfter) : null) // 8 => c8
                }
            }

            if (letterBefore) {
                if(this.state.locationWhite.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterBefore + numberBefore) : null) // 6 => a6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterBefore + numberAfter) : null) // 8 => a8
                }
            }

            possibleMoves = possibleMoves.filter(n => n) // filter 'null' out
            // console.log(possibleMoves)

            // filter own pawns so player won't be able to move on it's own pawns
            for (let i = 0; i<possibleMoves.length; i++) {
                if(this.state.locationWhite.includes(pos)) { // if pawn is white
                    var filterOwnPawns = this.state.locationWhite.includes(possibleMoves[i])
                }
                else { // if pawn is black
                    var filterOwnPawns = this.state2.locationBlack.includes(possibleMoves[i])
                }

                if (!filterOwnPawns) { // if pawn is not on the list => add pawn to filteredPossibleMoves
                    filteredPossibleMoves.push(possibleMoves[i])
                }
            }
            // console.log(filteredPossibleMoves) // filtered possibleMoves 

            // add style for possible moves
            for(let i = 0; i<filteredPossibleMoves.length; i++) {
                document.getElementById(filteredPossibleMoves[i]).style.background  = "blue"; 
            }

            this.setState({
                previousPossibleMoves: previousPossibleMoves.push(filteredPossibleMoves)
            })      

            console.log(previousPossibleMoves)

        }

        // if empty cube is selected
        else {
            console.log('do nothing')
        }
    }

    removePiece = () => {
        // waitng...
    }

    render() {
        const { pos } = this.props;
        const { locationWhite } = this.state;
        const { locationBlack } = this.state2;


        return (
            <div id={pos} key={pos} pos={this.props.pos} onClick={() => this.setPiece(pos)} className={`checkers-object-wrapper ${(((this.props.xIndex) + (this.props.boardY.length - (this.props.yIndex + 1))) % 2 === 0 ? "dark" : "light")}`}>

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