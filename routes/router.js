/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import Tasks from '../controllers/tasks';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', Tasks.createTask);

export default router;
