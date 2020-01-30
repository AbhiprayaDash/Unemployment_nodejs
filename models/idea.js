const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const IdeaSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }

});

mongoose.model('ideas',IdeaSchema);