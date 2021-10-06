var express = require('express');
var router = express.Router();

var bd=require('./bd');

//Creación de la tabla
router.get('/creartabla', function(req, res, next) {
   bd.query('drop table if exists articulos',function (error,resultado){
        if (error) {
          console.log(error);                
          return;
        }
   });    
   bd.query('create table articulos ('+
                       'codigo int primary key auto_increment,'+
                       'descripcion varchar(50),'+
                       'precio float'+
                    ')', function (error,resultado){
        if (error) {            
          console.log(error);                
          return;
        }  
  });    
  res.render('mensajearticulos',{mensaje:'La tabla se creo correctamente.'});  
});


//Alta de registros
router.get('/alta', function(req, res, next) {
  res.render('altaarticulos');
});


router.post('/alta', function(req, res, next) {
      var registro={
          descripcion:req.body.descripcion,
          precio:req.body.precio
        };
      bd.query('insert into articulos set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    
  res.render('mensajearticulos',{mensaje:'La carga se efectuo correctamente'});
});


//Listado de registros
router.get('/listado', function(req, res, next) {
  bd.query('select codigo,descripcion,precio from articulos', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listararticulos',{articulos:filas});
  });
});


//Consulta
router.get('/consulta', function(req, res, next) {
  res.render('consultaarticulos');
});


router.post('/consulta', function(req, res, next) {
  bd.query('select descripcion,precio from articulos where codigo=?',req.body.codigo, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('listadoconsulta',{articulos:filas});
            } else {
                res.render('mensajearticulos',{mensaje:'No existe el codigo de articulo ingresado'});
            }    
        });
});


//Modificacion
router.get('/modificacion', function(req, res, next) {
  res.render('consultamodificacion');
});


router.post('/modificar', function(req, res, next) {
  bd.query('select descripcion,precio,codigo from articulos where codigo=?',req.body.codigo, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('formulariomodifica',{articulos:filas});
            } else {
                res.render('mensajearticulos',{mensaje:'No existe el codigo de articulo ingresado'});
            }    
        });
});


router.post('/confirmarmodifica', function(req, res, next) {
  var registro={
          descripcion:req.body.descripcion,
          precio:req.body.precio
      };    
  bd.query('UPDATE articulos SET ? WHERE ?',[registro,{codigo:req.body.codigo}], function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                console.log(error);
                return;
            }
            res.render('mensajearticulos',{mensaje:'El articulo fue modificado'});
        });
});


module.exports = router;
