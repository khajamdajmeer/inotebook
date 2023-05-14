const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
    }
    ,

    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
        
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('notes',NotesSchema)