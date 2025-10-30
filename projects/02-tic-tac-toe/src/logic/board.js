import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] // 0 -> X/O
      && boardToCheck[a] === boardToCheck[b] 
      && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
      
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
// Check if there are no nulls left in the board
return newBoard.every(square => square !== null)
}