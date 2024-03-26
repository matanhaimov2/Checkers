
// here you will do the logic of the actull game 
// 1. the turn turn macahanizem
// 2. on each turn a player will have possible moves (function that you will create)
// 3. a function that will set the piece(setChecker ) in the cube (class that i ccreated cubloc)



// useeffect => [bool] // if true => white turn, else => black turn

import React, { useState, useEffect } from 'react';

import Board from '../Board/board';

// This file is creating the board and set the pieces
export default function GameLogic() {

    const [listOfWhite, setListOfWhite] = useState(['a6', 'a8', 'b7', 'c6', 'c8', 'd7', 'e6', 'e8', 'f7', 'g6', 'g8', 'h7']); 
    const [listOfBlack, setListOfBlack] = useState(['h1', 'h3', 'g2', 'f1', 'f3', 'e2', 'd1', 'd3', 'c2', 'b1', 'b3', 'a2']);
    const [turn, setTurn] = useState(true); // True means white is playing.
    const [currentList, setCurrentList] = useState(); // when turn is true => currentList = listOfWhite
    const [previousPossibleMoves, setPreviousPossibleMoves] = useState(); // previous possible moves



    // Turn machanizem
    useEffect(() => {
        if (turn) {
            startMove('white');
        }
        else {
            startMove('black');
        }
    }, [turn])

    const startMove = (currentPlayer) => {
        setCurrentList(currentPlayer === 'white' ? listOfWhite : listOfBlack);


        // Start turn for currentPlayer (white/black)
        // on click call possoble moves 
        // on click on one of the options of possible moves call set Piece which will color 


    }

    const getPossibleMoves = (pos, boardX, boardY) => {
        console.log(pos)
        console.log(currentList)

        if (currentList.includes(pos)) {
            let indexOfX = boardX.indexOf(pos[0]) // pos[0] = b, indexOfX => 7       
            let indexOfY = boardY.indexOf(parseInt(pos[1])) // pos[1] = 7, indexOfY => 6  

            let letterAfter = boardX[indexOfX + 1] // c
            let numberAfter = boardY[indexOfY + 1] // 8
            let letterBefore = boardX[indexOfX - 1] // a
            let numberBefore = boardY[indexOfY - 1] // 6

            let possibleMoves = [];
            let filteredPossibleMoves = [];

            // if there previousPossivleMoves remove background color - when player changes chosen pawn 
            if (previousPossibleMoves) {
                for (let previousPossibleMove of previousPossibleMoves) {
                    document.getElementById(previousPossibleMove).style.background = null;
                }
            }

            // give player optionsToMove, but filter moving forwards (so player won't move backwards)
            if (letterAfter) {
                if (listOfWhite.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterAfter + numberBefore) : null) // 6 => c6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterAfter + numberAfter) : null) // 8 => c8
                }
            }
            if (letterBefore) {
                if (listOfWhite.includes(pos)) { // if pawn is white
                    possibleMoves.push(numberBefore ? (letterBefore + numberBefore) : null) // 6 => a6
                }
                else { // if pawn is black
                    possibleMoves.push(numberAfter ? (letterBefore + numberAfter) : null) // 8 => a8
                }
            }

            possibleMoves = possibleMoves.filter(n => n) // filter 'null' out

            // filter own pawns so player won't be able to move on it's own pawns
            for (let possibleMove of possibleMoves) {
                var filterOwnPawns = currentList.includes(possibleMove)

                if (!filterOwnPawns) { // if pawn is not on the list => add pawn to filteredPossibleMoves
                    filteredPossibleMoves.push(possibleMove)
                }
            }
            console.log(filteredPossibleMoves) // filtered possibleMoves 

            // add eventlistener and style for possible moves
            for (let filteredPossibleMove of filteredPossibleMoves) {
                let element = document.getElementById(filteredPossibleMove);

                element.style.background = "blue";
                element.addEventListener("click", () => setPiece(pos, filteredPossibleMove, filteredPossibleMoves));

            }

            setPreviousPossibleMoves(filteredPossibleMoves)

        }
        else {
            console.log('its not your turn! or empty cube')
        }



        // Gets the possible moves. filters them out (if there is an other piece there or...)
        // Paints them and adds event listeners to those cubes with the function setPiece
    }

    const setPiece = (pos, filteredPossibleMove, filteredPossibleMoves) => {
        
        if (listOfWhite.includes(pos)) {
            
            const filteredList = listOfWhite.filter(item => item !== pos); // filters out pos
            setListOfWhite([...filteredList, filteredPossibleMove]); // sets filteredList + chosenPossibleMove
            
            // console.log(listOfWhite)
        }
        else if (listOfBlack.includes(pos)) {
            const filteredList = listOfBlack.filter(item => item !== pos); // filters out pos
            setListOfBlack([...filteredList, filteredPossibleMove]); // sets filteredList + chosenPossibleMove
            
            // console.log(listOfBlack)
        }

        for(let filteredPossibleMove of filteredPossibleMoves) {
            let element = document.getElementById(filteredPossibleMove);
            element.removeEventListener("click", setPiece);

            element.style.background = null;

        }
        console.log('nicely done!')

        // Call from the event lisenter only!

        // Set peice here....


        // After piece was set - That means Turn has ended (change to next player):
        // setTurn(!turn);
    }

    return (
        <div className='checkers-outer-wrapper'>
            <Board whites={listOfWhite} blacks={listOfBlack} handleMove={getPossibleMoves} />
        </div>
    )
}