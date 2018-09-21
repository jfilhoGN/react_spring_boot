// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card, Col, Button, Collection, CollectionItem, Icon } from 'react-materialize';
import axios from 'axios';

class Tarefas extends React.Component {

    constructor() {
        super();
        this.state = {
            tarefas: [],
            hasError: false
        }
        this.arrayTodo = [];
        this.arrayholder = [];
        this.arrayDoing = [];
        this.arrayTest = [];
    }

    // criar adicionar tarefas
    clickAddTarefa = () =>{
        this.props.history.push('/addtarefas');
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    
    componentDidMount(){ 
        this.getTarefas();
    }

    // listar todas as tarefas
    getTarefas = () =>{
        const url = '/api/tarefas';
        const {id, token} = this.getFuncionario();
        axios.get(url,{
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
                    if(error.response.status === 500){
                        window.confirm("Falha no banco de dados");
                    }
                    if(error.response.status === 404){
                        this.setState({ hasError: true , loading:false});
                    }
                } 
            });

    }


    // excluir tarefa
    deleteClick = (idTarefa) => {
        const {id,token} = this.getFuncionario();
        //console.log(token);
        const url = '/api/tarefas';
        axios.delete(`${url}/${idTarefa}`,{
            headers:{
                'id':id,
                'token':token
            }
        })
        .then(response => { 
            return this.getTarefas();
        })
        // dar o refresh
    }

    // editar tarefa
    editClick = (tarefaId) =>{
        this.props.history.push(`/addtarefas/${tarefaId}`)
    }


    // selecionar tarefas
    searchFilterFunction = text => {
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.titulo.toUpperCase()}`; 
          const textData = text.target.value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({tarefas: newData}); 
      } 

    changeStatus = (status) =>{
        const labels = {
            1: 'Fazer',
            2: 'Fazendo',
            4: 'Em teste',
            5: 'Concluido'
        };
        return labels[status];
    }

    renderTarefaStatus = (tarefa) =>{
        //console.log(tarefa)
        if (tarefa.status===1) {
            this.arrayTodo = tarefa;
            console.log(this.arrayTodo);
            return this.renderTarefas(this.arrayTodo);
        }
        if (tarefa.status===2) {
            this.arrayDoing = tarefa;
            return this.renderTarefas(this.arrayDoing);
        }
        if (tarefa.status===4) {
            this.arrayTest = tarefa;
            return this.renderTarefas(this.arrayTest);
        }
    }

    renderTarefas = (tarefa) => {
            return (
                <CollectionItem key={tarefa.id} className="collection-item" >
                    <Icon small>label</Icon> {tarefa.codigo} 
                    <br/>
                    <Icon small>title</Icon> {tarefa.titulo}
                    <p>
                    <Icon small>description</Icon> {tarefa.descricao}
                    <br></br>
                    <Icon small>code</Icon> {this.changeStatus(tarefa.status)}
                    </p>
                    <button onClick={() => this.deleteClick(tarefa.id)} className="button-espaco btn waves-effect waves-light btn-small blue darken-2 btn-small" type="submit" name="actionDelete">
                      <i className="material-icons">delete</i>
                    </button>
                    <button onClick={() => this.editClick(tarefa.id)} className="btn button-espaco waves-effect waves-light btn-small blue darken-2 btn-small" type="submit" name="actionEdit">
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
              <Button onClick={() => this.clickAddTarefa()} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                    <i className="material-icons">add</i>
                </Button>
                <p></p>
              <p><b>Não possui Tarefas cadastrados</b></p>
              </Card>
              </Row>
            )
          }
        return (
            <Card >
                <Row>
                    <Button onClick={() => this.clickAddTarefa()} className="btn waves-effect waves-light btn-small blue darken-2" type="submit" name="action">
                        <i className="material-icons">add</i>
                    </Button>
                    <div>
                        <form>
                            <input
                            onChange={text => this.searchFilterFunction(text)}
                            placeholder="procurar tarefa..." />
                        </form>
                    </div>

                    <h3><center>Tarefas</center></h3>
                    <Col m={3} s={3} className="blue lighten-2">
                    <center><p><b>Fazer</b></p></center>    
                        <Collection className="collection">
                            {this.state.tarefas.map(this.renderTarefaStatus)}
                        </Collection>
                    </Col>

                    <Col m={3} s={3} className="blue lighten-2">
                    <center><p><b>Fazendo</b></p></center>    
                        <Collection className="collection">
                            {this.state.tarefas.map(this.renderTarefaStatus)}
                        </Collection>
                    </Col>
                    
                </Row>
            </Card>
        );
    }
}

export default Tarefas;