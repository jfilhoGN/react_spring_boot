// Importando o React
import React from "react";
// Importando o component Home
import Home from "./components/home/home";
// Importando os components necessários da lib react-materialize
import { Container } from 'react-materialize';
// Importanto o component <Switch /> e <Route /> da nossa Lib de rotas
import { Switch, Route } from 'react-router-dom'
import Funcionario from "./components/funcionario/funcionarios";

const Main = () => (
  <main>
    <Container>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/funcionarios' component={Funcionario}/>
    </Switch>
    </Container>
  </main>  
);

export default Main;