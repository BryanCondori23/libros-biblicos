// express
const express = require('express');
const app  = express();
const PORT = 3000; // PUEDE CAMBIAR DEPENDIENDO QUE PUERTO TRABAJEMOS ES NECESARIO SOLO POR DEFECTO

// creamos un array o un listado de libros de

let librosBiblicos = [
    { id: 1 , nombre: 'Genesis', autor: 'Moises'},
    { id: 2 , nombre: 'Exodo', autor: 'Moises'},
    { id: 3 , nombre: 'Levitico', autor: 'Moises'},



];
//mensaje Json
 app.use(express.json());
 //endpoint 1 OBTENER TODOS LOS LIBROS
 app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
 });
 //enppint 2 obtener libro por ID
 app.get('/libros/:id',(req, res) => {
   const idCapturado = parseInt(req.params.id);
   console.log(idCapturado);
   const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
   if (libroEncontrado) {
       res.json(libroEncontrado);
   } else {
       res.status(404).json({mensaje : 'Libro no encontrado'});
   }
});
// endpoint 3 agregar un libro
app.post('/agregar-libro', (req, res) => {
   const nuevoLibro = req.body;
   console.log(nuevoLibro);
   librosBiblicos.push(nuevoLibro);
   res.status(201).json('este libro fue guardado exitosamente');
})
//endpoint 4 actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
   const idCapturado = parseInt(req.params.id);
   const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
   if (indexLibroLocalizado !== -1 ){
       librosBiblicos[indexLibroLocalizado] = req.body;
       res.json(librosBiblicos[indexLibroLocalizado]);
   } else {
       res.status(404).json({mensaje : 'Libro no encontrado'});
   }
});


 app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto http://localhost" + PORT);
 });