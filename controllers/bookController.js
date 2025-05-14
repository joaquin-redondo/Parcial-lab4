const Book = require('../models/Book');
const Author = require('../models/Author');

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id); if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { titulo, resumen, genero, publicacion, disponible } = req.body;
  try {
const book = new Book({ titulo, resumen, genero, publicacion, disponible });
    await book.save();res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Datos incorrectos' });
  }
};

exports.updateBook = async (req, res) => {
  try {const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
res.json(book);
  }catch {
res.status(400).json({ error: 'Actualizacion incorrecta' });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
const usedByAuthor = await Author.findOne({ libros: bookId });
if (usedByAuthor) return res.status(400).json({ error: ' Libro está asignado a un autor y no puede eliminarse.' });

const deleted = await Book.findByIdAndDelete(bookId);
  if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
res.json({ message: 'Libro eliminado' });
};
