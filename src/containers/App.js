import React, { Component } from 'react';
import logo from '../img/logo.svg';
import './App.scss';
import './App.less';
import './App.css';

import txt from './file.txt';


class App extends Component {
  render() {
    console.log(txt)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Dev Boilerplate.!!!!</h2>
        </div>
      </div>
    );
  }
}

export default App;
