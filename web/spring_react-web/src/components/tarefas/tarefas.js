// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Card } from 'react-materialize';

class Tarefas extends React.Component {

  render() {
    return (
    <Row>
      <h5 className="subtitle">Tarefas</h5>
          <Card>
            <div>
              <p><b>Lorem</b></p>
              </div>
          </Card>
    </Row>
    );
  }
}

export default Tarefas;