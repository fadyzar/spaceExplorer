import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();


router.get('/', getAllUsers);
// router.get('/:id', getUserById);
router.post('/', createUser);
// router.put('/:id', updateUserById);
// router.delete('/:id', deleteUser);


  

export default router;