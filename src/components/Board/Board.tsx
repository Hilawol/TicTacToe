import React, {useState, useEffect} from 'react';
import Square from "../Square/Square";
import HistoryBoard from "../HistoryBoard/HistoryBoard";
import './board.css';

//export let players: "X" |"O";
export let values :  "X" |"O" | "";
type BoardGame = [[typeof values,typeof values,typeof values],
                    [typeof values,typeof values,typeof values],
                    [typeof values,typeof values,typeof values]];
export type Move = {
    nextPlayer: typeof values,
    board: BoardGame,
    gameStatus:gameStatus,
}

export type gameStatus = {
    gameOver: boolean,
    winSquares: string[],
    winner: string | null,
}

const Board  = () =>{

    const initialState : BoardGame = [["","",""],["","",""],["","",""]];
    const [board ,setBoard ] = useState(initialState);
    const [moves,setMoves] = useState<Move[] | []>([]);
    const [currentPlayer,setCurrentPlayer] = useState<typeof values>("");
    const [currentMove,setCurrentMove] = useState(0);
    let [gameStatus,setGameStatus] = useState<gameStatus>({gameOver:false, winner:null, winSquares:[]});

    useEffect(()=>{
        setMoves([{nextPlayer:"X",board: initialState, gameStatus: {gameOver:false, winner: null, winSquares:[]}}]);
        setCurrentPlayer("X");
    },[])

    const onMoveClick = (e : React.MouseEvent<HTMLButtonElement> ) : void =>{
        let move:Move = moves[+e.currentTarget.id];
        setBoard(move.board);
        setCurrentMove(+e.currentTarget.id);
        setCurrentPlayer(move.nextPlayer);
        setGameStatus({...move.gameStatus})
    }

    const onSquareClick = (e : React.MouseEvent<HTMLButtonElement> ) : void => {
        if (gameStatus.winner || gameStatus.gameOver) return;
        const squarePosition = e.currentTarget.id.split(",").map(value => +value);
        const newBoard :BoardGame = JSON.parse(JSON.stringify(board));
        newBoard[squarePosition[0]][squarePosition[1]]=currentPlayer;
        setBoard(newBoard);
        if (currentPlayer !== ""){ //TODO:Ask
            let nextPlayer:typeof values = currentPlayer === "X"? "O": "X";
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
        }
    };

    const calculateGameStatus = (board:BoardGame,currentMove:number) => {
        let newGameStatus :gameStatus = {...gameStatus};

        const checkSquares =([a,b,c] : number[][])=>{
            if (board[a[0]][a[1]]!=="" && board[a[0]][a[1]]=== board[b[0]][b[1]] && board[a[0]][a[1]]===board[c[0]][c[1]]){
                newGameStatus = { winner:board[a[0]][a[1]], gameOver:false, winSquares:[a.join(","),b.join(","),c.join(",")]};
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

    return (<div className="container">
               <div className="board">
                   {board.map((row,rowIndex) => row.map((col,colIndex)=> {
                       return <Square key={rowIndex + "," + colIndex}
                                      id={rowIndex + "," + colIndex}
                                      value={board[rowIndex][colIndex]}
                                      currentPlayer={currentPlayer}
                                      onSquareClick={onSquareClick}
                                      winner={gameStatus.winSquares.includes(`${rowIndex},${colIndex}`)? gameStatus.winner: null}
                                      gameOver={gameStatus.gameOver}/>
                   }))}
               </div>
                <HistoryBoard moves={moves} currentPlayer={currentPlayer} onMoveClick={onMoveClick} gameStatus={gameStatus}/>
            </div>
    )
}

export default Board;