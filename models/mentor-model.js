
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MentorSchema = new Schema({
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

MentorSchema.pre('save', function (next) {
    var mentor = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!mentor.created_at) {
        mentor.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('Mentor', MentorSchema);