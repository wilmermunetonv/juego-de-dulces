$(document).ready(function(){
//definicion de variables
var numeroaleatorio
var numeromovimientos=0
var puntos=0
var total=0
gris($(".main-titulo"))
//aqui se hace un ciclo infinto de alternacion de colores del titulo
function gris(elemento){
  $(elemento).animate({
    color:"gray"
  },1000,function(){amarillo(elemento)})

}
function amarillo(elemento){
 $(elemento).animate({
   color:"yellow"
 },1000,function(){gris(elemento)})

}
//aqui se asignan los dulces aleatoriamente al pulsar iniciar
$(".btn-reinicio").click(function(){
  col=0
  fil=0
$(".time").show()
$(".panel-tablero").show()
puntos=0; total=0; numeromovimientos=0 //se reinicia la puntuacion
$(".btn-reinicio").text("Reiniciar")
$("#movimientos-text").text("0")
$("#score-text").text("0")
$(".panel-score").stop(); $(".panel-score").css("width","25%")//se detiene la animacion que muestra las estadisticas y vuelve a su tamaño original
var imagen=$("img")
imagen.hide()
for(var i=0;i<imagen.length;i++){//se recorren todas las imagenes
 numeroaleatorio=Math.floor(Math.random()*4)+1//se asiganan numeros aleatorios
$(imagen[i]).attr("src","image/"+numeroaleatorio+".png")//ya recorridas las imagenes se le asigna el atributo src con una imagen aleatoria
$(imagen).show()//se muestra la imagen en pantalla usando show
}
analisis()
time()
})
//se invocan estos dos metodos para comprobar combinaciones en filas y columnas
function analisis(){
  var cc=coincidircolumnas()
  var ff=coincidirfilas()
if(cc==false&&ff==false){prueba()}
}
//aqui se invoca la funcion para que averigue la posicion de las imagenes
function coincidircolumnas(){
//se crean dos for, una para recorrer cada columna y otro hijo por hijo de la respectiva columna
var col=false
for(var c=1; c<=7;c++){
for(var f=1; f<=7;f++){
 var imagen1=$(".col-"+c).children("img:nth-child("+f+")").attr("src")
 var imagen2=$(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
 var imagen3=$(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")
 //se evalua si hay combinaciones haciendo matches de a 3 dulces, si lo hay se oculta la imagen con un efecto, y se remueve del DOM
if(imagen1==imagen2&&imagen2==imagen3){
$(".col-"+c).children("img:nth-child("+f+")").hide("pulsate",2000,function(){$(this).remove()})
$(".col-"+c).children("img:nth-child("+(f+1)+")").hide("pulsate",2000,function(){$(this).remove()})
$(".col-"+c).children("img:nth-child("+(f+2)+")").hide("pulsate",2000,function(){$(this).remove();})
//se invoca la funcion para agregar nuevos dulces
col=true
setTimeout(moverimagenes,3500)

}}}return col


}
//hace casi exactamente lo mismo que el recorrido para las columnas con la diferencia del modo como se intercambian los for
function coincidirfilas(){
fil=false
for(var c=1; c<=7;c++){
for(var f=1; f<=7;f++){
 var imagen1=$(".col-"+f).children("img:nth-child("+c+")").attr("src")
 var imagen2=$(".col-"+(f+1)).children("img:nth-child("+c+")").attr("src")
 var imagen3=$(".col-"+(f+2)).children("img:nth-child("+c+")").attr("src")
if(imagen1==imagen2&&imagen2==imagen3){
$(".col-"+f).children("img:nth-child("+c+")").hide("pulsate",1000,function(){$(this).remove()})
$(".col-"+(f+1)).children("img:nth-child("+c+")").hide("pulsate",1000,function(){$(this).remove()})
$(".col-"+(f+2)).children("img:nth-child("+c+")").hide("pulsate",1000,function(){$(this).remove();})
fil=true
setTimeout(moverimagenes,3500)

}}}return fil

}
//aqui se generan nuevos dulces para rellenar los espacios de los que fueron ya removidos
function moverimagenes(){
  //aqui se crean dos iteradores para recorrer los posibles espacios en blanco que dejaron los dulces removidos
  //si encuentra un espacio en blanco lo rellena con un dulce aleatorio colocandolo en primera posicion con prepend
for(var c=1;c<=7;c++){
for(var f=1;f<=7;f++){
if($(".col-"+f).children("img:nth-child("+c+")").html()==null){
  numeroaleatorio=Math.floor(Math.random()*4)+1;
  sumadepuntaje(puntos+=1) //se incrementa en mas uno cada vez que se añade un nuevo dulce, o es lo mismo que cuando se elimina
                          //y se le va pasando a la funcion de sumatoria de puntos
  $(".col-"+f).prepend("<img class='elemento'src='image/"+numeroaleatorio+".png'>");}
}

}
//ya que al agregar nuevos dulces pueden haber nuevas combinaciones se vuelve a invocar la evaluacion de filas y columnas para determinar nuevas combinaciones

$("img").show();
$("img").show();

analisis()
}
//aqui se hace la sumatoria de puntos y se muestra en pantalla
function sumadepuntaje(points){
total=(points*10)//se multilica por 10 cada dulce que desaparece
var p=total.toString()//se convierte en cadena de caracteres
$("#score-text").text(p)//se muestra en pantalla
}
//se hace un conteo de tiempo regresivo
function time(){
  $("#timer").timer({
duration:"2m",
format:"%M:%S",
countdown:true,
callback: function(){
  $("img").finish()//termina las animaciones incluido el draggable
  $("#timer").timer("remove");//al terminar el tiempo se remueve el tiempo para volver a ser contabilizado desde 2 minutos
  $(".time").hide()//se oculta la ventana que muestra el tiempo
  $("img").hide()//se ocultan de nuevo las imagenes
  $(".panel-tablero").hide()//y se oculta el tablero de las imagenes
  $(".panel-score").animate({width:"100%"},2000)//se crea una animacion para que las estadisticas se muestren en toda la pantalla
}
  })
}
//esta funcion es llamada cada vez que no haya combinacion alguna de filas y columnas
function prueba(){
  var atributo;
  var atributo2
  var dulce1
  var dulce2
//dentro de la funcion se utiliza el draggable para el arrastre de imagenes
$("img").draggable({
  revert:"valid",
  containment:"parent",
  start:function(event,ui){
dulce1=this
atributo=$(this).attr("src")
  }
})
//en el droppable se intercambian los atributos de las dos imagenes
//y cambian su posicion al dejar revert en valid en el draggable
$("img").droppable({
  accept:"img",
  drop: function(event, ui){
dulce2=this
atributo2=$(this).attr("src")
$(dulce2).attr("src",atributo)
$(dulce1).attr("src",atributo2)
//se van acumulando los numeros de movimientos y se marcan en pantalla
//y por ultimo se vuelve a invocar la funcion que llama la inspeccion de columnas y filas en busqueda de mas combinaciones
numeromovimientos+=1
$("#movimientos-text").text(numeromovimientos)
setTimeout(analisis,500)
  }
})
}

})
