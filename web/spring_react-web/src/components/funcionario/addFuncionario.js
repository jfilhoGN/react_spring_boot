// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row,Col, Card, Input, Button} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';
//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class AddFuncionario extends React.Component{

    state = {
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        hasFuncionario: false,
        open: false,
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
            senha: this.state.senha,   
        },)
        .then(res => {
            this.setState({hasFuncionario: true});
            console.log(res);
            console.log(res.data)
        })
        .catch(function (error) {
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });

    };

    render(){
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
                        <Button onClick={this.handleClickOpen} color="primary">
                        Sim
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                        Não
                        </Button>
                    </DialogActions>
                    </Dialog>
                </div>
            )
        }
        if (this.state.open.valueOf) {
            return(
                <Card>
                    <Row>
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <Input id="nome" name="nome" onChange={this.handleNomeChange} type="text" s={12} label="Nome" />
                            <Input id="email" name="email" onChange={this.handleEmailChange} placeholder="14-811.00" type="text" label="Email" s={12} />
                            <Input id="cpf" name="cpf" onChange={this.handleCPFChange} placeholder="Rua Duque, 123" type="text" label="CPF" s={12} />
                            <Input id="senha" name="senha" onChange={this.handleSenhaChange} placeholder="123mudar" type="text" label="Senha" s={12} />
                        <Col s={12} m={12}>
                        <Button onClick={this.handleClickOpen} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                            <i className="material-icons">add</i>
                        </Button>
                         </Col>
                        </form>  
                    </Row>
              </Card>
            )
        }
       
    }
}

export default AddFuncionario;