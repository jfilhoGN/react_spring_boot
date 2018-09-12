import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Main from './main';
// Importando bib para Ajax
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      funcionario: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8080/funcionario')
    .then(newData => console.log(newData))
  }


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
