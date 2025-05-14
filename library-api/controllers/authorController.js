// controllers/authorController.js
const Author = require('../models/Author');
const Book = require('../models/Book');

const addBookToAuthor = async (req, res) => {
  try {
 const { id, bookId } = req.params;

const book = await Book.findById(bookId);if (!book) {return res.status(404).json({ message: 'Libro no encontrado' });}

 const author = await Author.findById(id);if (!author) { 

return res.status(404).json({ message: 'Autor no encontrado' });
    }

    if (!author.libros.includes(bookId)) {author.libros.push(bookId);
        await author.save();}

 res.status(200).json({ message: 'Libro agregado al autor', author });
  } catch (error) {res.status(500).json({ message: 'Error al agregar libro al autor', error });
  }
};

module.exports = {
  addBookToAuthor,
};
