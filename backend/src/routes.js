import { Router } from 'express';
import { insertAtividade, insertCategoria, insertUsuario, updateAtividade, updateCategoria, updateUsuario, selectAtividade, selectCategoria, selectUsuario, selectUsuarioById, selectCategoriaById,selectAtividadeById, deleteAtividade, deleteCategoria, deleteUsuario } from './Controller/Tabelas.js';

const router = Router();

router.get('/usuario', selectUsuario);
router.get('/usuario/:id', selectUsuarioById);
router.post('/usuario', insertUsuario);
router.put('/usuario/:id', updateUsuario); 
router.delete('/usuario/:id', deleteUsuario); 

router.get('/categoria', selectCategoria);
router.get('/categoria/:id', selectCategoriaById);
router.post('/categoria', insertCategoria);
router.put('/categoria/:id', updateCategoria); 
router.delete('/categoria/:id', deleteCategoria);

router.get('/atividade', selectAtividade);
router.get('/atividade/:id', selectAtividadeById);
router.post('/atividade', insertAtividade);
router.put('/atividade/:id', updateAtividade);
router.delete('/atividade/:id', deleteAtividade);

export default router;
