const express = require('express');

// Check permissions middleware
// const {
//   imageDeletePermission,
//   imageCreatePermission
// } = require('../../../shared/middleware');

const controller = require('./controller');

const upload = require('./storage');

// Create router
const router = express.Router();

// // Route for receiving image
// // router.get('/:imageName', controller.getImage);

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

module.exports = router;
