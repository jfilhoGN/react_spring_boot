import React from "react";

import {Navbar, Row} from 'react-materialize';
// Importando o Component NavLink da nossa lib de rotas
import { NavLink } from 'react-router-dom'

const Header = () => (
    <Row>  
      <Navbar className="blue darken-2">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='funcionarios'>Funcionarios</NavLink></li>
        <li><NavLink to='/addfuncionarios'>Add Funcionario</NavLink></li>
      </Navbar>
    </Row>
  );
  
  export default Header;