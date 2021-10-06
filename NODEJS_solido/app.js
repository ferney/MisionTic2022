//Primero requerimos los módulos 'http', url, fs, mysql y querystring
const http=require('http');
const url=require('url');
const fs=require('fs');
const querystring = require('querystring');
const mysql=require('mysql');
//Mediante la constante mysql llamamos a la función createConnection y le pasamos un objeto literal inicializando las propiedades 'host','user','password' y 'database'.
const conexion=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database:'base1'
});
//procedemos a llamar a connect para abrir la conexión y si hay algún error mostrará la alerta
conexion.connect(error => {
  if (error)
    console.log('Problemas de conexion con mysql');
});


const servidor=http.createServer((pedido,respuesta) => {
  const objetourl = url.parse(pedido.url);
  let camino='public'+objetourl.pathname;
  if (camino=='public/')
    camino='public/index.html';
  encaminar(pedido,respuesta,camino);
});

servidor.listen(8888);

//aqui capturamos los diferentes eventos que realizamos mediante el index, los procesamos y llamamos la funcion que requerimos al momento
function encaminar (pedido,respuesta,camino) {
  //capturamos la ruta indicada en el hipervínculo
  switch (camino) {
    case 'public/creartabla': {
      crear(respuesta);
      break;
    }	
    case 'public/creararticulo': {
        creararticulo(pedido,respuesta);
      break;
    }			
    case 'public/listado': {
      listado(respuesta);
      break;
    }
    case 'public/consultararticulo': {
      consulta(pedido,respuesta);
      break;
    }							
      default : {  
        fs.stat(camino, error => {
          if (!error) {
              fs.readFile(camino,(error,contenido) => {
            if (error) {
              respuesta.writeHead(500, {'Content-Type': 'text/plain'});
              respuesta.write('Error interno');
              respuesta.end();					
            } else {
              respuesta.writeHead(200, {'Content-Type': 'text/html'});
              respuesta.write(contenido);
              respuesta.end();
            }
          });
        } else {
          respuesta.writeHead(404, {'Content-Type': 'text/html'});
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
          respuesta.end();
        }
      });	
    }
  }	
}


function crear(respuesta) {
  //En la función crear llamamos a la función query del objeto conexion que creamos previamente
  //le pasamos el comando SQL 'drop table if exists articulos' para que si ya existía la tabla proceda a borrarla.


  conexion.query('drop table if exists articulos', (error,resultado) => {
    if (error)
      console.log(error);				
  });	
  //le pasamos el comando SQL 'create table articulos' para que se cree la tabla
  conexion.query(`create table articulos (
                                           codigo int primary key auto_increment,
                                           descripcion varchar(50),
                                           precio float
                                         )`, (error,resultado) => {
    if (error) {
      console.log(error);				
      return;
    }  
  });
  respuesta.writeHead(200, {'Content-Type': 'text/html'});
  respuesta.write(`<!doctype html><html><head></head><body>
                  Se creo la tabla<br><a href="index.html">Retornar</a></body></html>`);		
  respuesta.end();	
}


function creararticulo(pedido,respuesta) {
  let info='';
  pedido.on('data', datosparciales => {
    info += datosparciales;
  });
  //rescatamos todos los datos del formulario , inicializamos todos los campos de la tabla menos el código por ser auto_increment.
 
  pedido.on('end', () => {
    const formulario = querystring.parse(info);
    const registro={
      descripcion:formulario['descripcion'],
      precio:formulario['precio']
    };
    //llamamos la función query de la variable conexion pasando el string con el comando SQL. 
    conexion.query('insert into articulos set ?',registro, (error,resultado) => {
      if (error) {
        console.log(error);
        return;
      }	  
    });		
    respuesta.writeHead(200, {'Content-Type': 'text/html'});
    respuesta.write(`<!doctype html><html><head></head><body>
                    Se cargo el articulo<br><a href="index.html">Retornar</a></body></html>`);		
    respuesta.end();
  });  	
}

//procedemos a mostrar todos los datos de la tabla 'articulos'
function listado(respuesta) {
  conexion.query('select * from articulos', (error,filas) => {
    if (error) {			
      console.log('error en el listado');
      return;
    }
    respuesta.writeHead(200, {'Content-Type': 'text/html'});
    let datos='';
    for(let f=0;f<filas.length;f++){
      datos+='Codigo:'+filas[f].codigo+'<br>';
      datos+='Descripcion:'+filas[f].descripcion+'<br>';
      datos+='Precio:'+filas[f].precio+'<hr>';
    }
    respuesta.write('<!doctype html><html><head></head><body>');
    respuesta.write(datos);	
    respuesta.write('<a href="index.html">Retornar</a></body></html>');
    respuesta.end();		
  });
}

//capturamos el ibgreso del codigo de artículo y procedemos a enviarlo al servidor 
//llamamos a la función consulta donde rescatamos los valores del formulario y procedemos a llamar 
//al comando SQL select con la clausula where indicando el código que se cargó en el formulario
function consulta(pedido,respuesta) {
  let info='';
  pedido.on('data', datosparciales => {
    info += datosparciales;
  });
  pedido.on('end', () => {
    const formulario = querystring.parse(info);
    const dato=[formulario['codigo']];
    conexion.query('select descripcion,precio from articulos where codigo=?',dato, (error,filas) => {
      if (error) {			
        console.log('error en la consulta');
        return;
      }
      respuesta.writeHead(200, {'Content-Type': 'text/html'});
      let datos='';
      if (filas.length>0) {
        datos+='Descripcion:'+filas[0].descripcion+'<br>';
        datos+='Precio:'+filas[0].precio+'<hr>';
      } else {
        datos='No existe un artículo con dicho codigo.';
      }	
      respuesta.write('<!doctype html><html><head></head><body>');
      respuesta.write(datos);	
        respuesta.write('<a href="index.html">Retornar</a></body></html>');
      respuesta.end();		
    });
  });  	 
}

console.log('Servidor web iniciado');
