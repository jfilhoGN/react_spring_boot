// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card, Input, Icon, Col, Button } from 'react-materialize';
import Select from 'react-select';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const status = [
    { label: "Fazer", value: 1 },
    { label: "Fazendo", value: 2 },
    { label: "Code Review", value: 3 },
    { label: "Em Teste", value: 4 },
    { label: "Feito", value: 5 },
  ];

class AddTarefas extends React.Component {

    constructor() {
        super();
        this.state = {
            titulo: '',
            descricao: '',
            status: '',
            hasTarefas: false
        }
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = localStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    // Adicionar Tarefa
    handleTituloTarefa = event => {this.setState({titulo: event.target.value})};
    handleDescricaoTarefa = event => {this.setState({descricao: event.target.value})};
    handleStatusTarefa = event => {
        console.log(event.value)
        this.setState({status: event.value})};
    
    //falta terminar a adicão de tarefas, pegar a url correta
    handleSubmitTarefa = event =>{
        event.preventDefault();
        const {id, token} = this.getFuncionario();
        axios.post("/api/tarefas/", 
        { titulo: this.state.titulo, 
            descricao: this.state.descricao,
            colaboradorId: id,
            status: this.state.status,
            
        },{
            headers:{
                'id':id,
                'token':token
            }  
        })
        .then(res => {
            //this.setState({hasTarefas: true});
            console.log(res);
            console.log(res.data)
        })
        .catch(function (error) {
        })
    }
    
    render() {
        if (this.state.hasFuncionario) {
            return (
                <div>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Funcionário Cadastrado"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deseja cadastrar novo funcionário?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleReturnAddFuncionario} color="primary">
                        Sim
                        </Button>
                        <Button onClick={this.handleReturnFuncionario} color="primary" autoFocus>
                        Não
                        </Button>
                    </DialogActions>
                    </Dialog>
                </div>
            )
        }
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