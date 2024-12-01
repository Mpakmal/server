import express from 'express';
import {
    test,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', test); // Endpoint untuk tes
router.get('/:id', getUser); // Endpoint untuk mendapatkan user berdasarkan ID
router.patch('/update/:id', updateUser); // Endpoint untuk memperbarui user
router.delete('/delete/:id', deleteUser); // Endpoint untuk menghapus user

export default router;