var express = require('express');

var app = module.exports = express.Router();

var PitchingEventDate = require('../models/pitching-event-date-model');

app.get('/pitching-event-dates', function(req, res) {
    PitchingEventDate.find({}, function(err, pitching_event_dates) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching pitching event dates!", "error": err});
        }
        res.status(200).send({"success": true, "result": pitching_event_dates});
    });
});

app.post('/pitching-event-dates', function(req, res) {
    if(!req.body.event_date) {
        return res.status(400).send({"success": false, "msg": "Send event date"});
    }

    var newPitchingEventDate = new PitchingEventDate({
        serial_no: req.body.serial_no,
        event_date: req.body.event_date,
        college: req.body.college,
        remarks: req.body.remarks
    });

    newPitchingEventDate.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating new pitching event date", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "Successfully created new pitching event date"});
    });
});

app.delete('/pitching-event-dates/:pitchingEventDateId', function(req, res) {
    var pitchingEventDateParamId = req.params.pitchingEventDateId;
    if(!pitchingEventDateParamId || pitchingEventDateParamId === "") {
        return res.json({ "success": false, "msg": "You need to select the ID of pitching event date", "error": err});
    }

    PitchingEventDate.findByIdAndRemove(pitchingEventDateParamId, function(err, removed) {
        if(err) {
            return res.json({ "success": false, "msg": "Error while deleting pitching event date", "error": err});
        }
        res.status(200).json({ "success": true, "msg": "Pitching event date deleted!" });
    });
});