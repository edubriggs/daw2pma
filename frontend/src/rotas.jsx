import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/inicial/Home/home';
import CadastroUsuario from './pages/cadastro/Usuario/usuario';
import CadastroCategoria from './pages/cadastro/Categoria/categoria';
import CadastroAtividade from './pages/cadastro/Atividade/atividade';

function Rotas() {
    return (
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/cadastro_usuario' element={<CadastroUsuario />} />
            <Route path='/cadastro_categoria' element={<CadastroCategoria />} />
            <Route path='/cadastro_atividade' element={<CadastroAtividade />} />
            <Route path='/' element={<Navigate to="/home" />} />
        </Routes>
    );
}

export default Rotas;
