import React from "react";
import {values} from "../Board/Board";
import { css,cx } from '@emotion/css'

const squareStyle = css`
  background-color: transparent;
  border: 1px solid black;
`
const winnerStyle = css`
  color: red;
`
const gameOverStyle = css`
  background-color: lightgray;
`


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

    return (<button type="button" className={ winner? cx(winnerStyle,squareStyle) : gameOver?cx(gameOverStyle,squareStyle)  : squareStyle}  id={id} onClick={onClick}>{value}</button>);
}

export default Square;