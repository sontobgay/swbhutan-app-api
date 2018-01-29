
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PitchingPrizeSchema = new Schema({
    position_number: {
        type: Number,
        required: true
    },
    position_name: {
        type: String,
        required: true
    },
    prize_detail: {
        type: String,
        required: true
    },
    created_at: Date
});

PitchingPrizeSchema.pre('save', function (next) {
    var pitching_prize = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!pitching_prize.created_at) {
        pitching_prize.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('PitchingPrize', PitchingPrizeSchema);