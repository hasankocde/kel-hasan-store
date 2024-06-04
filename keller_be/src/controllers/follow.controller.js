"use strict";
const Follow = require("../models/follow.model");

module.exports = {
  list: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
      const data = await res.getModelList(Follow, filters, "userId followedUserId");
      const details = await res.getModelListDetails(Follow, filters);
      res.status(200).send({
        error: false,
        details,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      req.body.userId = req.user._id;
      const data = await Follow.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Follow.findOne(filters).populate("userId followedUserId");
      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
        });
      }
      res.status(200).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const updateResult = await Follow.updateOne(filters, req.body, { runValidators: true });
      if (updateResult.matchedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
        });
      }
      const newData = await Follow.findOne(filters).populate("userId followedUserId");
      res.status(202).send({
        error: false,
        data: newData,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Follow.deleteOne(filters);
      if (data.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
        });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
