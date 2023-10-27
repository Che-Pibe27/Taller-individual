const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people); // Enviamos todo el array
});

app.get("/people/:index", (req, res) => {
  /*La propiedad "params" del request permite acceder a los parámetros de la URL 
    (importante no confundir con la "query", que serían los parámetros que se colocan 
    luego del signo "?" en la URL)
   */
  res.json(people[req.params.index]); // Enviamos el elemento solicitado por su índice
});

app.post("/people", (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

  people.push(req.body); // Añadimos un nuevo elemento al array

  res.json(req.body); // Le respondemos al cliente el objeto añadido
});

app.put("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda actualizar el objeto asociado al índice indicado en la URL 

     Nota: la función PUT sirve para actualizar un recurso existente en el servidor con los datos del cuerpo ("req.body")
     se actualiza a partir del indice indicado en la URL
     */
  const index = parseInt(req.params.index); // sacamos el indice de la url, usamos parseInt para convertirlo de una cadena a un numero entero

  if (index >= 0 && index < people.length) { // comprueba que se respete la cantidad de elementos en people.json, en caso que no exista, devuelve error
        
    people[index] = req.body; // actualizamos la info en people[index] (donde index va a ser el numero que se indica en la URL) arreglo, la sustituímos por el contenido del body
    
    res.json(people[index]); // devuelve el objeto actualizado

  } else {
    res.status(404).json({ error: "No existe la persona" }); // si no existe el indice, devuelve error 404
  }
});

app.delete("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
     
     nota: usamos el mismo if para comprobar que exista el índice
   */
     const index = parseInt(req.params.index); // sacamos el indice del URL

     if (index >= 0 && index < people.length) {

       const deletedPerson = people.splice(index, 1); // usamos splice para eliminar el objeto del arreglo, index es el indicador de objeto a eliminar y 1 es la cantidad a eliminar

       res.json(deletedPerson[0]); // Devolvemos el elemento eliminado

     } else {
       res.status(404).json({ error: "No existe la persona" }); 
     }

});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
