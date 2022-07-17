import express from 'express';
import { JWTAuthPremission, isAdminPremission } from '../../../shared/middleware/index.js';

import * as controller from './controller.js';

const router = express.Router();

router.post('/', JWTAuthPremission, isAdminPremission, controller.createCar);
router.patch('/:carId', JWTAuthPremission, isAdminPremission, controller.updateCar);
router.delete('/:carId', JWTAuthPremission, isAdminPremission, controller.deleteCar);
router.get('/:carId', controller.getCarById)
router.get('/', controller.getCars);

export default router;