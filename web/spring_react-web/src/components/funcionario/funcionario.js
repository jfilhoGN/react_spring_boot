import React, { Component } from 'react';
import { Row, Input, Icon, Col, Button, Card } from 'react-materialize';
import axios from 'axios';

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
        open: false,
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
        if(!handleStorage){
            window.confirm("Você não está logado");
            return this.props.history.goBack();
        }
        else{
            return JSON.parse(handleStorage);
        }
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
                //console.log(estatisticasTarefas);
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
        //console.log(this.state.nome);
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
        .then(response => {
            console.log(response)
        })
        .catch(function (error) {
        })
        return this.props.history.push('/tarefas');
    }

    buttonChangeSenha = () =>{
        this.props.history.push('/account/changesenha');
    }

    render() {
        return (
            <Card>
                <Row>
                <Col>
                    <form className="col s12">
                        <Input id="nome" name="nome" placeholder="teste" value={this.state.nome} onChange={this.changeNome} type="text" label="Nome" s={12}><Icon small>person</Icon></Input>
                        <Input id="email" name="email" placeholder="teste" value={this.state.email} onChange={this.changeEmail} type="text" label="Email" s={12} ><Icon small>email</Icon></Input>
                        <Input id="cpf" name="cpf" placeholder="teste" value={this.state.cpf} type="text" onChange={this.changeCpf} label="CPF" s={12} ><Icon small>assignment_ind</Icon></Input>
                    <Button onClick={this.handleUpdate} title="atualizar cadastro" className="grey darken-3 btn-small" type="submit" name="action">
                        <i className="material-icons">update</i>
                    </Button>

                    <Button onClick={() => this.buttonChangeSenha()} title="mudar senha" className="button-espaco grey darken-3 btn-small" type="submit" name="action">
                        <i className="material-icons">lock_open</i>
                    </Button>

                    </form>
                    </Col>  
                </Row>
                <Row>
                    <h4><center>Tarefas</center></h4>
                    <center><p><b>Para Realizar: </b> {this.state.TODO} </p></center>
                    <center><p><b>Realizando: </b> {this.state.DOING} </p></center>
                    <center><p><b>em Teste: </b> {this.state.TEST}</p></center>
                    <center><p><b>Concluido: </b> {this.state.DONE}</p></center>
                </Row>
            </Card>
        );
    }
}

export default Funcionario;