
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SponsorSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    event_date: {
        type: String,
        required: true
    },
    event_time: {
        type: String,
        required: true
    },
    is_main_event: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: Date,
});

SponsorSchema.pre('save', function (next) {
    var sponsor = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!sponsor.created_at) {
        sponsor.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('Sponsor', SponsorSchema);