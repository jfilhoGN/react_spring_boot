// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';

class AddFuncionario extends React.Component{

    state = {
        nome: '',
        email: '',
        cpf: '',
        senha: '',
    };

    handleNomeChange = event => {this.setState({nome: event.target.value})}
    handleEmailChange = event => {this.setState({email: event.target.value})}
    handleCPFChange = event => {this.setState({cpf: event.target.value})}
    handleSenhaChange = event => {this.setState({senha: event.target.value})}

    handleSubmit = event =>{
        event.preventDefault();
        
        axios.post("http://192.168.0.255:8080/api/colaboradores/", 
        { nome: this.state.nome, 
            email: this.state.email,
            cpf: this.state.cpf,
            senha: this.state.senha    
        },)
        .then(res => {
            console.log(res);
            console.log(res.data)
        })
        .catch(function (error) {
        })
    }

    render(){
        return(
            <Card>
                <Row>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <Input id="nome" name="nome" onChange={this.handleNomeChange} type="text" s={12} label="Nome" />
                        <Input id="email" name="email" onChange={this.handleEmailChange} placeholder="14-811.00" type="text" label="Email" s={12} />
                        <Input id="cpf" name="cpf" onChange={this.handleCPFChange} placeholder="Rua Duque, 123" type="text" label="CPF" s={12} />
                        <Input id="senha" name="senha" onChange={this.handleSenhaChange} placeholder="123mudar" type="text" label="Senha" s={12} />
                    <Col s={12} m={12}>
                    <Button className="btn waves-effect waves-light btn-small" type="submit" name="action">
                        <i className="material-icons">add</i>
                    </Button>
                     </Col>
                    </form>  
                </Row>
          </Card>
        )
       
    }
}

export default AddFuncionario;