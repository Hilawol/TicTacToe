import React from 'react';
import {Move, gameStatus, values} from "../Board/Board";
import { css } from '@emotion/css';

const styles = {
    historyBoardStyle: css`
      margin: 20px;
      ul & {
        padding-inline-start: 20px;
      }
      li & {
        list-style-type: decimal;
      }
    `
}

interface Props {
    moves: Move[] | [],
    currentPlayer: values.X | values.O,
    gameStatus: gameStatus,
    onMoveClick(e: React.MouseEvent<HTMLButtonElement>): void
}

const HistoryBoard:React.FC<Props> = ({moves, currentPlayer,onMoveClick, gameStatus}) => {

    return (
        <div className={styles.historyBoardStyle}>
            {gameStatus.winner?
                <div> Winner is: {gameStatus.winner} </div>:
                gameStatus.gameOver?
                    <div>Game Over</div> :
                    <div>Next Player: {currentPlayer}</div>
            }

            <ul>
                {moves.map((move,index) => {
                        return(<li key={index}>
                                    <button type="button" id={index.toString()} onClick={onMoveClick}>
                                        {index>0? "Go to move #"+index : "Go to game start"}
                                    </button>
                              </li>)
                    }
                )}
            </ul>
        </div>
    );
}

export default HistoryBoard;