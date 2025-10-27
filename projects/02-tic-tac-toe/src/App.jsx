import { useState } from "react"

const TURNS = {
  X: 'X',
  O: 'O'
}


const Square = ({ children,isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  return (
    <div key={index} className={className}>
      <span className="cell_content">
        {index}
      </span>
    </div>
  )
}



function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [turn, setturn] = useState(TURNS.X)
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
    <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square 
              key={index} 
              index={index}
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
