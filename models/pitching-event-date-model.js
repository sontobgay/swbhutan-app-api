
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PitchingEventDateSchema = new Schema({
    serial_no: {
        type: Number,
        required: true,
        unique: true
    },
    event_date: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
    },
    created_at: Date
});

PitchingEventDateSchema.pre('save', function (next) {
    var pitching_event_date = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!pitching_event_date.created_at) {
        pitching_event_date.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('PitchingEventDate', PitchingEventDateSchema);