var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationPitchingSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    citizenship_id: {
        type: String,
        required: true
    },
    occupation: {
        type: Number
    },
    pitch_area: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    created_at: Date,
});

RegistrationPitchingSchema.pre('save', function (next) {
    var registration_pitching = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!registration_pitching.created_at) {
        registration_pitching.created_at = currentDate;
    }
    next();
});

//Export Model
module.exports = mongoose.model('RegistrationPitching', RegistrationPitchingSchema);