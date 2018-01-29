var express = require('express');

var app = module.exports = express.Router();

var RegistrationMain = require('../models/registration-main-model');

app.get('/registration-main-events', function(req, res) {
    RegistrationMain.find({}, function(err, registrations) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching Registrations for Main Events!", "error": err});
        }
        res.status(200).send({"success": true, "result": registrations});
    });
});

app.post('/registration-main-events', function(req, res) {
    if(!req.body.idea_title) {
        return res.status(400).send({"success": false, "msg": "Send Idea Title"});
    }

    var newRegistration = new RegistrationMain({
        idea_title: req.body.idea_title,
        group_name: req.body.group_name,
        group_member: req.body.group_member,
        group_leader: req.body.group_leader,
        pitch_area: req.body.pitch_area,
        mobile: req.body.mobile,
        email: req.body.email
    });

    newRegistration.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating registration for main event", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "Successfully created new registration for main event"});
    });
});

app.delete('/registration-main-events/:registrationId', function(req, res) {
    var registrationParamId = req.params.registrationId;
    if(!registrationParamId || registrationParamId === "") {
        return res.json({ "success": false, "msg": "You need to select the ID of registration for main event", "error": err});
    }

    RegistrationMain.findByIdAndRemove(registrationParamId, function(err, removed) {
        if(err) {
            return res.json({ "success": false, "msg": "Error while deleting registration of main event", "error": err});
        }
        res.status(200).json({ "success": true, "msg": "Registration for main event deleted!" });
    });
});