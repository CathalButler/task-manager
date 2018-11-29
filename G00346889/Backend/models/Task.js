//A data model using Schema Interface to represent the Post. 
//Varaibles
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define a schema
var TastsSchema = new Schema({   //Title & content for creating and listing data
    task_name: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    priority: {
        type: Number
    },
    date: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
    } //Used for updaing if the task is complete
});

// Compile model from schema
module.exports = mongoose.model('Task', TastsSchema);