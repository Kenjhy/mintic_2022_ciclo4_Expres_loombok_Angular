const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express(); //Service
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.cfqg9ge.mongodb.net/bd_33?retryWrites=true&w=majority"
); //Cnexion con bd

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Crear esquema segun bd
const usuarioSchema = new mongoose.Schema({
  cedula: String,
  nombre: String,
  edad: Number,
});

const vehiculoSchema = new mongoose.Schema({
  placa: String,
  tipo: String,
  marca: String,
  modelo: Number,
  capacidad: String,
  cilindrada: String,
  pais: String,
  detalle: String,
});

//Crear modelo, como la clase o objeto
const UsuarioModel = new mongoose.model("usuarios", usuarioSchema);
const VehiculoModel = new mongoose.model("vehiculos", vehiculoSchema);

app.post("/AgregarUsuario", (request, response) => {
  console.log(request.body);
  const usuario = new UsuarioModel({
    cedula: request.body.cedula,
    nombre: request.body.nombre,
    edad: request.body.edad,
  });

  usuario.save(function (error, datos) {
    if (error) {
      response.send("Error al crear usuario");
    } else {
      response.send("Se creo usuario");
    }
  });
});

//http://localhost:3000/AgregarVehiculo
app.post("/AgregarVehiculo", (request, response) => {
  console.log(request.body);
  const vehiculo = new VehiculoModel({
    placa: request.body.placa,
    tipo: request.body.tipo,
    marca: request.body.marca,
    modelo: request.body.modelo,
    capacidad: request.body.capacidad,
    cilindrada: request.body.cilindrada,
    pais: request.body.pais,
    detalle: request.body.delete,
  });

  vehiculo.save(function (error, datos) {
    if (error) {
      response.send("Error al crear vehiculo");
    } else {
      response.send("Se creo vehiculo");
    }
  });
});

//http://localhost:3000/EliminarUsuario
app.delete("/EliminarUsuario", (request, response) => {
  UsuarioModel.deleteOne(
    { cedula: request.body.cedula },
    function (error, documento) {
      // Capturar documento que se elimino
      if (error) {
        response.send("Ups, ocurrió un error al eliminar un usuario");
      } else {
        response.send("El usuario ha sido eliminado");
      }
    }
  );
});

//http://localhost:3000/EliminarVehiculo
app.delete("/EliminarVehiculo", (request, response) => {
  VehiculoModel.deleteOne(
      { placa: request.body.placa },
      function (error, documento) {
        if (error) {
          response.send("Ups, Ocurrio un error al eliminar un Vehiculo");
        } else {
          response.send("El vehiculo ha sido Eliminado");
        }
      }
    );
  });

//Obtener http://localhost:3000/UsuarioCedula?cedula=11
app.get("/UsuarioCedula", (request, response) => {

   //Cuerpo o parametro de solicitud, simbolo pay
  const filtro = {
    cedula: request.body.cedula | request.query.cedula,
    nombre: request.body.nombre ? request.body.nombre : request.query.nombre,
  };

  UsuarioModel.find(filtro, function (error, documentos) {
    if (error) {
      response.send("Ups, ocurrió un error al eliminar un usuario");
    } else {
      response.send(documentos);
    }
  });
});

//Obtener http://localhost:3000/VehiculoPlaca?cedula=11
app.get("/VehiculoPlaca", (request, response) => {

  //Cuerpo o parametro de solicitud, simbolo pay
 const filtr = {
    placa: request.body.placa ? request.body.placa : request.query.placa,
    marca: request.body.marca ? request.body.marca : request.query.marca,
 };

 console.log(filtr)
 //marca: request.body.marca ? request.body.marca : request.query.marca,
 // placa: request.body.placa | request.query.placa,
 //placa: request.body.placa ? request.body.placa : request.query.placa,

 VehiculoModel.find(filtr, function (error, documentos) {
   if (error) {
     response.send("Ups, ocurrió un error al eliminar un vehiculo");
   } else {
     response.send(documentos);
   }
 });
});

//Obtener http://localhost:3000/UpdateVehiculo
app.put("/UpdateUsuario", (request, response) => {

  const filtro = {cedula: request.body.cedula};
  const datoNuevo = {
    nombre: request.body.nombre, 
    edad: request.body.edad
  };

  UsuarioModel.findOneAndUpdate(filtro, datoNuevo, function(error, documento){
    if(error) {
      response.send("Error al editar");
    } else {
      response.send("El usuario se edito")
    }
  });
});

//Obtener http://localhost:3000/UpdateUsuario
app.put("/UpdateVehiculo", (request, response) => {

  const filtro = {placa: request.body.placa};
  const datoNuevo = {
    tipo: request.body.tipo,
    marca: request.body.marca,
    modelo: request.body.modelo,
    capacidad: request.body.capacidad,
    cilindrada: request.body.cilindrada,
    pais: request.body.pais,
    detalle: request.body.detalle
  };

  VehiculoModel.findOneAndUpdate(filtro, datoNuevo, function(error, documento){
    if(error) {
      response.send("Error al editar");
    } else {
      response.send("El vehiculo se edito")
    }
  });
});


//Obtener http://localhost:3000/AllUsuario
app.get("/AllUsuario", (request, response) => {

  //Cuerpo o parametro de solicitud, simbolo pay
 const filtro = {
 };

 UsuarioModel.find(filtro, function (error, documentos) {
   if (error) {
     response.send("Ups, ocurrió un error al eliminar un usuario");
   } else {
     response.send(documentos);
   }
 });
});

//Obtener http://localhost:3000/AllVehiculo
app.get("/AllVehiculo", (request, response) => {

  //Cuerpo o parametro de solicitud, simbolo pay
 const filtro = {
 };

 VehiculoModel.find(filtro, function (error, documentos) {
   if (error) {
     response.send("Ups, ocurrió un error al buscaer un vuscar");
   } else {
     response.send(documentos);
   }
 });
});


//Ruta raiz: http://localhost:3000/
app.get("/", (request, response) => {
  response.send("<h1 style='color:red'>Bienbenidos a la ruta raaiz</h1>");
});

// respond with "hello world" when a GET request is made to the homepage
//@http://localhost:3000/inicio
app.get("/inicio", (request, response) => {
  response.send("hello world");
});
//Range ports
app.listen(3000, () => {
  console.log("Servidor escuchando...");
}); //Observar solicitudes, puerto> es el canal de comunicacion
