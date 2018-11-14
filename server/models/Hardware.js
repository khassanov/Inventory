var mongoose = require('mongoose');
var documentSchema = new mongoose.Schema({
    name: String,
    invNumber: String,
    description: String,
    category: String,
    userDBT: String,
    state:String,
    comment:String,
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
    


});

module.exports = mongoose.model('Hardware', documentSchema);