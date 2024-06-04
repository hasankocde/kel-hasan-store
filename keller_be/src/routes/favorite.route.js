"use strict";

const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { isLogin } = require('../middlewares/permissions');

// Route to handle GET requests for all favorites of a logged-in user
router.get('/', isLogin, favoriteController.list);

// Route to handle POST requests to create a new favorite for a logged-in user
router.post('/', isLogin, favoriteController.create);

// Route to handle GET requests for a specific favorite by id for a logged-in user
router.get('/:id', isLogin, favoriteController.read);

// Route to handle PUT requests to update a specific favorite by id for a logged-in user
router.put('/:id', isLogin, favoriteController.update);

// Route to handle DELETE requests to delete a specific favorite by id for a logged-in user
router.delete('/:id', isLogin, favoriteController.delete);

module.exports = router;
