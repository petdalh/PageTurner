const Author = require('../models/Author')
const mongoose = require('mongoose')

// get all authors 
const getAuthors = async (req, res) => {
  const authors = await Author.find({}).sort({ createdAt: -1 }) //find({birthYear : 1980}) hadde gitt alle født 1980. -1 = decending order

  res.status(200).json(authors)
}

// get a single author by id
const getAuthor = async (req, res) => {
  //vi henter id fra req.params liste
  const { id } = req.params

  //den sjekker om id-en som blir sendt inn er av typen ObjectID. Example: 63ebce62470afc87f96bdec4
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const author = await Author.findById(id)

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  res.status(200).json(author)


}
//if request parameter is tom it will return all authors with name Tom (case insensetive) 
const getAuthorByFullName = async (req, res) => {
  const name = req.params.name;

  // Use a regular expression with the i flag to match the exact name (case-insensitive)
  const regex = new RegExp('^' + name + '$', 'i');

  // Use the find() method to find all authors with the given name (case-insensitive)
  Author.find({ name: regex }, function (error, authors) {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving authors');
    } else if (authors.length === 0) {
      res.status(404).send('No authors found');
    } else {
      res.json(authors);
    }
  })
}

/* 
In this example, the ^ and $ anchors are used in the regular expression to match 
names that start with the provided parameter and contain the rest of the characters in order. 
The i flag is still used to make the search case-insensitive.

For example, if the request parameter is "Tom Ha", this regular expression will match names
like "Tom Hardy" and "Tom Harrison", but not names like "Hailey Tomlinson" or "Thomas Harper".

const getAuthorByFullName = async (req, res) => {
  const name = req.params.name;

  // Use a regular expression with the ^ and $ anchors to match names that start
  // with the provided parameter and contain the rest of the characters in order
  const regex = new RegExp('^' + name, 'i');

  // Use the find() method to find all authors that match the search parameter
  Author.find({ name: regex }, function(error, authors) {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving authors');
    } else if (!authors || authors.length === 0) {
      res.status(404).send('No authors found');
    } else {
      res.json(authors);
    }
  })
}
*/

// add an author
const addAuthor = async (req, res) => {
  const { name, birthYear } = req.body

  // add doc to db
  try {
    const author = await Author.create({ name, birthYear })
    res.status(200).json(author)
  } catch (error) {
    res.status(400).json({ error: error.message })

  }
}

// delete an author
const deleteAuthor = async (req, res) => {
  const { id } = req.params //vi henter id fra req.params liste

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const author = await Author.findOneAndDelete({ _id: id })

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  res.status(200).json(author)

}

// delete an author by fullname
//it is case sensetive and only deletes one author at a time. 
const deleteAuthorByFullName = async (req, res) => {
  const { name } = req.params //vi henter id fra req.params liste

  const author = await Author.findOneAndDelete({ name: name })

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  res.status(200).json(author)

}



module.exports = {
  getAuthor,
  getAuthorByFullName,
  getAuthors,
  addAuthor,
  deleteAuthor,
  deleteAuthorByFullName
}