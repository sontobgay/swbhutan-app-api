var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationMainSchema = new Schema({
    idea_title: {
        type: String,
        required: true
    },
    group_name: {
        type: String
    },
    group_member: {
        type: String
    },
    group_leader: {
        type: String,
        required: true
    },
    pitch_area: {
        type: Number,
        required: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    created_at: Date
});

RegistrationMainSchema.pre('save', function (next) {
    var registration_main = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!registration_main.created_at) {
        registration_main.created_at = currentDate;
    }
    next();
});

//Export Model
module.exports = mongoose.model('RegistrationMain', RegistrationMainSchema);