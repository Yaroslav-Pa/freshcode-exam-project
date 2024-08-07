const checkToken = require('../middlewares/checkToken');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');
const userRouter = require('./userRouter');
const { onlyForModerator } = require('../middlewares/basicMiddlewares');
const offerModerationRouter = require('./offerModerationRouter');
const router = require('express').Router();

router.use('/user', userRouter);

router.use(checkToken.checkToken);

router.use('/contests', contestRouter);

router.use('/chats', chatRouter);

router.use('/moderation/offers', onlyForModerator, offerModerationRouter);

module.exports = router;
