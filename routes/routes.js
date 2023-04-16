const router = require('express').Router();
const unitRouter = require('./units');
const matchRouter = require('./matches');
const userRouter = require('./users');

const { createUser, loginUser } = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validations');

router.post('/api/signup', validateCreateUser, createUser);
router.post('/api/signin', validateLogin, loginUser);

router.use('/api/users', userRouter);
router.use('/api/units', unitRouter);
router.use('/api/matches', matchRouter);

module.exports = router;
