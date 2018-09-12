// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Button, Input} from 'react-materialize';
// Importando bib para Ajax
import axios from 'axios';

class AddFuncionario extends React.Component{

    render(){
        return(
            <Card>
                <Row>
                    <form class="col s12">
                        <Input id="icon_prefix" type="text" s={12} label="Nome" />
                        <Input placeholder="14-811.00" type="text" label="RG" s={12} />
                        <Input placeholder="Rua Duque, 123" type="text" label="Endereço" s={12} />
                    <Col s={12} m={12}>
                    <Button waves='light' className="right grey darken-2">Adicionar</Button>
                     </Col>
                    </form>  
                </Row>
          </Card>
        )
       
    }
}

export default AddFuncionario;