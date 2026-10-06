import express from 'express';
import { postUsuario, getUsuarios, getUsuarioPorId, deleteUsuarioPorId } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', postUsuario);
router.get('/users', getUsuarios);
router.get('/users/:id', getUsuarioPorId);
router.delete('/users/:id', deleteUsuarioPorId);

export default router;