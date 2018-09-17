// Importando o React
import React from "react";
// Importando o component Home
import Home from "./components/home/home";
// Importando os components necessários da lib react-materialize
import { Container } from 'react-materialize';
// Importanto o component <Switch /> e <Route /> da nossa Lib de rotas
import { Switch, Route } from 'react-router-dom'
//import Funcionario from "./components/funcionario/funcionarios";
import AddFuncionario from "./components/funcionario/addFuncionario"
import Login from "./components/login/login";
import Tarefas from "./components/tarefas/tarefas";

/* Camada que possui as rotas que serão seguidas */
// <Route path='/funcionarios' component={Funcionario}/>
const Main = () => (
  <main>
    <Container>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/addfuncionario' exact={true} component={AddFuncionario}/>
        <Route path="/addfuncionario/:funcionarioId" component={AddFuncionario} />
        <Route path="/tarefas" component={Tarefas} />
    </Switch>
    </Container>
  </main>  
);

export default Main;