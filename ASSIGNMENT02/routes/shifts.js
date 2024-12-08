const express = require("express");
const router = express.Router();

const Shift = require("../models/shift");

const AuthenticationMiddleware = require("../extensions/authentication");

router.get("/", async (req, res, next) => {
  let data = await Shift.find();
  res.render("shifts/index", {
    title: "Shifts",
    dataset: data,
    user: req.user,
  });
});

router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
  res.render("shifts/add", {
    title: "Add a Shift",
    user: req.user
  });
});

router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newShift = new Shift({
    shiftDate: req.body.shiftDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    store: req.body.store,
    location: req.body.location,
    yourName: req.body.yourName,
    yourPhone: req.body.yourPhone,
  });

  await newShift.save();
  res.redirect("/shifts");
});

router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let id = req.params._id;
  await Shift.findByIdAndDelete(id);
  res.redirect("/shifts");
});

router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let id = req.params._id;
  let data = await Shift.findById(id);
  res.render("shifts/edit", {
    title: "Edit Shift",
    shift: data,
    user: req.user
  });
});

router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let id = req.params._id;

  await Shift.findByIdAndUpdate(
    { _id: id },
    {
      shiftDate: req.body.shiftDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      store: req.body.store,
      location: req.body.location,
      yourName: req.body.yourName,
      yourPhone: req.body.yourPhone,
    }
  );

  res.redirect("/shifts");
});

module.exports = router;
