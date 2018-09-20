import React from "react";

import {Navbar, Row, Icon} from 'react-materialize';
// Importando o Component NavLink da nossa lib de rotas
import { NavLink } from 'react-router-dom'
/* 
Arquivo responsável pelo cabeçalho da página
<li><NavLink to='funcionarios'>Funcionarios</NavLink></li> 
*/
const Header = () => (
    <Row>  
      <Navbar className="blue darken-2">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink title="login" to='/login'><Icon>assignment_ind</Icon></NavLink></li>
        <li><NavLink title="tarefas" to='/tarefas'><Icon>assessment</Icon></NavLink></li>
        <li><NavLink title="minha conta" to='/account'><Icon>account_circle</Icon></NavLink></li>
      </Navbar>
    </Row>
  );
  
  export default Header;