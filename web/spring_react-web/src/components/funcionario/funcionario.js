import React, { Component } from 'react';
import { Row, Input, Icon, Col, Button, Card } from 'react-materialize';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import logo from './logo.svg';

/* Classe principal do react-js 
 */
class Funcionario extends Component {

    state = {
        id: '',
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        changeSenha: false,
        open: true,
        senhaAtual: '',
        newSenha: '',
        confSenha: '',
        TODO:'',
        DOING: '',
        CODE: '',
        TEST: '',
        DONE: ''
    };

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    componentDidMount() {
        const {id,token} = this.getFuncionario();
        if (id) {
            axios.get('/api/colaboradores/me',{
                headers:{
                    'id':id,
                    'token':token
                }
            })
            .then(({ data: funcionario }) => {
                //console.log(funcionario)
                this.setState({id:funcionario.id, nome:funcionario.nome, email:funcionario.email, cpf:funcionario.cpf, senha:funcionario.senha, hasEdit:true });
            });

            // get para pegar as estatisticas
            axios.get('/api/tarefas/getEstatisticas',{
                headers:{
                    'id':id,
                    'token':token
                }
            })
            .then(({ data: estatisticasTarefas }) => {
                console.log(estatisticasTarefas);
                this.setState({TODO:estatisticasTarefas.c1, DOING: estatisticasTarefas.c2, CODE: estatisticasTarefas.c3, TEST: estatisticasTarefas.c4, DONE: estatisticasTarefas.c5});
            });

        }

        
    }

    changeNome = event => {this.setState({nome: event.target.value})};
    changeEmail = event => {this.setState({email: event.target.value})};
    changeCpf = event => {this.setState({senha: event.target.value})};

    handleUpdate = () =>{
        const {id,token} = this.getFuncionario();
        const url = '/api/colaboradores';
        console.log(this.state.nome);
        axios.put(url, { 
            nome: this.state.nome,
            id:this.state.id, 
            email: this.state.email,
            cpf: this.state.cpf,
            senha: this.state.senha
            
        },{
            headers:{
                'id':id,
                'token':token
            }  
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
        })
        return this.props.history.push('/account');
    }

    newSenha = () =>{
        this.setState({changeSenha:true, open:true});
    }

    oldSenha = event => {
        this.setState({senhaAtual:event.target.value});
    }

    novaSenha = event => { 
        this.setState({newSenha:event.target.value});
    }

    confirmSenha = event => {
        this.setState({confSenha: event.target.value})
    }

    sendSenha = (newSenha) => {
        const {id,token} = this.getFuncionario();
        axios.post("/api/colaboradores/updateSenha", 
        { 
            senhaAntiga:this.state.senhaAtual,
            novaSenha: newSenha
            
        },{
            headers:{
                'id':id,
                'token':token
            }  
        })
        .then(res => {
            //this.setState({hasTarefas: true});
            console.log(res);
            //console.log(res.data)
        })
    }

    submitSenha = (event) =>{
        event.preventDefault();
        const {newSenha, confSenha} = this.state;
        if (newSenha === confSenha) {
            alert("São iguais")
            return this.sendSenha(newSenha);
        }
        else{
            alert("Não são iguais");
        } 
    }


  render() {
    if (this.state.changeSenha) {
        return (
            <div>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Cadastrar nova senha"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form onSubmit={this.submitSenha}>
                                <Input id="oldSenha" name="oldSenha" onChange={this.oldSenha} type="password" label="Senha Antiga" s={12}/>
                                <Input id="newSenha" name="newSenha" onChange={this.novaSenha} type="password" label="Nova Senha" s={12}/>
                                <Input id="confirmSenha" name="confirmSenha" onChange={this.confirmSenha} type="password" label="Confirmar nova senha" s={12}/>
                            </form>
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
    return (
        <Card>
            <Row>
            <Col>
                <form className="col s12">
                    <Input id="nome" name="nome" placeholder="teste" value={this.state.nome} onChange={this.changeNome} type="text" label="Nome" s={12}><Icon small>person</Icon></Input>
                    <Input id="email" name="email" placeholder="teste" value={this.state.email} onChange={this.changeEmail} type="text" label="Email" s={12} ><Icon small>email</Icon></Input>
                    <Input id="cpf" name="cpf" placeholder="teste" value={this.state.cpf} type="text" onChange={this.changeCpf} label="CPF" s={12} ><Icon small>assignment_ind</Icon></Input>
                <Button onClick={this.handleUpdate} className="blue darken-2 btn-small" type="submit" name="action">
                    <i className="material-icons">update</i>
                </Button>

                <Button onClick={this.newSenha} title="mudar senha" className="blue darken-2 btn-small" type="submit" name="action">
                    <i className="material-icons">lock_open</i>
                </Button>

                </form>
                </Col>  
            </Row>
            <Row>
                <h4><center>Tarefas</center></h4>
                <center><p><b>Para Realizar: </b> {this.state.TODO} </p></center>
                <center><p><b>Realizando: </b> {this.state.DOING} </p></center>
                <center><p><b>em Code Review: </b> {this.state.CODE}</p></center>
                <center><p><b>em Teste: </b> {this.state.TEST}</p></center>
                <center><p><b>Concluido: </b> {this.state.DONE}</p></center>
            </Row>
        </Card>
    );
  }
}

export default Funcionario;