import express from 'express';
import growtopiaController from './growtopia.controller.js';

const router = express.Router();

router.get('/', growtopiaController.getAll.bind(growtopiaController));
// router.get('/:id', growtopiaController.getById.bind(growtopiaController));
// router.post('/', growtopiaController.create.bind(growtopiaController));
// router.put('/:id', growtopiaController.update.bind(growtopiaController));
// router.delete('/:id', growtopiaController.delete.bind(growtopiaController));

export default router;
