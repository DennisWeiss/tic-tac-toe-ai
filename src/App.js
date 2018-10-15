import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import TicTacToeField from './components/TicTacToeField'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className='tic-tac-toe'>
                    <TicTacToeField/>
                </div>
            </div>
        )
    }
}

export default App
