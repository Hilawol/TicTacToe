import React, {useState, useEffect} from 'react';
import Square from "../Square";
import HistoryBoard from "../HistoryBoard/HistoryBoard";
import './board.css';

const Board  = () =>{

    const initialState = [["","",""],["","",""],["","",""]];
    const [board ,setBoard ] = useState(initialState);
    const [moves,setMoves] = useState([]);
    const [currentPlayer,setCurrentPlayer] = useState("");
    const [currentMove,setCurrentMove] = useState(0);

    useEffect(()=>{
        setMoves([{nextPlayer:"X",board: initialState}]);
        setCurrentPlayer("X");
    },[])

    useEffect(()=>{
    },[board]);

    const onMoveClick = (e  ) =>{
        let move = moves[+e.currentTarget.id];
        setBoard(move.board);
        setCurrentMove(+e.currentTarget.id);
        setCurrentPlayer(move.nextPlayer);
    }

    const onSquareClick = (e)  => {
        const squarePosition = e.currentTarget.id.split(",").map(value => +value);
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[squarePosition[0]][squarePosition[1]]=currentPlayer;
        setBoard(newBoard);
        let nextPlayer = currentPlayer === "X"? "O": "X";
        setCurrentPlayer(nextPlayer);
        const newMove  = {nextPlayer:nextPlayer,board:newBoard} ;
        let newMoves = JSON.parse(JSON.stringify(moves));
        setCurrentMove((currentMove)=>currentMove+1);
        if (currentMove < moves.length){
            newMoves = newMoves.slice(0,currentMove+1);
        }
        newMoves.push(newMove);
        setMoves(newMoves);
    }

    if(board){
        return (<>
                <div className="board">
                    {board.map((row,rowIndex) => row.map((col,colIndex)=>
                        <Square id={rowIndex + "," + colIndex}
                                value={board[rowIndex][colIndex]}
                                currentPlayer={currentPlayer}
                                onSquareClick={onSquareClick}/>))}
                </div>
                <HistoryBoard  moves={moves} currentPlayer={currentPlayer} onMoveClick={onMoveClick}/>
            </>
        )
    }
    return(<div></div>);
}

export default Board;