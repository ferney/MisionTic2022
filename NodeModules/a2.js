import llamado from './b';

//let llamado=require('./b');


var sum=function(){
    return llamado.suma(2,2);
}
var z=function(){
    return llamado.a;
}
var x=function(){
    //return [llamado.lenguajes().nombre];
    return llamado.lenguajes().nombre;
}
var y=function(){
let vario=llamado.variables();
for(var i=0;i<vario.length;i++){
    console.log( vario[i].nombre);}
}

var nombre="crT";
//var direccion="Calle 26 #107-45 NQS";
var zz=function(){
return llamado.validarUsuario(nombre);
}
var dir=function(){
    return llamado.validarDireccion(direccion);
    }

console.log("hola");
console.log(z());
console.log(x());
console.log(y());
console.log(sum());
console.log(zz());
console.log(dir());

//var nombre=document.getElementById("usuario").value;
