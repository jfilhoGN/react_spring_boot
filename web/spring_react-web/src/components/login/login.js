import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      isAuth: false,
      redirectToPreviousRoute: false
    };
  }

  acceptFuncionario = (id, token) =>{
    const json = {id:id, token:token};
    sessionStorage.setItem("data", JSON.stringify(json));
    
    this.props.history.push('/tarefas')
    
    
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }
  handleChangeSenha = event => {
    this.setState({senha: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post("/api/colaboradores/auth", { 
      email:this.state.email, 
      senha:this.state.senha,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.status === 200 ) {
        this.acceptFuncionario(response.data.id,response.data.token);
      }
    })
    .catch((error) => {
      if (error.response.status === 500){
        return window.confirm("Erro no banco de dados");
      }
      if (error.response.status === 401){
        return window.confirm("Usuário ou senha não cadastrado");
      }
    })
  }

  //Button de adicionar funcionário
  addClick = () =>{
    this.props.history.push('/addfuncionario')
  }

  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit} className="formLogin">
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              //value={this.state.email}
              onChange={this.handleChangeEmail}/>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Senha</ControlLabel>
            <FormControl
              //value={this.state.password}
              onChange={this.handleChangeSenha}
              type="password"/>
          </FormGroup>
          <Button
            className="blue darken-2"
            block
            bsSize="large"
            type="submit"
            onClick={this.handleSubmit}>
            Login
          </Button>
          <br></br>
          <Button
            className="blue darken-2"
            bsSize="large"
            type="submit"
            onClick={() => this.addClick()}>
            Criar Conta
          </Button>
        </form>
      </div>
    );
  }
}


export default Login;