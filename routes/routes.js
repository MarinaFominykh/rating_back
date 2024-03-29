const router = require('express').Router();
const unitRouter = require('./units');
const matchRouter = require('./matches');
const userRouter = require('./users');

const { createUser, loginUser } = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validations');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, loginUser);

router.use('/users', userRouter);
router.use('/units', unitRouter);
router.use('/matches', matchRouter);

module.exports = router;
