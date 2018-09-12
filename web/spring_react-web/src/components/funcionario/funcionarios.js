// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card} from 'react-materialize';


const Funcionario = (props) => {
    const{funcionarios} = props;
    //console.log(funcionarios);
    <Row>
      <Col m={8} s={12}>
          <h5>Funcionários</h5>
          <Card>
          <div>
              <h1>Funcionários</h1>
                  <ul>
                    {funcionarios.map(user => <li key={user.id}>{user.nome}</li>)}
                  </ul>
           </div>
          </Card>
      </Col>
    </Row>
}

export default Funcionario;