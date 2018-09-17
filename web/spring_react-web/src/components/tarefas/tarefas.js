// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card, Col, Button, Collection } from 'react-materialize';

class Tarefas extends React.Component {

    constructor() {
        super();
        this.state = {
            tarefas: [],
        }
    }

    // criar adicionar tarefas
    clickAddTarefa = () =>{
        this.props.history.push('/addtarefas');
    }

    //listar todas as tarefas

    // excluir tarefa

    // editar tarefa

    // selecionar tarefas


    render() {
        return (
            <Row>
            <Col m={8} s={12}>
                <Card>
                <Button onClick={() => this.clickAddTarefa()} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                    <i className="material-icons">add</i>
                </Button>
                <div>
                <form>
                    <input
                    onChange={text => this.searchFilterFunction(text)}
                    placeholder="procurar tarefa" />
                </form>
                <Collection className="collection" header="Tarefas">
                    
                </Collection>
                </div>
                </Card>
            </Col>
        </Row>
        );
    }
}

export default Tarefas;