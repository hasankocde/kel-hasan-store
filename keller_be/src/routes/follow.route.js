"use strict";

const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');

// Route to handle GET requests to list all follows or specific follows based on user permissions
router.get('/', isLogin, followController.list);

// Route to handle POST requests to create a new follow
router.post('/', isLogin, followController.create);

// Route to handle GET requests for a specific follow by id
router.get('/:id', isLogin, followController.read);

// Route to handle PUT requests to update a specific follow by id
router.put('/:id', isLogin, followController.update);

// Route to handle DELETE requests to delete a specific follow by id
router.delete('/:id', isLogin, isAdmin, followController.delete);

module.exports = router;
