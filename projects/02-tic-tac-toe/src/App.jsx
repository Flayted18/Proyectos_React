import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkEndGame, checkWinner } from "./logic/board.js"

import { WinnerModal } from "./components/WinnersModal.jsx"

// This is the parent component
function App() {
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage 
    ? JSON.parse(boardFromStorage) 
    : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // Null means no winner yet, False means a tie
  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn') 
  }

 


  // Here, I'm sending the updateBoard function to the Square component (Child component)
  const updateBoard = (index) => {
    
    // If the square is already filled, do nothing
    if (board[index] || winner) return

    // Update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Determine the next turn
    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Save game
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Check for a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // It's a tie
    }
  }

  useEffect(() => {
    console.log('useEffect')
  })
  

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de Nuevo</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected= {turn ===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected= {turn ===TURNS.O}>
          {TURNS.O}
        </Square> 

      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default App 