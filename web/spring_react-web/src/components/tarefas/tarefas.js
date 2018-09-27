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
            hasError: false,
            tarefasTodo: [],
            tarefasDoing: [],
            tarefasTest: [],
            tarefasDone: [],
            tarefasSearch: [] 
        }
        this.arrayholder = [];
        //this.arrayTodo = [];
    }

    // criar adicionar tarefas
    clickAddTarefa = () =>{
        this.props.history.push('/addtarefas');
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        if(!handleStorage){
            window.confirm("Você não está logado");
            return this.props.history.goBack();
        }
        else{
            return JSON.parse(handleStorage);
        }
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
                const tarefas = response.data
                this.setState({
                    tarefas: response.data,
                    tarefasTodo: tarefas.filter(tarefa => tarefa.status === 1),
                    tarefasDoing: tarefas.filter(tarefa => tarefa.status===2),
                    tarefasTest: tarefas.filter(tarefa => tarefa.status===4),
                    tarefasDone: tarefas.filter(tarefa => tarefa.status===5),
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
            if(textData.length === 0){
                return false;
            }
            return itemData.includes(textData);
        });
        this.setState({tarefasSearch: newData}); 
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

    renderTarefas = (tarefa) => {
        return (
            <CollectionItem key={tarefa.id} className="collection-item" >
                <Icon small>title</Icon> {tarefa.titulo}
                <p>
                <Icon small>description</Icon> {tarefa.descricao}
                <br></br>
                <Icon small>code</Icon> {this.changeStatus(tarefa.status)}
                </p>
                <button onClick={() => this.deleteClick(tarefa.id)} title="deletar tarefa" className="button-espaco btn waves-effect waves-light btn-small grey darken-3 btn-small" type="submit" name="actionDelete">
                    <i className="material-icons">delete</i>
                </button>
                <button onClick={() => this.editClick(tarefa.id)} title="editar tarefa" className="btn button-espaco waves-effect waves-light btn-small grey darken-3 btn-small" type="submit" name="actionEdit">
                    <i className="material-icons">edit</i>
                </button>
                
            </CollectionItem>
        )  
           
    }

    render() {
        if (this.state.hasError) {
            return (
              <Row>
              <Card  className="card-tarefas">
              <Button onClick={() => this.clickAddTarefa()} title="adicionar tarefa" className="btn waves-effect waves-light btn-small grey lighten-2" type="submit" name="action">
                    <i className="material-icons">add</i>
                </Button>
                <p></p>
              <p color="white"><b>Não possui Tarefas cadastrados</b></p>
              </Card>
              </Row>
            )
          }
        return (
            <Card className="card-tarefas">
                <Row>
                    <Button onClick={() => this.clickAddTarefa()} title="adicionar tarefa" className="btn waves-effect waves-light btn-small grey" type="submit" name="action">
                        <i className="material-icons">add</i>
                    </Button>
                    <div>
                        <form>
                            <input
                            onChange={text => this.searchFilterFunction(text)}
                            placeholder="procurar tarefa..." />
                        </form>
                    </div>
                

                    <Col m={12} s={3} className="grey darken-3 ">   
                        <Collection className="collection">
                            {this.state.tarefasSearch.map(this.renderTarefas)}
                        </Collection>
                    </Col>

                    <h3 className="h3-tarefas"><center>Tarefas</center></h3>
                    <Col m={3} s={3} className="grey darken-3 ">
                    <center><h4 className="h4-tarefas">Fazer</h4></center>    
                        <Collection className="collection">
                            {this.state.tarefasTodo.map(this.renderTarefas)}
                        </Collection>
                    </Col>

                    <Col m={3} s={3} className="grey darken-3">
                    <center><h4 className="h4-tarefas">Fazendo</h4></center>    
                        <Collection className="collection">
                            {this.state.tarefasDoing.map(this.renderTarefas)}
                        </Collection>
                    </Col>

                    <Col m={3} s={3} className="grey darken-3">
                    <center><h4 className="h4-tarefas">Teste</h4></center>    
                        <Collection className="collection">
                            {this.state.tarefasTest.map(this.renderTarefas)}
                        </Collection>
                    </Col>

                    <Col m={3} s={3} className="grey darken-3">
                    <center><h4 className="h4-tarefas">Concluido</h4></center>    
                        <Collection className="collection">
                            {this.state.tarefasDone.map(this.renderTarefas)}
                        </Collection>
                    </Col>
                    
                </Row>
            </Card>
        );
    }
}

export default Tarefas;