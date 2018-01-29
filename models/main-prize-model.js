var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainPrizeSchema = new Schema({
    prize_detail: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    created_at: Date
});

MainPrizeSchema.pre('save', function (next) {
    var main_prize = this;
    //get the current date
    var currentDate = new Date();

    //if created_at doesn't exist, add to that field
    if(!main_prize.created_at) {
        main_prize.created_at = currentDate;
    }
    next();
});

//Export Event Model
module.exports = mongoose.model('MainPrize', MainPrizeSchema);