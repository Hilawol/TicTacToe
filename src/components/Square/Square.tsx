import React from "react";
import {values} from "../Board/Board";
import './square.css';

interface Props {
    onSquareClick (e: React.MouseEvent<HTMLButtonElement>): void;
    id: string,
    currentPlayer: typeof values
    value: typeof values,
    winner: string | null,
    gameOver: boolean,
}

const Square = ({onSquareClick, id,value,winner,gameOver} : Props) =>{

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        if(value !== "") return;
        onSquareClick(e);
    }

    return (<button type="button" className={ winner?  "winner" : gameOver? "gameover" : "btn"}  id={id} onClick={onClick}>{value}</button>);
}

export default Square;