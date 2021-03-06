import React, {useState, useEffect} from 'react';
import Square from "../Square/Square";
import HistoryBoard from "../HistoryBoard/HistoryBoard";
import { css } from '@emotion/css'

const styles = {
    containerStyle: css`
      margin: 20px;
      display: flex;
    `,
    boardStyle: css`
      margin: 20px;
      display: grid;
      width:150px;
      height: 150px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      border: 1px solid black;
    `
}

export enum values {
    X = "X",
    O = "O",
}

type BoardGame = [values, values,values][];
export type Move = {
    nextPlayer: values,
    board: BoardGame,
    gameStatus:gameStatus,
}
export type gameStatus = {
    gameOver: boolean,
    winSquares: string[],
    winner?: values,
}

const Board: React.FC  = () =>{

    const initialState : BoardGame = Array(3).fill(Array(3).fill(undefined));
    const [board ,setBoard ] = useState(initialState);
    const [moves,setMoves] = useState<Move[]>([]);
    const [currentPlayer,setCurrentPlayer] = useState(values.X);
    const [currentMove,setCurrentMove] = useState(0);
    const [gameStatus,setGameStatus] = useState<gameStatus>({gameOver:false, winSquares:[]});

    useEffect(()=>{
        setMoves([{nextPlayer:currentPlayer,board: initialState, gameStatus: {gameOver:false,  winSquares:[]}}]);
    },[])

    const onMoveClick = (e : React.MouseEvent<HTMLButtonElement> ) : void =>{
        const move:Move = moves[+e.currentTarget.id];
        setBoard(move.board);
        setCurrentMove(+e.currentTarget.id);
        setCurrentPlayer(move.nextPlayer);
        setGameStatus({...move.gameStatus})
    }

    const onSquareClick = (e : React.MouseEvent<HTMLButtonElement> ) : void => {
        if (gameStatus.winner || gameStatus.gameOver) return;
        const squarePosition = e.currentTarget.id.split(",").map(value => +value);
        const newBoard :BoardGame = board.map(arr => arr.slice()) as BoardGame;
        newBoard[squarePosition[0]][squarePosition[1]]=currentPlayer;
        setBoard(newBoard);
        let nextPlayer = currentPlayer === values.X? values.O: values.X;
        setCurrentPlayer(nextPlayer);
        setCurrentMove((currentMove)=>currentMove+1);
        const newGameStatus: gameStatus= calculateGameStatus(newBoard,currentMove+1);
        const newMove : Move = {nextPlayer:nextPlayer,board:newBoard, gameStatus: newGameStatus} ;
        let newMoves = [...moves];
        if (currentMove < moves.length){
           newMoves = newMoves.slice(0,currentMove+1);
        }
        newMoves.push(newMove);
        setMoves(newMoves);
    };

    const calculateGameStatus = (board:BoardGame,currentMove:number) => {
        let newGameStatus :gameStatus = {...gameStatus};

        const checkSquares =([a,b,c] : number[][])=>{
            if (board[a[0]][a[1]]!== undefined && board[a[0]][a[1]]=== board[b[0]][b[1]] && board[a[0]][a[1]]===board[c[0]][c[1]]){
                newGameStatus = { winner:board[a[0]][a[1]] , gameOver:false, winSquares:[a.join(","),b.join(","),c.join(",")]};
                setGameStatus(newGameStatus);
                return true;
            }
            return false;
        }

        if (checkSquares([[0,0],[0,1],[0,2]]) ||
            checkSquares([[1,0],[1,1],[1,2]]) ||
            checkSquares([[2,0],[2,1],[2,2]]) ||
            checkSquares([[0,0],[1,0],[2,0]]) ||
            checkSquares([[0,1],[1,1],[2,1]]) ||
            checkSquares([[0,2],[1,2],[2,2]]) ||
            checkSquares([[0,0],[1,1],[2,2]]) ||
            checkSquares([[0,2],[1,1],[2,0]]) ){

            return newGameStatus;
        }
        else if(currentMove === 9){
            newGameStatus = {...gameStatus, gameOver:true};
            setGameStatus(newGameStatus);
        }
        return newGameStatus;
    };

    return (<div className={styles.containerStyle}>
               <div className={styles.boardStyle}>
                   {board.map((row,rowIndex) => row.map((col,colIndex)=> {
                       return <Square key={rowIndex + "," + colIndex}
                                      id={rowIndex + "," + colIndex}
                                      value={board[rowIndex][colIndex]}
                                      currentPlayer={currentPlayer}
                                      onSquareClick={onSquareClick}
                                      winner={gameStatus.winSquares.includes(`${rowIndex},${colIndex}`)? gameStatus.winner: undefined}
                                      gameOver={gameStatus.gameOver}/>
                   }))}
               </div>
                <HistoryBoard moves={moves} currentPlayer={currentPlayer} onMoveClick={onMoveClick} gameStatus={gameStatus}/>
            </div>
    )
}

export default Board;