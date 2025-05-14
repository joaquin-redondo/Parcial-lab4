// Construir una API RESTful utilizando Node.js, Express y Mongoose que permita administrar libros (Book) y autores (Author).
// La información se almacenará en una base de datos MongoDB.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());

// Las rutas
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

// mi conexion a mongodb
mongoose.connect(process.env.MONGO_URL, {
  dbName: 'Libros'
}).then(() => console.log('conectado a mongodb')).catch(err => console.error(err));

// Aca estaria mi servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
