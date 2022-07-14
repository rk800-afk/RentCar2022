import express from 'express';

import * as controller from './controller.js';

import upload from './storage.js';

// Create router
const router = express.Router();

// Route for receiving image
router.get('/:imageName', controller.getImage);

// Route for creating image
router.post(
  '/:carId',
  upload.single('file'),
  controller.createImage
);

// Route for removing image
router.delete(
  '/:carId',
  controller.removeImage
);

export default router;
