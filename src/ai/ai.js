import {deepCopyTiles} from "../helper/helperfunctions"


const hasWon = (tiles, player) =>
    tiles[0][0] === player && tiles[0][1] === player && tiles[0][2] === player ||
    tiles[1][0] === player && tiles[1][1] === player && tiles[1][2] === player ||
    tiles[2][0] === player && tiles[2][1] === player && tiles[2][2] === player ||
    tiles[0][0] === player && tiles[1][0] === player && tiles[2][0] === player ||
    tiles[0][1] === player && tiles[1][1] === player && tiles[2][1] === player ||
    tiles[0][2] === player && tiles[1][2] === player && tiles[2][2] === player ||
    tiles[0][0] === player && tiles[1][1] === player && tiles[2][2] === player ||
    tiles[2][0] === player && tiles[1][1] === player && tiles[0][2] === player

const tied = tiles => {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] === '') {
                return false
            }
        }
    }
    const players = ['X', 'O']
    for (let i = 0; i < players.length; i++) {
        if (hasWon(tiles, players[i])) {
            return false
        }
    }
    return true
}


const getOptimalMove = (tiles, player, max = true, depth=0) => {
    const players = ['X', 'O']
    const factor = max ? 1 : -1
    let move = {
        i: -1,
        j: -1,
        reward: max ? -1000 : 1000
    }
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            for (let k = 0; k < players.length; k++) {
                if (hasWon(tiles, players[k])) {
                    return {
                        i: -1,
                        j: -1,
                        reward: (players[k] === player ? 1 : -1) * factor
                    }
                }
            }
            if (tied(tiles)) {
                return {
                    i: -1,
                    j: -1,
                    reward: 0
                }
            }
            if (tiles[i][j] === '') {
                const tilesCpy = deepCopyTiles(tiles)
                tilesCpy[i][j] = player
                const subMove = getOptimalMove(tilesCpy, player === 'X' ? 'O' : 'X', !max, depth+1)
                if (factor * subMove.reward > factor * move.reward) {
                    move = {
                        i: i,
                        j: j,
                        reward: subMove.reward
                    }
                }
            }
        }
    }
    return move
}

export {getOptimalMove}