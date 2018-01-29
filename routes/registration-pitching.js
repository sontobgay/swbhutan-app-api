var express = require('express');

var app = module.exports = express.Router();

var RegistrationPitching = require('../models/registration-pitching-model');

app.get('/registration-pitchings', function(req, res) {
    RegistrationPitching.find({}, function(err, registration_pitching) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching participants!", "error": err});
        }
        res.status(200).send({"success": true, "result": registration_pitching});
    });
});

app.post('/registration-pitchings', function(req, res) {
    if(!req.body.full_name) {
        return res.status(400).send({"success": false, "msg": "Enter Full Name"});
    }

    var newRegistrationPitching = new RegistrationPitching({
        full_name: req.body.full_name,
        citizenship_id: req.body.citizenship_id,
        occupation: req.body.occupation,
        pitch_area: req.body.pitch_area,
        mobile: req.body.mobile,
        email: req.body.email,
    });

    newRegistrationPitching.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating new Registration for Pitching", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "You are successfully registered for the pitching event!"});
    });
});

app.delete('/registration-pitchings/:registrationPitchingId', function(req, res) {
    var registrationPitchingParamId = req.params.registrationPitchingId;
    if(!registrationPitchingParamId || registrationPitchingParamId === "") {
        return res.json({ "success": false, "msg": "You need to select registration ID", "error": err});
    }

    RegistrationPitching.findByIdAndRemove(registrationPitchingParamId, function(err, removed) {
        if(err) {
            return res.json({ "success": false, "msg": "Error while deleting the Registration for Pitching", "error": err});
        }
        res.status(200).json({ "success": true, "msg": "Registration for Pitching Deleted" });
    });
});