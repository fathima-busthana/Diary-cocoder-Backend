const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: "string",
    required: [true, "should have some text"],
  },
  id: {
    type: "string",
  },
});
const diary = mongoose.model("Diary", diarySchema);
module.exports = diary;
