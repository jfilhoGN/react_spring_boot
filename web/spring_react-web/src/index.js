import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Importando a nossa Lib de rotas
import { BrowserRouter } from 'react-router-dom'

//Renderizando o componente APP (com seus sub componentes e etc) em <div id="root></div> do index.html"
ReactDOM.render((
    <BrowserRouter>
    <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
