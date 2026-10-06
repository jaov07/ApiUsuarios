import express from 'express';
import { postUsuario, getUsuarios, getUsuarioPorId, deleteUsuarioPorId, atualizaUsuarioPorId } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', postUsuario);
router.get('/users', getUsuarios);
router.get('/users/:id', getUsuarioPorId);
router.delete('/users/:id', deleteUsuarioPorId);
router.put('/users/:id', atualizaUsuarioPorId );

export default router;