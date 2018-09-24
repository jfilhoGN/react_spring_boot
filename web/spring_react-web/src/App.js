import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from "./components/home/home";
import Header from './components/header/header';
import AddFuncionario from "./components/funcionario/addFuncionario"
import Login from "./components/login/login";
import Tarefas from "./components/tarefas/tarefas";
import AddTarefas from "./components/tarefas/addtarefas";
import Funcionario from "./components/funcionario/funcionario";
import ChangeSenhaFuncionario from "./components/funcionario/changeSenhaFuncionario";

/* Classe principal do react-js 
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      logado:false
    }
  }

  onLogin = () => {
    this.setState({logado:true});
  }

  onLogout = () =>{
    this.setState({logado:false});
    sessionStorage.setItem("data", false);
    //this.props.history.push("/");
  }

  render() {
    const {logado} = this.state;
    return (
      <div>
      <Header logado={logado} onLogin={this.onLogin} onLogout={this.onLogout} />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' render={props => <Login {...props} onLogin={this.onLogin} />}/>
        <Route path='/addfuncionario' exact={true} component={AddFuncionario}/>
        <Route path="/tarefas" component={Tarefas} />
        <Route path="/addtarefas" exact={true} component={AddTarefas}/>
        <Route path="/addtarefas/:tarefaId" component={AddTarefas}/>
        <Route path="/account" exact={true} component={Funcionario} />
        <Route path="/account/changesenha" component={ChangeSenhaFuncionario} />
        <Redirect to="/" />
    </Switch>
      </div>
    );
  }
}

export default App;
