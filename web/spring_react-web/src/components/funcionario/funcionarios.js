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
     return (
       <li class="collection-item"><b>Nome:</b> {funcionario.nome}
            <p>
            <b>RG:</b> {funcionario.rg}
            <br></br>
            <b>Endereço:</b> {funcionario.endereco}
            </p>
            <button class="btn waves-effect waves-light btn-small" type="submit" name="action">
              <i class="material-icons">delete</i>
            </button>
        </li>
      )
   }

  handleInputChange = () => {
    this.setState({
      // Fazer a query
      //query: this.search.value
    })
  }
   

  render() {
    return (
      <Row>
      <Col m={8} s={12}>
          <h5>Funcionários</h5>
          <Card>
          <form>
            <input
              placeholder="Buscar por..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            <p>{this.state.query}</p>
          </form>
          <div>
              <ul class="collection">
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