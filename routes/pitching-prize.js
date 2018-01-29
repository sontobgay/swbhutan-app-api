var express = require('express');

var app = module.exports = express.Router();

var PitchingPrize = require('../models/pitching-prize-model');

app.get('/pitching-prizes', function(req, res) {
    PitchingPrize.find({}, function(err, pitching_prizes) {
        if(err) {
            return res.json({"success": false, "msg": "Error while fetching pitching prizes!", "error": err});
        }
        res.status(200).send({"success": true, "result": pitching_prizes});
    });
});

app.post('/pitching-prizes', function(req, res) {
    if(!req.body.prize_detail) {
        return res.status(400).send({"success": false, "msg": "Send prize detail"});
    }

    var newPitchingPrize = new PitchingPrize({
        position_number: req.body.position_number,
        position_name: req.body.position_name,
        prize_detail: req.body.prize_detail
    });

    newPitchingPrize.save(function (err) {
        if(err) {
            console.log("Some Error: ", err);
            return res.json({ "success": false, "msg": "Error while creating new pitching prize", "error": err});
        }
        res.status(201).send({ "success": true, "msg": "Successfully created new pitching prize"});
    });
});

app.delete('/pitching-prizes/:pitchingPrizeId', function(req, res) {
    var pitchingPrizeParamId = req.params.pitchingPrizeId;
    if(!pitchingPrizeParamId || pitchingPrizeParamId === "") {
        return res.json({ "success": false, "msg": "You need to select the ID of pitching prize", "error": err});
    }

    PitchingPrize.findByIdAndRemove(pitchingPrizeParamId, function(err, removed) {
        if(err) {
            return res.json({ "success": false, "msg": "Error while deleting pitching prize", "error": err});
        }
        res.status(200).json({ "success": true, "msg": "Pitching prize deleted!" });
    });
});