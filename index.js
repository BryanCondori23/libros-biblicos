// express
const express = require('express');
const app  = express();
const PORT = 3000; // PUEDE CAMBIAR DEPENDIENDO QUE PUERTO TRABAJEMOS ES NECESARIO SOLO POR DEFECTO

// creamos un array o un listado de libros de

let librosBiblicos = [
    { id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: '1000'},
    { id: 2 , nombre: 'Exodo', autor: 'Moises', anioPublicacion: '2000'},
    { id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion:'2024'},



];

let nombre = [
    {nombre: 'Bryan Harol Condori Rafael ', profesion: 'Tecnico Superior Informatica'},
    
];


//mensaje Json
 app.use(express.json());
 //endpoint 1 OBTENER TODOS LOS LIBROS
 app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
 });

 //endpoint para obtener el nombre y la profesion

 app.get('/nombres', (req, res) => {
    res.json(nombre);
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

// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});

//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});


 app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto http://localhost" + PORT);
 });