import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Main from './main';



class App extends Component {

  render() {
    return (
      <div>
      <Header />
      <Main />
      </div>
    );
  }
}

export default App;
