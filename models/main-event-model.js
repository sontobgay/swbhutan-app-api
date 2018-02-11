
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainEventSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    event_day_title: {
        type: String,
        required: true
    },
    session_group: {
        type: String
    },
    sessions: [{ time: String, session_title: String, remark: String}],
    
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