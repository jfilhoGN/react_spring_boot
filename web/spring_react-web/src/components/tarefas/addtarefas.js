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
            hasTarefas: false,
            hasEdit: false,
            open: false
        }
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    // Adicionar Tarefa
    handleTituloTarefa = event => {this.setState({titulo: event.target.value})};
    handleDescricaoTarefa = event => {this.setState({descricao: event.target.value})};
    handleStatusTarefa = event => {this.setState({status: event.value})};
    
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
            this.setState({hasTarefas: true});
            //console.log(res);
            //console.log(res.data)
        })
        .catch(function (error) {
        })
    }


    componentDidMount() {
        this.getDados();
    }

    getDados = () =>{
        const { match: { params } } = this.props;
        const {id, token} = this.getFuncionario();
        const url = '/api/tarefas';
        if (params.tarefaId) {
            axios.get(`${url}/${params.tarefaId}`,{
                headers:{
                    'id':id,
                    'token':token
                }
            })
            .then(({ data: tarefa }) => {
              //console.log(tarefa)
            this.setState({id:params.tarefaId, titulo:tarefa.titulo, descricao:tarefa.descricao, status:tarefa.status, hasEdit:true});
          });
        }
    }


    //Atualizar Tarefa
    handleUpdate = () => {
        const {id, token} = this.getFuncionario();
        const url = '/api/tarefas';
        axios.put(url, {
            id: this.state.id, 
            titulo: this.state.titulo, 
            descricao: this.state.descricao,
            status: this.state.status,
        },{
            headers:{
                'id':id,
                'token':token
            }  
        })
        .then(function (response) {
            return this.getDados();
            //console.log(response)
        })
        .catch(function (error) {
        })
    }


    /* Rota para usuário visualizar tarefas cadastrados, click em não
    no Dialog de adicionar tarefa */
    handleReturnTarefa = () => {
        this.props.history.goBack();
    }

    /* Seta o estado inicial para o funcionário cadastrar nova tarefa
    clica em sim no Dialog de adicionar funcionário */
    handleReturnAddTarefa = () =>{
        this.setState({id: '',
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        hasTarefas: false,
        hasEdit : false})
    }

    handleClickOpen = () => {
        this.setState({ open: true });
        
    };

    render() {
        if (this.state.hasTarefas) {
            return (
                <div>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Tarefa Cadastrada"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deseja cadastrar nova tarefa?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleReturnAddTarefa} color="primary">
                        Sim
                        </Button>
                        <Button onClick={this.handleReturnTarefa} color="primary" autoFocus>
                        Não
                        </Button>
                    </DialogActions>
                    </Dialog>
                </div>
            )
        }
        if(this.state.hasEdit){
            return (
                <Card>
                    <Row>
                        <form className="col s12" >
                            <Input id="titulo" name="titulo" value={this.state.titulo} onChange={this.handleTituloTarefa} placeholder="Arrumar Cadastro" type="text" label="Título" s={12}><Icon small>title</Icon></Input>
                            <Input id="descricao" name="descricao" value={this.state.descricao}  onChange={this.handleDescricaoTarefa} placeholder="criar um campo com cores" type="text" label="Descrição" s={12} ><Icon small>description</Icon></Input>
                            <Col s={12} m={12}>
                            <Select placeholder="status da tarefa" options={status} onChange={this.handleStatusTarefa} s={12}></Select> 
                            <br></br>
                        </Col>
                        <Button onClick={this.handleUpdate} className="btn-small blue darken-2" type="submit" name="action">
                            <i className="material-icons">update</i>
                        </Button>
                        </form>  
                    </Row>
                </Card>
            );
        }
        //titulo, descrição, status (dropdow)
        return (
            <Card>
                <Row>
                    <form className="col s12" onSubmit={this.handleSubmitTarefa}>
                        <Input id="titulo" name="titulo"  onChange={this.handleTituloTarefa} placeholder="Arrumar Cadastro" type="text" label="Título" s={12}><Icon small>title</Icon></Input>
                        <Input id="descricao" name="descricao" onChange={this.handleDescricaoTarefa} placeholder="criar um campo com cores" type="text" label="Descrição" s={12} ><Icon small>description</Icon></Input>
                        <Col s={12} m={12}>
                        <Select placeholder="Status da Tarefa" options={status} onChange={this.handleStatusTarefa} s={12}></Select> 
                        <br></br>
                    </Col>
                    <Button onClick={this.handleClickOpen} className="btn-espaco btn-small blue darken-2" type="submit" name="action">
                        <i className="material-icons">add</i>
                    </Button>
                    </form>  
                </Row>
            </Card>
        );
    }
}

export default AddTarefas;