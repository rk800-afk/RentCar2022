import express from 'express';

import * as controller from './controller.js';

const router = express.Router();

router.get('/', controller.getCars);

export default router;