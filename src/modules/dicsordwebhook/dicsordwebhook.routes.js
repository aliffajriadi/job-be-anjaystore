import express from 'express';
import dicsordwebhookController from './dicsordwebhook.controller.js';

const router = express.Router();

// router.get('/', dicsordwebhookController.getAll.bind(dicsordwebhookController));
// router.get('/:id', dicsordwebhookController.getById.bind(dicsordwebhookController));
// router.post('/', dicsordwebhookController.create.bind(dicsordwebhookController));
// router.put('/:id', dicsordwebhookController.update.bind(dicsordwebhookController));
// router.delete('/:id', dicsordwebhookController.delete.bind(dicsordwebhookController));
router.post('/botstatus-notif', dicsordwebhookController.botstatusNotif.bind(dicsordwebhookController));


export default router;
