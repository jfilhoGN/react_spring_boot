// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';

class Funcionario extends React.Component {

  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this)
    this.renderFuncionario = this.renderFuncionario.bind(this);
    this.state = {
        funcionarios: [],
        hasError: false,
        edit: false,
    }

  }

  componentDidMount() {
  axios.get('http://192.168.0.255:8080/api/colaboradores')
      .then(response => { 
        this.setState({
            funcionarios: response.data,
            //isLoading: true
        });
      })
      .catch(error => {
          if (error.response.status === 404) {
            this.setState({ hasError: true });
          } 
      });
  }

  handleInputChange = () => {
    this.setState({
      // Fazer a query
      //query: this.search.value
    })
  }

  deleteClick = (id) => {
    const url = 'http://192.168.0.255:8080/api/colaboradores';
    axios.delete(`${url}/${id}`);
    return this.componentDidMount();
  }

  editClick = (id) =>{
    const url = 'http://192.168.0.255:8080/api/colaboradores';
    axios.get(`${url}/${id}`)
      .then(response => { 
        this.setState({
            funcionarios: response.data,
            edit: true
        });
      })
      .catch(error => {
          console.log(error);
      });
  }


  renderFuncionario(funcionario) {
    return (
      <li key={funcionario.id} className="collection-item">
          <b>Nome:</b> {funcionario.nome}
          <p>
          <b>Email:</b> {funcionario.email}
          <br></br>
          <b>CPF:</b> {funcionario.cpf}
          </p>
          <button onClick={() => this.deleteClick(funcionario.id)} className="btn waves-effect waves-light btn-small" type="submit" name="actionDelete">
            <i className="material-icons">delete</i>
          </button>
          <button onClick={() => this.editClick(funcionario.id)} className="btn waves-effect waves-light btn-small" type="submit" name="actionEdit">
            <i className="material-icons">edit</i>
          </button>
      </li>
    )
  }

  render() {
    if (this.state.hasError) {
      return (
        <Row>
        <Card>
        <p><b>Não possui Funcionários cadastrados</b></p>
        </Card>
        </Row>
      )
    }
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
              <ul className="collection">
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