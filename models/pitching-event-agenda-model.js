
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PitchingEventAgendaSchema = new Schema({
    serial_no: {
        type: Number,
        required: true,
        unique: true
    },
    agenda_time: {
        type: String,
        required: true
    },
    agenda: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
    },
    created_at: Date
});

PitchingEventAgendaSchema.pre('save', function (next) {
    var pitching_event_agenda = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!pitching_event_agenda.created_at) {
        pitching_event_agenda.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('PitchingEventAgenda', PitchingEventAgendaSchema);