const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  text: {
    type: "string",
    required: [true, "should have some text"],
  },
  heading: {
    type: "string",
    required: [true, "diary should have some heading"],
  },
  date: Date,
});
const diary = mongoose.model("Diary", diarySchema);
module.exports = diary;
