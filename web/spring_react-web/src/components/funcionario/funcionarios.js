// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Icon, CollectionItem} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';
import Collection from "react-materialize/lib/Collection";

class Funcionario extends React.Component {
  /* Construtor da classe que possui os estados */
  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this)
    this.renderFuncionario = this.renderFuncionario.bind(this);
    this.state = {
        funcionarios: [],
        hasError: false,
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
    this.props.history.push(`/addfuncionario/${id}`)
  }


  renderFuncionario(funcionario) {
    return (
      <CollectionItem key={funcionario.id} className="collection-item" >
          <Icon small>person</Icon> {funcionario.nome}
          <p>
          <Icon small>email</Icon> {funcionario.email}
          <br></br>
          <Icon small>assignment_ind</Icon> {funcionario.cpf}
          </p>
          <button onClick={() => this.deleteClick(funcionario.id)} className="btn waves-effect waves-light btn-small" type="submit" name="actionDelete">
            <i className="material-icons">delete</i>
          </button>
          <button onClick={() => this.editClick(funcionario.id)} className="btn waves-effect waves-light btn-small" type="submit" name="actionEdit">
            <i className="material-icons">edit</i>
          </button>
      </CollectionItem>
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
              <Collection className="collection" header="Funcionários">
              {this.state.funcionarios.map(this.renderFuncionario)}
              </Collection>
           </div>
          </Card>
      </Col>
    </Row>
    );
  }
}

export default Funcionario;