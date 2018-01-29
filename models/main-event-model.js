
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainEventSchema = new Schema({
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
    event_day: {
        type: Number,
        required: true
    },
    created_at: Date
});

MainEventSchema.pre('save', function (next) {
    var main_event = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!main_event.created_at) {
        main_event.created_at = currentDate;
    }
    next();
});

//Export Main Event Model
module.exports = mongoose.model('MainEvent', MainEventSchema);