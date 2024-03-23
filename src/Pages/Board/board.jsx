import React from 'react';

// CSS 
import './board.css'

// Components
import Cube from './subComponents/cubeLoc';

// This file is creating the board and set the pieces
export default function Board({ whites, blacks, handleMove }) {

    const boardY = [1, 2, 3, 4, 5, 6, 7, 8];
    const boardX = ["a", "b", "c", "d", "e", "f", "g", "h"];

    return (
        <div className='checkers-wrapper'>
            {boardY.map((column, yIndex) => (
                <div key={yIndex} className='checkers-row-wrapper'>
                    {boardX.map((row, xIndex) => {
                        const pos = `${row}${column}`;
                        let color = 'empty';

                        if (whites.includes(pos)) color = 'white';
                        else if (blacks.includes(pos)) color = 'black';

                        return (
                            <Cube
                                key={xIndex}
                                pos={pos}
                                xIndex={xIndex}
                                yIndex={yIndex}
                                boardY={boardY}
                                boardX={boardX}
                                color={color}
                                handleMove={handleMove}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
