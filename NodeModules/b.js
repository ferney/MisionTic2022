const a="carlos";

function lenguajes(){
    return {id:1,nombre:"java"};
}

function variables(){
    return [
    {id:1,nombre:"var"},
    {id:2,nombre:"let"},
    {id:3,nombre:"const"}];
}

function suma(n1,n2){
    return n1+n2;
}

function validarUsuario(nom){
let x=nom;

if(x===""||x===null||x.length===0||/^\s+$/.test(x)||x.length<=3||x.length>=30){
    return "ingrese correctamente el campo";
}

}

function validarDireccion(dir){
    let y=dir;
    if(/^\s+$/.test(y)){
        return "direccion no valida";
    }
    
    }

module.exports={a,lenguajes,variables,suma,validarUsuario,validarDireccion};


/*
module.exports.a=a;
module.exports.lenguajes=lenguajes;
module.exports.variables=variables;
module.exports.suma=suma;
module.exports.validarUsuario=validarUsuario;
module.exports.validarDireccion=validarDireccion;*/

