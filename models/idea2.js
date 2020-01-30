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

    Password:{
        type:String,
        required:true
    },
    Password2:{
        type:String,
        required:true
    }

});

mongoose.model('ideas2',IdeaSchema);