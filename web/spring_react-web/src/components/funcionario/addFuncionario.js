// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';

class AddFuncionario extends React.Component{

    state = {
        nome: '',
        rg: '',
        endereco: '',
    };

    handleNomeChange = event => {this.setState({nome: event.target.value})}
    handleRgChange = event => {this.setState({rg: event.target.value})}
    handleEnderecoChange = event => {this.setState({endereco: event.target.value})}

    handleSubmit = event =>{
        event.preventDefault();
        
        axios.post("http://localhost:8080/addfuncionario", 
        { nome: this.state.nome, 
            rg: this.state.rg,
            endereco: this.state.endereco     
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
                        <Input id="rg" name="rg" onChange={this.handleRgChange} placeholder="14-811.00" type="text" label="RG" s={12} />
                        <Input id="endereco" name="endereco" onChange={this.handleEnderecoChange} placeholder="Rua Duque, 123" type="text" label="Endereço" s={12} />
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