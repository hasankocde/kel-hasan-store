"use strict";
const Message = require("../models/message.model");
const Ad = require("../models/ad.model");

module.exports = {
  list: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin ? {} : { 'participants._id': req.user._id };

      const threads = await Message.find(filters)
        .populate("participants._id messages.senderId");

      res.status(200).send({
        error: false,
        data: threads
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { adId, message } = req.body;
      const ad = await Ad.findById(adId);
      if (!ad) {
        return res.status(404).send({
          error: true,
          message: "Ad not found."
        });
      }

      const senderId = req.user._id; // Logged-in user is the sender

      let thread = await Message.findOne({
        adId: adId,
        participants: { $all: [{ _id: senderId }, { _id: ad.ownerId }] }
      });

      // Check if the thread already exists and if the sender is the ad owner
      if (!thread && senderId.toString() === ad.ownerId.toString()) {
        // Prevent ad owner from starting a message thread on their own ad
        return res.status(400).send({
          error: true,
          message: "You cannot send a message to your own ad."
        });
      }

      // Create a new thread if it does not exist
      if (!thread) {
        thread = await Message.create({
          participants: [{ _id: senderId }, { _id: ad.ownerId }],
          adId: adId,
          messages: [{
            senderId: senderId,
            messageText: message
          }]
        });
      } else {
        // Ensure both sender and receiver are in participants
        if (!thread.participants.some(p => p._id.toString() === senderId.toString())) {
          thread.participants.push({ _id: senderId });
        }

        // Add message to existing thread
        thread.messages.push({ senderId: senderId, messageText: message });
        await thread.save();
      }

      res.status(201).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    try {
      const messageId = req.params.id;
      const thread = await Message.findById(messageId)
        .populate("participants._id messages.senderId");

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Message thread not found."
        });
      }

      res.status(200).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const threadId = req.params.id;
      const { message } = req.body;

      const thread = await Message.findOne({ _id: threadId, 'participants._id': req.user._id });

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Thread not found or you do not have permission to update."
        });
      }

      // Append the new message to the messages array within the found thread
      thread.messages.push({ senderId: req.user._id, messageText: message });
      await thread.save();

      res.status(202).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const threadId = req.params.id;
      const result = await Message.findOneAndDelete({
        _id: threadId,
        'participants._id': req.user._id  // Ensure user is a participant
      });

      if (!result) {
        return res.status(404).send({
          error: true,
          message: "No such message thread found, or you don't have permission to delete it."
        });
      }

      res.status(204).send();  // No content to send back but signifies successful deletion
    } catch (err) {
      next(err);
    }
  }
};
