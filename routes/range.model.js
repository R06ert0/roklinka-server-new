const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let rangeSchema = new Schema({
  id: {
    type: Number,
  },
  range: [
    {
      index: {
        type: Number,
      },
      day: {
        type: Number,
      },
      selectType: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Range", rangeSchema);
