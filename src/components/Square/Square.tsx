import React from "react";
import {values} from "../Board/Board";
import { css,cx } from '@emotion/css'

const styles = {
    squareStyle: css`
    background-color: transparent;
    border: 1px solid black;
    `,
    winnerStyle: css`
    color: red;
    `,
    gameOverStyle: css`
    background-color: lightgray;
    `
}

interface Props {
    onSquareClick (e: React.MouseEvent<HTMLButtonElement>): void;
    id: string,
    currentPlayer: values.X | values.O,
    value: values,
    winner ?: values.X | values.O,
    gameOver: boolean,
}

const Square: React.FC<Props> = ({value, winner, onSquareClick, id,gameOver}) =>{

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        if(value !== undefined) return;
        onSquareClick(e);
    }

    return (<button type="button"
                    className={ winner? cx(styles.winnerStyle,styles.squareStyle) :
                                gameOver?cx(styles.squareStyle,styles.gameOverStyle)  :
                                    styles.squareStyle}
                    id={id} onClick={onClick}>{value}</button>);
}

export default Square;