import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner } from "./logic/board"




// This is the parent component
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // Null means no winner yet, False means a tie
  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  const checkEndGame = (newBoard) => {
    // Check if there are no nulls left in the board
    return newBoard.every(square => square !== null)
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
    // Check for a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // It's a tie
    }
  }



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
      

    </main>
  )
}

export default App 