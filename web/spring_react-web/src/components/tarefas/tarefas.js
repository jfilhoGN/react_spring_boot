// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card, Col, Button, Collection, CollectionItem, Icon } from 'react-materialize';
import axios from 'axios';

class Tarefas extends React.Component {

    constructor() {
        super();
        this.renderTarefas = this.renderTarefas.bind(this);
        this.state = {
            tarefas: [],
            hasError: false
        }
        
    }

    // criar adicionar tarefas
    clickAddTarefa = () =>{
        this.props.history.push('/addtarefas');
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = localStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    // listar todas as tarefas
    componentDidMount(){ 
        const url = '/api/tarefas';
        const {id, token} = this.getFuncionario();
        axios.get(`${url}/${id}`,{
            headers:{
                'id':id,
                'token':token
            }
        })
            .then(response => { 
                this.setState({
                    tarefas: response.data,
                    //isLoading: true
                });
                this.arrayholder = response.data;
            })
            .catch(error => {
                if (error.response) {
                    if(error.response.status === 404){
                    this.setState({ hasError: true , loading:false});
                    }
                } 
            });
    }

    // excluir tarefa
    deleteClick = (id) => {
        const url = '/api/tarefas';
        axios.delete(`${url}/${id}`);
        return this.componentDidMount();
    }

    renderTarefas(tarefa) {
        return (
          <CollectionItem key={tarefa.id} className="collection-item" >
              <Icon small>title</Icon> {tarefa.titulo}
              <p>
              <Icon small>description</Icon> {tarefa.descricao}
              <br></br>
              <Icon small>code</Icon> {tarefa.status}
              </p>
              <button onClick={() => this.deleteClick(tarefa.id)} className="btn waves-effect waves-light btn-small" type="submit" name="actionDelete">
                <i className="material-icons">delete</i>
              </button>
              <button className="btn waves-effect waves-light btn-small" type="submit" name="actionEdit">
                <i className="material-icons">edit</i>
              </button>
          </CollectionItem>
        )
    }

    // editar tarefa

    // selecionar tarefas


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
                <Button onClick={() => this.clickAddTarefa()} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                    <i className="material-icons">add</i>
                </Button>
                <div>
                <form>
                    <input
                    onChange={text => this.searchFilterFunction(text)}
                    placeholder="procurar tarefa" />
                </form>
                <Collection className="collection" header="Tarefas">
                    {this.state.tarefas.map(this.renderTarefas)}
                </Collection>
                </div>
                </Card>
            </Col>
        </Row>
        );
    }
}

export default Tarefas;