import React, { Component } from 'react';

// Components
import SetChecker from '../../../Components/SetChecker/setchecker';


// This is one cube in the board
class Cube extends Component {

    stateWhite = {
        content: 'White', // white black nothing
        locationWhite: this.props.listOfWhite, // a1,b1...
    }

    stateBlack = {
        content: 'Black', // white black nothing
        locationBlack: this.props.listOfBlack, // a1,b1...
    }
    
    setPiece = (pos) => {
        console.log(pos)
        let whiteLocations = this.stateWhite.locationWhite;
        let blackLocations = this.stateBlack.locationBlack;
        
        // gets previousPossibleMoves from localstorage
        let previousPossibleMoveLS = localStorage.getItem("previousPossibleMoves");
        
        // if there perviousPossibleMoves => remove blue background color
        if(previousPossibleMoveLS) {
            for(let previousPossibleMove of JSON.parse(previousPossibleMoveLS)) {
                document.getElementById(previousPossibleMove).style.backgroundColor = "";
            }
            console.log('previousPossibleMoves: ' + previousPossibleMoveLS)
        }

        // if pawn is selected
        if(whiteLocations.includes(pos) || blackLocations.includes(pos)) {
            let indexOfX = this.props.boardX.indexOf(pos[0]) // pos[0] = b, indexOfX => 7       
            let indexOfY = this.props.boardY.indexOf(parseInt(pos[1])) // pos[1] = 7, indexOfY => 6  

            let letterAfter = this.props.boardX[indexOfX + 1] // c
            let numberAfter = this.props.boardY[indexOfY + 1] // 8
            let letterBefore = this.props.boardX[indexOfX - 1] // a
            let numberBefore = this.props.boardY[indexOfY - 1] // 6

            let possibleMoves = [];
            let filteredPossibleMoves = [];
            let previousPossibleMoves = [];

            // give player optionsToMove, but filter moving forwards (so player won't move backwards)
            if (letterAfter) {
                if(whiteLocations.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterAfter + numberBefore) : null) // 6 => c6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterAfter + numberAfter) : null) // 8 => c8
                }
            }
            if (letterBefore) {
                if(whiteLocations.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterBefore + numberBefore) : null) // 6 => a6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterBefore + numberAfter) : null) // 8 => a8
                }
            }

            possibleMoves = possibleMoves.filter(n => n) // filter 'null' out
            console.log(possibleMoves)
      
            // filter own pawns so player won't be able to move on it's own pawns
            for (let possibleMove of possibleMoves) {
                if(whiteLocations.includes(pos)) { // if pawn is white
                    var filterOwnPawns = whiteLocations.includes(possibleMove)
                }
                else { // if pawn is black
                    var filterOwnPawns = blackLocations.includes(possibleMove)
                }

                if (!filterOwnPawns) { // if pawn is not on the list => add pawn to filteredPossibleMoves
                    filteredPossibleMoves.push(possibleMove)
                }
            }
            console.log(filteredPossibleMoves) // filtered possibleMoves 

            // add style for possible moves
            for(let filteredPossibleMove of filteredPossibleMoves) {
                document.getElementById(filteredPossibleMove).style.background  = "blue"; 

                previousPossibleMoves.push(filteredPossibleMove)
            }

            // save previousPossibleMoves in localstorage
            localStorage.setItem("previousPossibleMoves", JSON.stringify(previousPossibleMoves));

            localStorage.setItem("InitialPos", pos);
        }
        else { // if empty cube is selected
            console.log(pos)

            // gets previousPossibleMoves from localstorage
            let previousPossibleMoveLS = localStorage.getItem("previousPossibleMoves");
            console.log(previousPossibleMoveLS)

            let InitialPosLS = localStorage.getItem("InitialPos");

            if(previousPossibleMoveLS) {
                for(let possibleMove of JSON.parse(previousPossibleMoveLS)) {
                    if(possibleMove===pos) {
                        console.log('player did select this cube', possibleMove)
                        console.log(whiteLocations)
                        
              
                        for(let i = 0; i<whiteLocations.length; i++) {
                            if(whiteLocations[i]===InitialPosLS) {
                                this.setState({
                                    locationWhite: this.stateWhite.locationWhite[i] = pos
                                });  
                            }
                        }

                        console.log(whiteLocations,'good?')
                        
                        // Delete the pawn's figure
                        let pawnToErase = document.getElementById(`${InitialPosLS}-pawn`);

                        if(pawnToErase) {
                            pawnToErase.remove();
                        }


                    }
                    else {
                        console.log('player didnt select this cube', pos)
                    }
                }
            }
            else {
                console.log('do nothing', pos)
            }



        }
    }

    removePiece = () => {
        // waitng...
    }

    render() {

        const { pos } = this.props;
        const { locationWhite } = this.stateWhite;
        const { locationBlack } = this.stateBlack;
       
        return (
            <div id={pos} key={pos} pos={pos} onClick={() => this.setPiece(pos)} className={`checkers-object-wrapper ${(((this.props.xIndex) + (this.props.boardY.length - (this.props.yIndex + 1))) % 2 === 0 ? "dark" : "light")}`}>
                <div id={`${pos}-pawn`}>
                    {locationWhite.map((item, i) => (
                        item === pos && (
                            <SetChecker key={i} color={this.stateWhite.content} />
                        )
                    ))}

                    {locationBlack.map((item, i) => (
                        item === pos && (
                            <SetChecker key={i} color={this.stateBlack.content} />
                        )
                    ))}
                </div>

            </div>
        )
    }
};

export default Cube;