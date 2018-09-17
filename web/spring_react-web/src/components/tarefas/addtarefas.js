// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card, Input, Icon, Col, Button } from 'react-materialize';
import Select from 'react-select';
import axios from 'axios';

const status = [
    { label: "Fazer", value: 1 },
    { label: "Fazendo", value: 2 },
    { label: "Code Review", value: 3 },
    { label: "Em Teste", value: 4 },
    { label: "Feito", value: 5 },
  ];

class AddTarefas extends React.Component {

    state = {
        titulo: '',
        descricao: '',
        status: ''
    };

    // Adicionar Tarefa
    handleTituloTarefa = event => {this.setState({titulo: event.target.value})};
    handleDescricaoTarefa = event => {this.setState({descricao: event.target.value})};
    handleStatusTarefa = event => {this.setState({status: event.target.value})};
    
    //falta terminar a adicão de tarefas, pegar a url correta
    handleSubmitTarefa = event =>{
        event.preventDefault();
        axios.post("/api/colaboradores/", 
        { titulo: this.state.titulo, 
            descricao: this.state.descricao,
            status: this.state.status   
        },)
        .then(res => {
            //this.setState({hasFuncionario: true});
            console.log(res);
            console.log(res.data)
        })
        .catch(function (error) {
        })
    }
    

    render() {
        //titulo, descrição, status (dropdow)
        return (
            <Card>
                <Row>
                    <form className="col s12" onSubmit={this.handleSubmitTarefa}>
                        <Input id="titulo" name="titulo"  onChange={this.handleTituloTarefa} placeholder="Arrumar Cadastro" type="text" label="Título" s={12}><Icon small>title</Icon></Input>
                        <Input id="descricao" name="descricao"  onChange={this.handleDescricaoTarefa} placeholder="criar um campo com cores" type="text" label="Descrição" s={12} ><Icon small>description</Icon></Input>
                        <Col s={12} m={12}>
                        <Select placeholder="status da tarefa" options={status} onChange={this.handleStatusTarefa} s={12}><Icon small>code</Icon></Select> 
                        <br></br>
                    </Col>
                    <Button onClick={this.handAddClick} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                        <i className="material-icons">add</i>
                    </Button>
                    </form>  
                </Row>
            </Card>
        );
  }
}

export default AddTarefas;