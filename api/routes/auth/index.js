import express from "express";
import passport from "passport";

import { JWTAuthPremission, privateRoute } from '../../../shared/middleware/index.js';

import * as controller from './controller.js';

const router = express.Router();

router.get('/getUser', passport.authenticate('jwt', { session: false }), controller.getUser);
router.post('/signUp', controller.signUp);
router.post('/logIn', controller.logIn);
router.get('/logOut', privateRoute, controller.logOut);

export default router;