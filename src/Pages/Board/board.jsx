import React, { useEffect } from 'react';

// CSS 
import './board.css'

// Components
import Cube from './subComponents/cubeLoc';

// This file is creating the board and set the pieces
export default function Board() {

    const boardY = [1, 2, 3, 4, 5, 6, 7, 8];
    const boardX = ["a", "b", "c", "d", "e", "f", "g", "h"];

    // create a function that first places the pieces. - by placing you need to set in the pos the a1...
    const listOfWhite = ['a6', 'a8', 'b7', 'c6', 'c8', 'd7', 'e6', 'e8', 'f7', 'g6', 'g8', 'h7']
    const listOfBlack = ['h1', 'h3', 'g2', 'f1', 'f3', 'e2', 'd1', 'd3', 'c2', 'b1', 'b3', 'a2']


    // create function 
    return (
        <div className='checkers-wrapper'>
            {boardY.map((column, yIndex) => {
                return (
                    <div key={yIndex} className='checkers-row-wrapper'>
                        {boardX.map((row, xIndex) => {
                            const pos = `${row}${column}`;
                            return (
                                <Cube key={xIndex}
                                    pos={pos}
                                    xIndex={xIndex}
                                    yIndex={yIndex}
                                    boardY={boardY}
                                    boardX={boardX}
                                    listOfWhite={listOfWhite}
                                    listOfBlack={listOfBlack} 
                                />
                            )
                        })}
                    </div>
                )
            })
            }
        </div>
    )
}