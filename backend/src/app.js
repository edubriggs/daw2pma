import express from 'express';
import router from '../src/routes.js';
import { createTableAtividade, createTableCategoria, createTableUsuario } from './Controller/Tabelas.js'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

async function createTables() {
    await createTableCategoria();
    await createTableUsuario();
    await createTableAtividade();
}

createTables().then(() => {
    console.log('Tabelas criadas com sucesso!');
}).catch((error) => {
    console.error('Erro ao criar tabelas:', error);
});

app.get('/', (req, res) => {
    res.send("olaaaa mundo");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Api rodando na porta ${PORT}`));
