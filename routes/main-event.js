var express = require('express');

var app = module.exports = express.Router();

var MainEvent = require('../models/main-event-model');

app.get('/main-events', function(req, res) {
    MainEvent.find({}, function(err, main_events) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching events!", "error": err});
        }
        res.status(200).send({"success": true, "result": main_events});
    });
});

// app.post('/main-events', function(req, res) {
//     if(!req.body.title) {
//         return res.status(400).send({"success": false, "msg": "Send Main Event Title"});
//     }

//     var newMainEvent = new MainEvent({
//         title: req.body.title,
//         detail: req.body.detail,
//         event_date: req.body.event_date,
//         event_time: req.body.event_time,
//         event_day: req.body.event_day
//     });

//     newMainEvent.save(function (err) {
//         if(err) {
//             console.log("Some Error: ", err);
//             return res.json({ "success": false, "msg": "Error while creating new main event", "error": err});
//         }
//         res.status(201).send({ "success": true, "msg": "Successfully created new main event"});
//     });
// });

// app.delete('/main-events/:mainEventId', function(req, res) {
//     var mainEventParamId = req.params.mainEventId;
//     if(!mainEventParamId || mainEventParamId === "") {
//         return res.json({ "success": false, "msg": "You need to select the ID of the main event", "error": err});
//     }

//     Event.findByIdAndRemove(mainEventParamId, function(err, removed) {
//         if(err) {
//             return res.json({ "success": false, "msg": "Error while deleting the main event", "error": err});
//         }
//         res.status(200).json({ "success": true, "msg": "Main Event Deleted" });
//     });
// });