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
    };

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    componentDidMount() {
        const {id,token} = this.getFuncionario();
        if (id) {
            axios.get(`/api/colaboradores/${id}`,{
                headers:{
                    'id':id,
                    'token':token
                }
            })
          .then(({ data: funcionario }) => {
              console.log(funcionario)
            this.setState({ nome:funcionario.nome, email:funcionario.email, cpf:funcionario.cpf, senha:funcionario.senha, hasEdit:true });
          });
        }
        
    }

  render() {
    return (
        <Card>
            <Row>
            <Col>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <Input id="nome" name="nome"  value={this.state.nome} type="text" label="Nome" s={12}><Icon small>person</Icon></Input>
                    <Input id="email" name="email" value={this.state.email} type="text" label="Email" s={12} ><Icon small>email</Icon></Input>
                    <Input id="cpf" name="cpf"  value={this.state.cpf} type="text" label="CPF" s={12} ><Icon small>assignment_ind</Icon></Input>
                    <Input id="senha" name="senha" value={this.state.senha}  type="password" label="Senha" s={12} ><Icon small>lock</Icon></Input>
                <Button onClick={this.handleClickOpen} className="blue darken-2 btn-small" type="submit" name="action">
                    <i className="material-icons">update</i>
                </Button>
                </form>
                </Col>  
            </Row>
            <Row>
                <h4><center>Tarefas</center></h4>
                <center><p><b>Realizando:</b></p></center>
                <center><p><b>em Code Review:</b></p></center>
                <center><p><b>em Teste:</b></p></center>
                <center><p><b>Concluido:</b></p></center>
            </Row>
        </Card>
    );
  }
}

export default Funcionario;