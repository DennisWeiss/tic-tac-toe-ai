## Tic Tac Toe AI

This AI uses the minimax algorithm to find the next action to do. 

Since tic tac toe is a solved game and this AI plays perfectly, the AI is guaranteed to get at least a tie.

It searches through the entire search tree it will always take the option that guarantees the highest reward presuming 
the opponent plays perfectly as well. This possible because tic tac toe is a simple game and there are at most 8! = 40320 
game states to check.