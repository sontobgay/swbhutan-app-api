
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpeakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    agency: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    profile_pic_link: {
        type: String
    },
    created_at: Date
});

SpeakerSchema.pre('save', function (next) {
    var speaker = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!speaker.created_at) {
        speaker.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('Speaker', SpeakerSchema);