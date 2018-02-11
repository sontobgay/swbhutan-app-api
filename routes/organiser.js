var express = require('express');

var app = module.exports = express.Router();

var Organiser = require('../models/organiser-model');

app.get('/organisers', function(req, res) {
    Organiser.find({}, function(err, organisers) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching Organisers!", "error": err});
        }
        res.status(200).send({"success": true, "result": organisers});
    });
});

app.post('/organisers', function(req, res) {
    if(!req.body.organisation) {
        return res.status(400).send({"success": false, "msg": "Send Organisation Name"});
    }

    var newOrganiser = new Organiser({
        serial_no: req.body.serial_no,
        organisation: req.body.organisation,
        logo_link: req.body.logo_link
    });

    newOrganiser.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating new Organiser", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "Successfully created new Organiser"});
    });
});

// app.delete('/pitching-prizes/:pitchingPrizeId', function(req, res) {
//     var pitchingPrizeParamId = req.params.pitchingPrizeId;
//     if(!pitchingPrizeParamId || pitchingPrizeParamId === "") {
//         return res.json({ "success": false, "msg": "You need to select the ID of pitching prize", "error": err});
//     }

//     PitchingPrize.findByIdAndRemove(pitchingPrizeParamId, function(err, removed) {
//         if(err) {
//             return res.json({ "success": false, "msg": "Error while deleting pitching prize", "error": err});
//         }
//         res.status(200).json({ "success": true, "msg": "Pitching prize deleted!" });
//     });
// });