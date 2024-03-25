import React, { Component } from 'react';

// Components
import Pawn from '../../../Components/SetChecker/pawn';


// This is one cube in the board
class Cube extends Component {

    render() {

        const { pos } = this.props;
    
  
        return (
            <div id={pos} key={pos} pos={pos} onClick={() => this.props.handleMove(pos, this.props.boardX, this.props.boardY)} className={`checkers-object-wrapper ${(((this.props.xIndex) + (this.props.boardY.length - (this.props.yIndex + 1))) % 2 === 0 ? "dark" : "light")}`}>
                {this.props.color!=='empty' && (
                    <Pawn key={pos} id={`${pos}-pawn`} color={this.props.color} />
                )}
            </div>
        )
    }
};

export default Cube;