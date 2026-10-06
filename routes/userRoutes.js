import express from 'express';
import { postUsuario, getUsuarios, getUsuarioPorId, deleteUsuarioPorId, atualizaUsuarioPorId, executaLogin } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioPorId);
router.post('/', postUsuario);
router.delete('/:id', deleteUsuarioPorId);
router.put('/:id', atualizaUsuarioPorId );
router.post('/login', executaLogin );

export default router;