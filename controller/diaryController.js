const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const diary = require("../model/diary");
const users = require("../model/user");

exports.getAllDiary = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await users.findById(id).populate("diary");
  if (!user) {
    return next(new appError("the requested user does not exist", 401));
  }
  res.status(201).json({
    ok: true,
    data: user,
  });
});

exports.createDiary = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await users.findById(id);
  if (!user) {
    return next(new appError("the requested user does not exist", 401));
  }
  const { date, text, uuid } = req.body;
  if (!date || !text) {
    return next(new appError("parameter data or text is missing", 401));
  }
  const newDiary = new diary({ date: date, text: text, id: uuid });
  user.diary.push(newDiary);
  await user.save();
  await newDiary.save();

  res.status(201).json({
    ok: true,
    response: "diary was saved",
  });
});