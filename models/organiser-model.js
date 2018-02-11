var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganiserSchema = new Schema({

    serial_no: {
        type: Number,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    logo_link: {
        type: String
    },
    created_at: Date

});

OrganiserSchema.pre('save', function (next) {
    var organiser = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!organiser.created_at) {
        organiser.created_at = currentDate;
    }
    next();
});
//Export Model
module.exports = mongoose.model('Organiser', OrganiserSchema);