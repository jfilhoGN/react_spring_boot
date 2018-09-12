// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';

class Funcionario extends React.Component {

  constructor() {
    super();
     
    this.state = {
        funcionarios: []
    } 
   }

   componentDidMount() {
    axios.get('http://localhost:8080/funcionario')
        .then(response => { 
          console.log(response.data)
          this.setState({
              funcionarios: response.data
          });
        })
          .catch(error => console.log(error.response));
   }

   renderFuncionario(funcionario){
     return <li>{funcionario.nome}</li>
   }

   

  render() {
    return (
      <Row>
      <Col m={8} s={12}>
          <h5>Funcionários</h5>
          <Card>
          <div>
              <h1>Funcionários</h1>
              <ul>
              {this.state.funcionarios.map(this.renderFuncionario)}
              </ul>
           </div>
          </Card>
      </Col>
    </Row>
    );
  }
}

export default Funcionario;