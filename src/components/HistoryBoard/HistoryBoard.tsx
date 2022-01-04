import React from 'react';
import {Move, gameStatus} from "../Board/Board";
import './HistoryBoard.css';

interface Props {
    moves: Move[] | [],
    currentPlayer: string,
    gameStatus: gameStatus,
    onMoveClick(e: React.MouseEvent<HTMLButtonElement>): void
}

function HistoryBoard({moves, currentPlayer,onMoveClick, gameStatus} : Props) {

    return (
        <div className="historyBoard">
            {gameStatus.winner?
                <div> Winner is: {gameStatus.winner} </div>:
                gameStatus.gameOver?
                    <div>Game Over</div> :
                    <div>Next Player: {currentPlayer}</div>
            }

            <ul className="moves">
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