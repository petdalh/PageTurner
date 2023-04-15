const express = require('express')
const Author = require('../models/Author')
const {
  addAuthor,
  getAuthor,
  getAuthorByFullName,
  getAuthors,
  deleteAuthor,
  deleteAuthorByFullName
} = require('../controllers/authorController')

const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

//GET all authors
router.get('/', getAuthors)

//GET a single author
router.get('/:id', getAuthor)

//GET a single author by FullName
router.get('/fullname/:name', getAuthorByFullName)

//POST a new author
router.post('/', protect, addAuthor)

//DELETE an author 
router.delete('/:id', deleteAuthor)

//DELETE an author by FullName
router.delete('/fullname/:name', deleteAuthorByFullName)


module.exports = router