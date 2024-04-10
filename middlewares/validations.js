const { celebrate, Joi } = require("celebrate");

// POST /signup
const validateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      login: Joi.string().required(),
      password: Joi.string().required(),
    })
    .unknown(true),
});
// POST /signin
const validateLogin = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

// POST /matches
const validateCreateMatch = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    gameMaster: Joi.string().length(24).hex().required(),
    date: Joi.string().required(),
    result: Joi.string().required(),
    sheriff: Joi.string().length(24).hex().required(),
    done: Joi.string().length(24).hex().required(),
    red: Joi.array().length(6).required(),
    black: Joi.array().length(2).required(),
    modKill: Joi.array().required(),
    bestPlayer: Joi.array().required(),
  }),
});

// POST /matches/array
const validateCreateMatches = celebrate({
  body: Joi.array()
    .required()
    .items(
      Joi.object().keys({
        title: Joi.string().required(),
        gameMaster: Joi.string().length(24).hex().required(),
        date: Joi.string().required(),
        result: Joi.string().required(),
        sheriff: Joi.string().length(24).hex().required(),
        done: Joi.string().length(24).hex().required(),
        red: Joi.array().length(6).required(),
        black: Joi.array().length(2).required(),
        modKill: Joi.array().required(),
        bestPlayer: Joi.array().required(),
      })
    ),
});

// Delete /matches/:id

const validateDeleteMatch = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

// PATCH /matches/:id
const validateUpdateMatch = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
    title: Joi.string().required(),
    gameMaster: Joi.string().length(24).hex().required(),
    date: Joi.string().required(),
    result: Joi.string().required(),
    sheriff: Joi.string().length(24).hex().required(),
    done: Joi.string().length(24).hex().required(),
    red: Joi.array().length(6).required(),
    black: Joi.array().length(2).required(),
    modKill: Joi.array().required(),
    bestPlayer: Joi.array().required(),
  }),
});
// POST /units
const validateCreateUnit = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

// Patch /units/:id
const validateUpdateUnit = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

// Delete /matches/:id

const validateDeleteUnit = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateCreateMatch,
  validateCreateMatches,
  validateDeleteMatch,
  validateUpdateMatch,
  validateCreateUnit,
  validateUpdateUnit,
  validateDeleteUnit,
};
