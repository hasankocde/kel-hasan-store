"use strict";
const fs = require('fs'); // Dosya sistemi modülü
const Ad = require("../models/ad.model");
const Message = require("../models/message.model");
const { Subcategory } = require('../models/category.model');

module.exports = {
  list: async (req, res) => {
    const filters = req.user?.isAdmin ? {} : { ownerId: req.user._id };
    const data = await Ad.find(filters)
      .populate("ownerId")
      .populate({
        path: "categoryId",
        select: "categoryName"
      })
      .populate({
        path: "subcategoryId",
        select: "name"
      })
      .populate("addressId")
      .populate("soldUserId")
      .populate("visitedUser");
    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    if (req.files) {
      req.body.images = req.files.map(file => file.path);
    }
    req.body.ownerId = req.user._id;

    const subcategory = await Subcategory.findById(req.body.subcategoryId).populate('parentCategory');
    if (!subcategory) {
      return res.status(400).send({
        error: true,
        message: 'Invalid subcategory ID'
      });
    }

    req.body.categoryId = subcategory.parentCategory._id;
    const data = await Ad.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, ownerId: req.user._id };
    const data = await Ad.findOne(filters)
      .populate("ownerId")
      .populate({
        path: "categoryId",
        select: "categoryName"
      })
      .populate({
        path: "subcategoryId",
        select: "name"
      })
      .populate("addressId")
      .populate("soldUserId")
      .populate("visitedUser");
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, ownerId: req.user._id };

    const ad = await Ad.findOne(filters);
    if (!ad) {
      return res.status(404).send({
        error: true,
        message: 'Ad not found or you do not have permission to modify this ad.'
      });
    }

    // Remove specified images
    if (req.body.removeImages && Array.isArray(req.body.removeImages)) {
      req.body.removeImages.forEach(imagePath => {
        const imageIndex = ad.images.indexOf(imagePath);
        if (imageIndex > -1) {
          ad.images.splice(imageIndex, 1);
          fs.unlink(imagePath, (err) => {
            if (err) console.log(`Failed to delete image: ${err}`);
          });
        }
      });
    }

    // Append new images to the existing ones
    if (req.files) {
      req.body.images = ad.images.concat(req.files.map(file => file.path));
    } else {
      req.body.images = ad.images;
    }

    if (req.body.isSold === true && req.body.isReserved === true) {
      return res.status(400).send({
        error: true,
        message: 'An ad cannot be both sold and reserved at the same time.'
      });
    }

    if (req.body.isSold === false) {
      req.body.soldUserId = undefined;
      req.body.soldDate = undefined;
    }
    if (req.body.isReserved === false) {
      req.body.reservedUserId = undefined;
      req.body.reservedDate = undefined;
    }

    if ((req.body.isSold !== undefined && req.body.isSold !== ad.isSold) ||
      (req.body.isReserved !== undefined && req.body.isReserved !== ad.isReserved)) {
      if (!req.user.isAdmin && ad.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).send({
          error: true,
          message: 'You do not have permission to modify the sale or reservation status of this ad.'
        });
      }

      if ((req.body.isSold || req.body.isReserved) && (req.body.isSold !== ad.isSold || req.body.isReserved !== ad.isReserved)) {
        const firstMessage = await Message.findOne({ adId: ad._id }).sort({ createdAt: 1 });

        if (firstMessage && firstMessage.participants.length > 0) {
          if (req.body.isSold) {
            req.body.soldUserId = firstMessage.participants[0];
            req.body.soldDate = new Date();
          }
          if (req.body.isReserved) {
            req.body.reservedUserId = firstMessage.participants[0];
            req.body.reservedDate = new Date();
          }
        } else {
          return res.status(404).send({
            error: true,
            message: 'No messages found related to this ad.'
          });
        }
      }
    }

    const updatedAd = await Ad.findOneAndUpdate(filters, req.body, {
      new: true,
      runValidators: true
    }).populate("ownerId categoryId addressId soldUserId visitedUser");

    if (!updatedAd) {
      return res.status(404).send({
        error: true,
        message: 'Failed to update the ad.'
      });
    }

    if (req.body.isSold === false) {
      updatedAd.soldUserId = undefined;
      updatedAd.soldDate = undefined;
      await updatedAd.save();
    }
    if (req.body.isReserved === false) {
      updatedAd.reservedUserId = undefined;
      updatedAd.reservedDate = undefined;
      await updatedAd.save();
    }

    res.status(202).send({
      error: false,
      data: updatedAd
    });
  },

  delete: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, ownerId: req.user._id };
    const ad = await Ad.findOne(filters);
    if (ad && ad.images && ad.images.length > 0) {
      // İlan silinirken resimleri sil
      ad.images.forEach(image => {
        fs.unlink(image, (err) => {
          if (err) console.log(`Failed to delete image: ${err}`);
        });
      });
    }
    const data = await Ad.deleteOne(filters);
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
