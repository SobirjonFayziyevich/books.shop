
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {} = require("../lib/config");

const followSchema = new mongoose.Schema(
    {
       follow_id: {type: Schema.Types.ObjectId, required: true}, 
       subscriber_id: {type: Schema.Types.ObjectId, required: true},  
  },
{ timestamps: true } 

);

followSchema.index(
    
    {follow_id: 1, subscriber_id: 1}, //follow_id va subcribe_id dan tashkil topgan birikma unique bulishi lozim.
    {unique: true}
);

module.exports = mongoose.model("Follow", followSchema); 