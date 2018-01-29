var express = require('express');

var app = module.exports = express.Router();

var PitchingEventAgenda = require('../models/pitching-event-agenda-model');

app.get('/pitching-event-agendas', function(req, res) {
    PitchingEventAgenda.find({}, function(err, pitching_event_agendas) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching pitching event agendas!", "error": err});
        }
        res.status(200).send({"success": true, "result": pitching_event_agendas});
    });
});

app.post('/pitching-event-agendas', function(req, res) {
    if(!req.body.agenda_time) {
        return res.status(400).send({"success": false, "msg": "Send agenda time"});
    }

    var newPitchingEventAgenda = new PitchingEventAgenda({
        serial_no: req.body.serial_no,
        agenda_time: req.body.agenda_time,
        agenda: req.body.agenda,
        remarks: req.body.remarks
    });

    newPitchingEventAgenda.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating new pitching event agenda", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "Successfully created new pitching event agenda"});
    });
});

app.delete('/pitching-event-agendas/:pitchingEventAgendaId', function(req, res) {
    var pitchingEventAgendaParamId = req.params.pitchingEventAgendaId;
    if(!pitchingEventAgendaParamId || pitchingEventAgendaParamId === "") {
        return res.json({ "success": false, "msg": "You need to select the ID of pitching event agenda", "error": err});
    }

    PitchingEventAgenda.findByIdAndRemove(pitchingEventAgendaParamId, function(err, removed) {
        if(err) {
            return res.json({ "success": false, "msg": "Error while deleting pitching event agenda", "error": err});
        }
        res.status(200).json({ "success": true, "msg": "Pitching event agenda deleted!" });
    });
});