'use strict';


var mongoose = require('mongoose');
var Rooms = mongoose.model('Chat');
var ChatUser = mongoose.model('ChatUser');


exports.list_all_rooms = function(req, res) {
    Rooms.find({}, function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    });
  };

exports.create_a_room = function(req, res,) {
    var new_room = new Rooms(req.body);
    new_room.save(function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    });


  };

exports.read_a_room = function(req, res) {
    Rooms.findById(req.params.roomId, function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    });
  };

exports.update_a_room = function(req, res) {
    Rooms.findOneAndUpdate({_id: req.params.roomId}, req.body, {new: true}, function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    });
  };

exports.delete_a_room = function(req, res) {
  Rooms.findOneAndDelete(
    {
      _id: req.params.roomId
    },
    // Product.remove({_id: { $pull: req.body.stock }}),
    function(err, room) {
      if (err)
        res.send(err);
      res.json({ message: 'room successfully deleted' });
    });
  };


  //Chat USER controllers


  exports.list_all_users = function(req, res) {
      ChatUser.find({}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    };

  exports.create_a_user = function(req, res,) {
      var new_user = new ChatUser(req.body);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });


    };

  exports.read_a_user = function(req, res) {
      ChatUser.findById(req.params.userId, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    };

  exports.update_a_user = function(req, res) {
      ChatUser.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    };

  exports.delete_a_user = function(req, res) {
    Rooms.findOneAndDelete(
      {
        _id: req.params.userId
      },
      // Product.remove({_id: { $pull: req.body.stock }}),
      function(err, room) {
        if (err)
          res.send(err);
        res.json({ message: 'User successfully deleted' });
      });
    };
