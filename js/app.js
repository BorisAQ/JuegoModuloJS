    var puntuacion;
    var max = 7;
    var matriz = new Array(max + 2);
    var movimientos;
          var NroRotaciones;
          $(document).ready(function () {
              //Cambia color del titulo
              var color = "yellow";
              function cambiaColorTitulo() {
                  if (color == "yellow") {
                      $(".main-titulo").css({ 'color': 'white' });
                      color = "white";
                  } else {
                      $(".main-titulo").css({ 'color': 'yellow' });
                      color = "yellow";
                  }

              }
              setInterval(cambiaColorTitulo, 2000);
              //Inicio

              function llenaCaja() {
                  $('.panel-tablero div').each(function () {
                      for (var i = 1; i < 8; i++) {
                          var aleatorio = Math.floor(Math.random() * 3.9) + 1;
                          $(this).append('<div><img src="" class="elemento" /></div> ')

                    ;
                      }
                  }
            );
              }

              var rotarFila;
              function rotaFila() {
                  var fil = 7;
                  if (rotarFila == 7) {
                      clearInterval(intervaloRotacion);
                      iniciarJuego();
                  } else {
                      for (var col = 1; col <= 7; col++) {
                          $($('.col-' + col + ' div:nth-child(' + (fil) + ')')[0]).detach();
                          var aleatorio = Math.floor(Math.random() * 3.9) + 1;
                          $('.col-' + col).prepend('<div><img src="image/' + aleatorio + '.png" class="elemento" /></div> ')
                      }
                      rotarFila++;
                  }

              }




              function vaciaCaja() {
                  for (var i = 1; i < 8; i++) {
                      $('.panel-tablero .col-' + i + ' div').detach();
                  }
              }



              //alterna visible y no visible
              var visible = 1;

              function MostrarParpadeoSeleccionado() {
                  var atributo = 'opacity';
                  var valor = "0.0";
                  if (visible == 1) {
                      valor = '0.2'
                      visible = 2;
                  } else {
                      valor = '1.0'
                      visible = 1;
                  }
                  for (var a = 1; a <= max; a++) {
                      for (var b = 1; b <= max; b++) {
                          if (matriz[a][b] == 1) {
                              var e = $('.col-' + b + ' div:nth-child(' + a + ')')[0];
                              $(e).delay(1000).css(atributo, valor);

                          }

                      }
                  }
              }






              //Variables

              var intervalCronometro;
              var jugadasDisponibles;
              var maxCronometro;
              var interval;

              //Tiempos de demora;
              var intervaloParpadeoSeleccionado = 200;
              var tiempoParpadeoSeleccionado = 1000;
              var tiempoEliminaSeleccionados = 500;
              var tiempoLLenaCajaFaltante = 500;
              var ValorMaximoTiempo = 120;
              var tiempoCaida = 200;
              var timeOutEvalua;
              var timeOutEvaluaAntes;
              var timeOutEvaluaAntes1;
              var intervaloSeleccionado;
              var finJuego;
              var timeOutjuegoTerminado;
              var intervaloRotacion;
              var intervaloRotacionFila;

              function iniciarJuegoRotacion() {
                  vaciaCaja();
                  llenaCaja();
                  rotarFila = 0;
                  finalizaIntervalosTimeOut();
                  intervaloRotacion = setInterval(rotaFila, tiempoCaida);
              }


              function iniciarJuego() {
                  $(".btn-reinicio").text("Reiniciar");
                  $(".panel-tablero").show('fast');
                  $(".time").show('fast');
                  $("#timer").text('02:00');
                  $(".panel-score").width("25%");
                  $(".panel-score .main-titulo").remove();

                  movimientos = 0;
                  puntuacion = 0;
                  maxCronometro = ValorMaximoTiempo;
                  finJuego = false;
                  intervalCronometro = setInterval(cronometro, 1000);
                  $("#score-text").text(puntuacion);
                  timeOutjuegoTerminado = setTimeout(function () {
                      clearInterval(intervalCronometro);
                      juegoTerminado();
                  }, ValorMaximoTiempo * 1000);
                  puntuacion = 0;
                  evaluaJuego();


              }

              var colCajaFaltante;
              function evaluaJuego() {
                  jugadasDisponibles = false;
                  iniciaMatriz();
                  evaluaJuegoFilas();
                  evaluaJuegoColumnas();
                  intervaloSeleccionado = setInterval(MostrarParpadeoSeleccionado, intervaloParpadeoSeleccionado);
                  timeOutEvaluaAntes = setTimeout(function () {
                      clearInterval(intervaloSeleccionado);
                      visible = 2;
                      MostrarParpadeoSeleccionado();
                      timeOutEvaluaAntes1 = setTimeout(function () {
                          eliminaSeleccionados();
                          timeOutEvalua = timeOutEvalua = setTimeout(function () {
                              llenaCajaFaltante();
                              agregaDyD();
                              if (jugadasDisponibles == true) {
                                  evaluaJuego();
                              }
                          }, tiempoLLenaCajaFaltante);
                      }, tiempoEliminaSeleccionados);
                  },
            tiempoParpadeoSeleccionado);
              }

              var columnaReemplaza;
              var filaReemplas;
              function reemplaza() {

              }

              //Matriz

              function iniciaMatriz() {
                  for (var a = 0; a < max + 1; a++) {
                      matriz[a] = new Array(max + 1);
                      for (var b = 0; b < max + 1; b++) {
                          matriz[a][b] = 0;

                      }
                  }
              }


              //Evalua
              function evaluaJuegoFilas() {
                  var col;
                  var fil = 1;
                  var figura1;
                  var a, b;
                  var limIni, limFin;
                  var sw;
                  for (fil = 1; fil <= max; fil++) {
                      col = 1;
                      auxiliar = "";
                      sw = 0;
                      limIni = 0;
                      limFin = 0;
                      //figura1 = $($('.col-' + col + ' div:nth-child(' + fil + ') img')[0]).attr('src');
                      while (col <= max) {
                          if (auxiliar == $($('.col-' + col + ' div:nth-child(' + fil + ') img')[0]).attr('src')) {
                              sw = sw + 1;
                              limFin = col;

                          } else {
                              if (sw >= 3) {
                                  actualizaFila(fil, limIni, limFin);
                              }
                              auxiliar = $($('.col-' + col + ' div:nth-child(' + fil + ') img')[0]).attr('src');
                              limIni = col;
                              limFin = col;
                              sw = 1;
                          }
                          col++;
                      }
                      if (sw >= 3) {
                          actualizaFila(fil, limIni, limFin);
                      }

                  }
              }


              function evaluaJuegoColumnas() {
                  var col;
                  var fil = 1;
                  var figura1;
                  var a, b;
                  var limIni, limFin;
                  var sw;
                  for (col = 1; col <= max; col++) {
                      fil = 1;
                      auxiliar = "";
                      sw = 0;
                      limIni = 0;
                      limFin = 0;
                      while (fil <= max) {
                          if (auxiliar == $($('.col-' + col + ' div:nth-child(' + fil + ') img')[0]).attr('src')) {
                              sw = sw + 1;
                              limFin = fil;

                          } else {
                              if (sw >= 3) {
                                  actualizaColumna(col, limIni, limFin);
                              }
                              auxiliar = $($('.col-' + col + ' div:nth-child(' + fil + ') img')[0]).attr('src');
                              limIni = fil;
                              limFin = fil;
                              sw = 1;
                          }
                          fil++;
                      }
                      if (sw >= 3) {
                          actualizaColumna(col, limIni, limFin);
                      }
                  }
              }

              function actualizaFila(fila, limColInicial, limColFinal) {
                  for (var i = limColInicial; i <= limColFinal; i++) {
                      matriz[fila][i] = 1;
                      jugadasDisponibles = true;
                  }
              }

              function actualizaColumna(columna, limFilInicial, limFilFinal) {
                  for (var i = limFilInicial; i <= limFilFinal; i++) {
                      matriz[i][columna] = 1;
                      jugadasDisponibles = true;
                  }
              }

              //funcion que elimina los seleccionados
              function eliminaSeleccionados() {
                  for (var a = max; a > 0; a--) {
                      for (var b = 0; b < max + 1; b++) {
                          if (matriz[a][b] == 1) {
                              // alert(a + ', ' + b);
                              $($('.col-' + b + ' div:nth-child(' + a + ')')[0]).remove();
                              if (finJuego == false) {
                                  puntuacion = puntuacion + 10;
                              }


                          }
                      }
                  }
                  actualizaPuntuacion();
              }


              //Adiciona elementos faltantes



              function llenaCajaFaltante() {
                  var cantidadExistente;
                  for (var i = 1; i <= max; i++) {
                      cantidadExistente = $(".col-" + i + " div").length;

                      for (var j = 1; j <= max - cantidadExistente; j++) {
                          var aleatorio = Math.floor(Math.random() * 3.9) + 1;

                          $(".col-" + i).prepend('<div><img src="image/' + aleatorio + '.png" class="elemento"/></div>')

                      }

                  }
              }






              function actualizaPuntuacion() {
                  $("#score-text").text(puntuacion);
              }


              //Agrega draggable y droppable

              function agregaDyD() {
                  $(".elemento").draggable({
                      start: function () {
                          var left1 = $(this).position().left;
                          var top1 = $(this).position().top;
                          $(this).data("orgLeft", left1);
                          $(this).data("orgTop", top1);
                      }
                  });



                  $(".elemento").droppable({
                      drop: function (event, ui) {
                          var left1 = ui.draggable.data("orgLeft");
                          var top1 = ui.draggable.data("orgTop");

                          //  alert("draggable: " + top11 + "," + left11);
                          var left2 = $(this).position().left;
                          var top2 = $(this).position().top;
                          // alert("dropablle: " + top2 + "," + left2);
                          if (top2 > top1) {
                              varTop = "-=" + (top2 - top1);
                          } else {
                              varTop = "+=" + (top1 - top2);
                          }

                          if (left2 > left1) {
                              varLeft = "-=" + (left2 - left1);
                          } else {
                              varLeft = "+=" + (left1 - left2);
                          }


                          $(this).animate({ top: varTop, left: varLeft }, 500, function () {
                              var imagen1 = ui.draggable.attr("src");
                              var imagen2 = $(this).attr("src");
                              ui.draggable.attr('src', imagen2);


                              $(this).attr("src", imagen1);
                              $(this).removeAttr('style')


                              ui.draggable.removeAttr('style')
                              movimientos = movimientos + 1;
                              actualizaMovimientos();
                              finalizaIntervalosIntermedios();
                              evaluaJuego();

                          });

                      }
                  });
              }

              function actualizaMovimientos() {
                  $("#movimientos-text").text(movimientos);
              }


              //Funcion cronometro
              function cronometro() {
                  maxCronometro = maxCronometro - 1;
                  if (maxCronometro >= 0) {
                      var min = Math.floor(maxCronometro / 60);
                      var seg = maxCronometro - min * 60;
                      if (min < 10) {
                          var minMostrar = "0" + min;
                      } else { minMostrar = min };
                      if (seg < 10) {
                          var segMostrar = "0" + seg;
                      } else { segMostrar = seg };

                      $("#timer").text(minMostrar + ":" + segMostrar);
                  }
              }

              function finalizaIntervalosIntermedios() {

                  clearInterval(interval);
                  clearInterval(intervaloRotacion);
                  clearInterval(intervaloParpadeoSeleccionado);
                  clearInterval(intervaloSeleccionado);
                  clearTimeout(timeOutEvalua);
                  clearTimeout(timeOutEvaluaAntes);
                  clearTimeout(timeOutEvaluaAntes1);
                  clearInterval(intervaloRotacionFila);

              }

              function finalizaIntervalosTimeOut() {
                  clearInterval(intervaloRotacion);
                  clearInterval(interval);
                  clearInterval(intervalCronometro);
                  clearInterval(intervaloParpadeoSeleccionado);
                  clearInterval(intervaloSeleccionado);
                  clearTimeout(timeOutEvalua);
                  clearTimeout(timeOutEvaluaAntes);
                  clearTimeout(timeOutEvaluaAntes1);
                  clearTimeout(timeOutjuegoTerminado);
                  clearInterval(intervaloRotacionFila);

              }

              function juegoTerminado() {
                  $(".panel-tablero").hide(3000);
                  $(".time").hide(3000);
                  $(".panel-score").width("100%")
                  $(".panel-score").prepend("<h1 class='main-titulo'>Juego Terminado</h1>")
                  $(".panel-score .main-titulo").css('text-align', 'center')

                  $(".btn-reinicio").text("Iniciar");
                  finalizaIntervalosTimeOut();




                  finJuego = true;
              }

              jugadasDisponibles = false;
              //Boton Reinicio /Inicio



              $(".btn-reinicio").click(function () {

                  iniciarJuegoRotacion();

              })





          });