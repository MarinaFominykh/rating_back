const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  gameMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'unit',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  result: {
    type: String,
    required: true,
    enum: ['Победа города', 'Победа мафии', 'Ничья'],
  },
  units: [{
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'unit',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['мирный', 'мафия', 'дон', 'шериф'],
    },
    modKill: {
      type: Boolean,
      default: false,
    },
    bestPlayer: {
      type: Boolean,
      default: false,
    },

  }],
});

module.exports = mongoose.model('match', matchSchema);
