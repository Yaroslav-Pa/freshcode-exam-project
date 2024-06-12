const express = require('express');
const checkToken = require('../middlewares/checkToken');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');
const userRouter = require('./userRouter');
const router = express.Router();

router.use('/user', userRouter);

router.use(checkToken.checkToken);

router.use('/contests', contestRouter);

router.use('/chats', chatRouter);

module.exports = router;
