/*var frutas=["anana","manzana","pera","banana","zapote","otra"];
console.log(frutas.length);

var frutas2=[10];
frutas2[0]="manzana";
frutas2[1]="manzana1";
frutas2[2]="manzana2";
frutas2[3]="manzana3";
console.log(frutas2.length);

var a=["manzana",56,true];
console.log(a.length);
a.push("d");
console.log(a.length);
a.pop();
console.log(a.length);
a.push("d",56,45,3,true);
console.log(a.length);
console.log(a);
a=a.concat(["d",56,45,3,true]);
console.log(a.length);
console.log(a);

a.join("==>");//manzana ==> 56 ......
console.log(a);

var b="a.b.c.d.e";
var c=[];
c=c.concat(b.split("."));
console.log(c);

//ordenamiento
console.log(frutas);
frutas.sort();
console.log(frutas);
frutas.reverse();
console.log(frutas);


var numeros=[1,2,3,6,1,3,8,2,0];

numeros.sort();


//funciones
var numeros=["carlos","danuela","roman","duber"];
var fo=function(){
    console.log("algo tambien");
}
numeros.forEach(fo);

numeros.forEach(function(){
    console.log("algo mas tambien");
});

//funcion flecha con callback
numeros.forEach((e)=>console.log(e));
numeros.forEach((e,i)=>console.log(e,i));
numeros.forEach((e,i,a)=>console.log(a[0]));

console.log(numeros.every((e)=>e.length==1));
console.log(numeros.some((e)=>e.length==3));
var fr=numeros.map((e)=>e.length);
console.log(fr);
var fl=numeros.filter((e)=>e[0]=="d");
console.log(fl);*/

function mostrar(){
    
    function datos(nombre,apellido, telefono,correo,contrasena){
        this.nombre=nombre;
        this.apellido=apellido;
        this.telefono=telefono;
        this.correo=correo;
        this.contrasena=contrasena;
    }

    var a=document.getElementById("nombre").value;
    var b=document.getElementById("apellido").value;
    var c=document.getElementById("telefono").value;
    var d=document.getElementById("correo").value;
    var e=document.getElementById("contrasena").value;

    dato= new datos(a,b,c,d,e);
    console.log(dato);
    contenedor();
}

var arregoObjetos=[];
function contenedor(){
    arregoObjetos.push(dato);
    console.log(arregoObjetos);

    document.getElementById("mostraddatos").innerHTML+='<tr>  <td>'+dato.nombre+'</td><td>'+dato.apellido+'</td><td>'+dato.telefono+'</td><td>'+dato.correo+'</td><td>'+dato.contrasena+'</td></tr>';


}