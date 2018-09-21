import React, { Component } from 'react';
import { Row, Input, Col, Button, Card } from 'react-materialize';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class ChangeSenhaFuncionario extends Component {

    state = {
        senhaAtual: '',
        novaSenha: '',
        confirmSenha: '',
        open: false
    }

    // get id e token do funcionario
    getFuncionario = () => {
        const handleStorage = sessionStorage.getItem('data');
        return JSON.parse(handleStorage);
    }

    antigSenha = event => {this.setState({senhaAtual:event.target.value})};
    novaSenha = event => {this.setState({novaSenha:event.target.value})};
    confirmSenha = event => {this.setState({confirmSenha:event.target.value})}

    submitSenha = event =>{
        event.preventDefault();
        const {novaSenha, confirmSenha} = this.state;
        if (novaSenha === confirmSenha) {
            //alert("São iguais")
            return this.sendSenha();
        }
        else{
            alert("Não são iguais");
        } 
    }

    sendSenha = () => {
        const {id,token} = this.getFuncionario();
        axios.post("/api/colaboradores/updateSenha", 
        { 
            senhaAntiga:this.state.senhaAtual,
            senhaNova: this.state.novaSenha
            
        },{
            headers:{
                'id':id,
                'token':token
            }  
        })
        .then(res => {
            //this.setState({hasTarefas: true});
            this.setState({open:true});
            //console.log(res.data)
        })
        .then(error =>{
            console.log(error);
        })
    }

    
    cancelChangeSenha = () => {
        this.props.history.push('/account');
    }

    render() {
        if (this.state.open) {
            return (
                <div>
                    <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Senha Atualizada"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Senha Atualizada
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelChangeSenha} color="primary">
                        OK
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
                <form className="col s13">
                    <Input id="ioldSenha" name="ioldSenha" onChange={this.antigSenha} type="text" label="Senha Antiga" s={12}/>
                    <Input id="inewSenha" name="inewSenha" onChange={this.novaSenha} type="text" label="Nova Senha" s={12}/>
                    <Input id="iconfirmSenha" name="iconfirmSenha" onChange={this.confirmSenha} type="text" label="Confirmar nova senha" s={12}/>
                    <Button onClick={this.submitSenha} className="btn waves-effect waves-light btn-small blue darken-2" type="submit">
                    <i className="material-icons">update</i>
                    </Button>
                    <Button onClick={this.cancelChangeSenha} className="btn waves-effect waves-light btn-small blue darken-2" type="submit">
                    <i className="material-icons">close</i>
                    </Button>
                </form>
            </Col>  
            </Row>
            </Card>
        )
    }



}

export default ChangeSenhaFuncionario;