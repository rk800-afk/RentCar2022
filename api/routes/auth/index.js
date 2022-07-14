const express = require('express');
const passport = require('passport');

const { JWTAuthPremission } = require('../../../shared/middleware');

const controller = require('./controller');

const router = express.Router();

router.get('/getUser', passport.authenticate('jwt', { session: false }), controller.getUser);
router.post('/signUp', controller.signUp);
router.post('/logIn', controller.logIn);
router.get('/logOut', controller.logOut);

module.exports = router;