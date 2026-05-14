const mongoose = require("mongoose");  

 const contactSchema = mongoose.Schema({

     first_name: {
         type: String,
         required:true
         
     },
     last_name: {
         type: String,
         required:true
          
     },
     email: {
         type: String,
         required:true
         
     },
     phone: {
         type: String,
         required:true
         
     },
     address: {
         type: String,
         required:true
         
     }
     
 })

module.exports = mongoose.model("contacts", contactSchema);