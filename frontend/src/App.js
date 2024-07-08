import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './rotas'; // Certifique-se de que o caminho para o arquivo de rotas está correto

function App() {
    return (
        <Router>
            <Rotas />
        </Router>
    );
}

export default App;
