const express = require('express');
const router = express.Router();

const Shift = require('../models/shift');

router.get('/', async(req, res, next) => {
    let data = await Shift.find();
    res.render("shifts/index", {title: "Shifts", dataset: data});
});

router.get('/add', async(req, res, next) => {
    res.render("shifts/add", {title: "Add a Shift"});
});

router.post('/add', async(req, res, next) => {
    let newShift = new Shift({
        shiftDate: req.body.shiftDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        store: req.body.store,
        location: req.body.location,
        yourName: req.body.yourName,
        yourPhone: req.body.yourPhone
    });

    await newShift.save();

    res.redirect('/shifts');
});

router.get('/delete/:id', async(req, res, next) => {
    let id = req.params.id;
    await Shift.findByIdAndDelete(id);
    res.redirect('/shifts');
});

router.get('/edit/:id', async(req, res, next) => {
    let id = req.params.id;
    let data = await Shift.findById(id);
    res.render("shifts/edit", {title: "Edit Shift", shift: data});
});

router.post('/edit/:id', async(req, res, next) => {
    let id = req.params.id;
    
    await Shift.findByIdAndUpdate(
        {_id: id},
        {
            shiftDate: req.body.shiftDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            store: req.body.store,
            location: req.body.location,
            yourName: req.body.yourName,
            yourPhone: req.body.yourPhone
        }
    );

    res.redirect('/shifts');
});

module.exports = router;