//connecting database
const mongoose = require("mongoose");

//schema is a template that given to the document, schema will be added to the db with the values given
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    name:{
        type : String,
        required : true  
    },
    mobile:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    }
});


const User = mongoose.model("User", userSchema); //User parameter is the document(table) name
module.exports = User;