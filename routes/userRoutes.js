import express from 'express';
import { postUsuario, getUsuarios, getUsuarioPorId, deleteUsuarioPorId, atualizaUsuarioPorId, executaLogin } from '../controllers/userController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:id',autenticar, getUsuarioPorId);
router.post('/', postUsuario);
router.delete('/:id',autenticar, deleteUsuarioPorId);
router.put('/:id', autenticar,atualizaUsuarioPorId );
router.post('/login', executaLogin );

export default router;