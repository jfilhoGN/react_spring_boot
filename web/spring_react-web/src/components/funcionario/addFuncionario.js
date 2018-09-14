// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row,Col, Card, Button, Input, Icon} from 'react-materialize';
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
        id: '',
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        hasFuncionario: false,
        hasEdit : false
    };

    /* Adicionar funcionário */
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
    
    /* Rota para usuário visualizar funcionários cadastrados, click em não
    no Dialog de adicionar funcionário */
    handleReturnFuncionario = () => {
        this.props.history.goBack();
    }

    /* Seta o estado inicial para o usuário cadastrar novo funcionário
    clica em sim no Dialog de adicionar funcionário */
    handleReturnAddFuncionario = () =>{
        this.setState({id: '',
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        hasFuncionario: false,
        hasEdit : false})
    }
    
    handleClose = () => {
        this.setState({ open: false });

    };

    //Atualizar funcionário
    handleUpdate = (state) => {
        axios.put("http://192.168.0.255:8080/api/colaboradores/", {
            body: JSON.stringify(state),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params)
        if (params.funcionarioId) {
            axios.get(`http://192.168.0.255:8080/api/colaboradores/${params.funcionarioId}`)
          .then(({ data: user }) => {
              console.log(user)
            this.setState({ nome:user.nome, email:user.email, cpf:user.cpf, senha:user.senha, hasEdit:true });
          });
        }
        
    }


    render(){
        //Condição para quando é cadastrado um usuário, pergunta se quer cadastrar outro.
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
        /* Condição para quando é clicado em editar funcionário, neste form não é apresentado
        CPF e senha */
        if(this.state.hasEdit){
            return(
                <Card>
                    <Row>
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <Input id="nome" name="nome" value={this.state.nome} onChange={this.handleNomeChange} placeholder="John Doe" type="text" label="Nome" s={12}><Icon small>person</Icon></Input>
                            <Input id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="johndoe@john.com" type="text" label="Email" s={12} ><Icon small>email</Icon></Input>
                            <Input id="cpf" name="cpf" value={this.state.cpf} onChange={this.handleCPFChange} placeholder="111.111.111-11" type="text" label="CPF" s={12} ><Icon small>assignment_ind</Icon></Input>
                        <Col s={12} m={12}>
                        <Button onClick={this.handleUpdate(this.state)} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                            <i className="material-icons">update</i>
                        </Button>
                         </Col>
                        </form>  
                    </Row>
              </Card>
            )
        }
        //Render principal
        return(
                <Card>
                    <Row>
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <Input id="nome" name="nome"  onChange={this.handleNomeChange} placeholder="John Doe" type="text" label="Nome" s={12}><Icon small>person</Icon></Input>
                            <Input id="email" name="email"  onChange={this.handleEmailChange} placeholder="johndoe@john.com" type="text" label="Email" s={12} ><Icon small>email</Icon></Input>
                            <Input id="cpf" name="cpf"  onChange={this.handleCPFChange} placeholder="111.111.111-11" type="text" label="CPF" s={12} ><Icon small>assignment_ind</Icon></Input>
                            <Input id="senha" name="senha" onChange={this.handleSenhaChange} placeholder="123mudar" type="text" label="Senha" s={12} ><Icon small>lock</Icon></Input>
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

export default AddFuncionario;