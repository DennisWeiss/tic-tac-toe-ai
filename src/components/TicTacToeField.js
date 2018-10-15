import React from 'react'
import './TicTacToeField.css'
import {getOptimalMove} from '../ai/ai'
import {deepCopyTiles} from "../helper/helperfunctions";


const ai = 'X'
const players = ['X', 'O']

class TicTacToeField extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tiles: [['', '', ''],
                ['', '', ''],
                ['', '', '']],
            currentPlayer: players[Math.floor(2 * Math.random())],
            won: false
        }
    }

    componentDidMount() {
        this.aiMove()
    }

    aiMove() {
        if (this.state.currentPlayer === ai) {
            const tiles = deepCopyTiles(this.state.tiles)
            const {i, j} = getOptimalMove(tiles, this.state.currentPlayer)
            this.clickTile(i, j)
        }
    }

    hasWon(player) {
        const tiles = [...this.state.tiles]
        return tiles[0][0] === player && tiles[0][1] === player && tiles[0][2] === player ||
            tiles[1][0] === player && tiles[1][1] === player && tiles[1][2] === player ||
            tiles[2][0] === player && tiles[2][1] === player && tiles[2][2] === player ||
            tiles[0][0] === player && tiles[1][0] === player && tiles[2][0] === player ||
            tiles[0][1] === player && tiles[1][1] === player && tiles[2][1] === player ||
            tiles[0][2] === player && tiles[1][2] === player && tiles[2][2] === player ||
            tiles[0][0] === player && tiles[1][1] === player && tiles[2][2] === player ||
            tiles[2][0] === player && tiles[1][1] === player && tiles[0][2] === player
    }

    checkWon() {
        let won = false
        players.forEach(player => {
            if (this.hasWon(player)) {
                won = player
            }
        })
        if (!won && this.tied(this.state.tiles)) {
            won = 'tied'
        }
        this.setState({
            won: won
        }, this.aiMove)
    }

    tied = tiles => {
        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j] === '') {
                    return false
                }
            }
        }
        return true
    }

    clickTile(i, j) {
        if (i >= 0 && j >= 0 && !this.state.won && this.state.tiles[i][j] === '') {
            const tiles = deepCopyTiles(this.state.tiles)
            tiles[i][j] = this.state.currentPlayer
            this.setState({
                tiles: tiles,
                currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
            }, this.checkWon)
        }
    }

    reset() {
        this.setState({
            tiles: [['', '', ''],
                ['', '', ''],
                ['', '', '']],
            currentPlayer: players[Math.floor(2 * Math.random())],
            won: false
        }, this.aiMove)
    }

    render() {
        return (
            <div>
                <button onClick={this.reset.bind(this)}>Restart</button>
                <br/>
                <br/>
                {
                    this.state.won === 'tied' ? 'Game is tied!' : `It's player's ${this.state.currentPlayer} turn.`
                }
                <br/>
                <br/>
                <div>
                    {
                        this.state.tiles.map((row, i) =>
                            <div className='tic-tac-toe-row' key={i}>
                                {
                                    row.map((tile, j) =>
                                        <div className={`tic-tac-toe-tile ${tile === '' ? 'clickable' : ''}`}
                                             key={i + ',' + j}
                                             onClick={event => this.clickTile(i, j)}>
                                            {tile}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <br/>
                <br/>
                {
                    this.state.won && this.state.won !== 'tied' &&
                    <div>
                        {this.state.won} has won!
                    </div>
                }
            </div>
        )
    }
}

export default TicTacToeField