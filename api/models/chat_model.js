'use strict';
var  mongoose = require('mongoose');
require('mongoose-type-url');
var Schema = mongoose.Schema;


// Product Schema

var ChatSchema = new Schema({
room_name:{
  type:String,
  required:"please enter the room_name",
  unique:true,
},
room_admin:{
  type:String,
},

room_limit:{
  type:Number,
},
allowed_users_id:[
      {type: Schema.Types.ObjectId, ref: 'ChatUser'}
    ],
check:{
  type:[String],
  required:"file",
}

});
module.exports = mongoose.model('Chat',ChatSchema);


//Chat User Schema
var ChatUserSchema = new Schema({
  username:{
    type:String,
    required:"please enter the username",
    unique: true,
  }

});

module.exports = mongoose.model('ChatUser',ChatUserSchema);
