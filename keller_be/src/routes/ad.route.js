"use strict";

const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');
const upload = require('../middlewares/upload');

// Route to handle GET requests for all ads, only logged-in users can access this
router.get('/', isLogin, adController.list);

// Route to handle GET requests for a specific ad by id, only logged-in users can access this
router.get('/:id', isLogin, adController.read);

// Route to handle POST requests to create a new ad with image uploads, only logged-in users can create ads
router.post('/', isLogin, upload.array('images', 5), adController.create);

// Route to handle PUT requests to update a specific ad by id with image uploads, only the ad owner or admin can update the ad
router.put('/:id', isLogin, upload.array('images', 5), adController.update);

// Route to handle DELETE requests to delete a specific ad by id, only the ad owner or admin can delete the ad
router.delete('/:id', isLogin, adController.delete);

module.exports = router;
