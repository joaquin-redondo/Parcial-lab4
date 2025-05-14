// routes de authors

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.put('/authors/:id/addBook/:bookId', authorController.addBookToAuthor);



module.exports = router;
