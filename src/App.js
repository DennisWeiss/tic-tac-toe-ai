import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToeField from "./components/TicTacToeField";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TicTacToeField/>
      </div>
    );
  }
}

export default App;
