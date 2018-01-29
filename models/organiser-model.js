var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganiserSchema = new Schema({

});

//Export Model
module.exports = mongoose.model('Organiser', OrganiserSchema);