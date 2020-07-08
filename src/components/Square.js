import React from 'react';


function Square(props) {

    const isWinner = props.isWinner ? "squareWinner square" : "square"
    return (
        <button className={isWinner} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;