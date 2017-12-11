$(document).ready(function(){
var sprites = ["sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png"];

var palavraEscolhida = "";
var letrasUsadas =[];
var letrasErradas =[];
var letrasTentadas = document.getElementsByClassName("teste");
var erros = 0;
var acertos = 0;
var venceu =  true;
var final = false;
var palavrasN = 0;
var palavrasUsadas=[];
var indiceEscolhido = 0;
var pontos = 0;
var soma = 0;
document.getElementById("enforcado").style.backgroundImage = "url('"+sprites[erros]+"')";
    $.post('gerenciadorDB.php', {"funcao":"numeroPalavras"}, function(result) { 
     palavrasN =result;    

    receberPalavra();

    });

    function escolherIndice(){
       indiceEscolhido = Math.floor(Math.random() * palavrasN ) + 1;
 
        for (i=0; i<palavrasUsadas.length;i++){
        if (palavrasUsadas[i] == indiceEscolhido){
          escolherIndice();
      } 
    }
}
    MostrarPontos = function(){
        document.getElementById("dica").innerHTML = "<p>Pontos : " + pontos + "</p>";
        if(pontos != 0){
            text= "<p id='soma' style='color:red'>(+" + soma + ")</p>";
              document.getElementById("dica").innerHTML += text;
        setTimeout(function(){
            document.getElementById("soma").style.display = "none";
        }, 2000);
        }

    }
function receberPalavra(){
escolherIndice(); 
final = false;


    $.post('gerenciadorDB.php', {"funcao":"escolherPalavra", "id":indiceEscolhido}, function(result){
            palavraEscolhida = result;
            EscreverPalavra();
        });
    }
    EscreverPalavra = function(){
        MostrarPontos();

        for (i = 0; i < palavraEscolhida.length; i++){
            var adc = "<div class='letra' id='letra"+i+"'>_</div>";
            palavra.innerHTML += adc;
        }
        $("#main").fadeIn();
    }
    
    TestarLetra = function(entrada){
        document.getElementById("tentativa").value = "";
        entrada = entrada[0];
        correta= false;
        
        // TESTAR SE LETRA JÁ FOI USADA NA PALAVRA OU NAS TENTATIVAS 
        
        for (i = 0; i < letrasUsadas.length; i++){
            if(entrada == letrasUsadas[i]){
                for(i=0; i<letrasTentadas.length; i++){
                    if(letrasTentadas[i].innerHTML == entrada){
                       colorchange(letrasTentadas[i]);
                    }
                }
                for(i=0; i<palavra.children.length; i++){
                    if(entrada == palavra.children[i].innerHTML){
                        colorchange(palavra.children[i])
                    }
                } 
                return;} 
            }

        
        var letras = document.getElementsByClassName("letra");
        var trocar = [];
        letrasUsadas.push(entrada);
        for (i = 0; i < letras.length; i++){
            //Testa se a letra entrada é igual a da palavra escondida, incluindo possíveis acentos
            if ((palavraEscolhida[i] == entrada)||(((palavraEscolhida[i] == "Ã")||(palavraEscolhida[i] == "Á")||(palavraEscolhida[i] == "À")||(palavraEscolhida[i] == "Â"))&&(entrada =="A")) || (((palavraEscolhida[i] == "Õ")||(palavraEscolhida[i] == "Ó")||(palavraEscolhida[i] == "Ò") ||(palavraEscolhida[i] == "Ô")) &&(entrada =="O")) ||(((palavraEscolhida[i] == "I")||(palavraEscolhida[i] == "Î")||(palavraEscolhida[i] == "Ì") ||(palavraEscolhida[i] == "Í")) &&(entrada =="I"))||(((palavraEscolhida[i] == "É")||(palavraEscolhida[i] == "È")||(palavraEscolhida[i] == "Ê")) &&(entrada =="E"))||(((palavraEscolhida[i] == "Ú")||(palavraEscolhida[i] == "Ù")||(palavraEscolhida[i] == "Û")) &&(entrada =="U"))||((palavraEscolhida[i] == "Ç") &&(entrada =="C"))){
            $("#letra"+i).fadeOut(300);
            acertos +=1;
            correta = true;
            trocar.push(i)
        }

        }
        setTimeout(function(){
        for (i = 0; i < trocar.length; i++){
            letras[trocar[i]].innerHTML = palavraEscolhida[trocar[i]];
            $("#letra"+trocar[i]).fadeIn(100, function(){
              ChecarVitoria();
            });
        }            
            
        }, 400);

        if((!correta)&&(/^[A-z]+$/.test(entrada))&&(entrada != undefined)){

          letrasErradas.push(entrada)
            document.getElementById("tentativa"+letrasErradas.length).innerHTML += entrada;
         
            $("#tentativa"+letrasErradas.length).fadeIn();
          erros +=1;
        }
      document.getElementById("enforcado").style.backgroundImage = "url('"+sprites[erros]+"')";

     if(erros >= 5){
       setTimeout(
         function(){
       fimJogo(false);}, 300);
     }
    }
      ChecarVitoria = function(){
           var display = [];
        for(i=0; i<palavra.children.length; i++){
                display.push(palavra.children[i].innerHTML);
        }
      x = display.toString();
      x= x.replace(/,/g,"");
      if(x == palavraEscolhida){
        setTimeout(function(){
                          fimJogo(true);}, 300);

      }
      }
    function fimJogo(venceu){
    if(venceu){
      $("#main").fadeOut(function(){
          soma = 150 - erros*10;
          pontos += soma;
          erros -=2;
          if (erros < 0)
          {
              erros = 0;
          }
          IniciaProxLv();
    });}
     else{ 
      for(i=0; i<letrasTentadas.length; i++){
              colorchange(letrasTentadas[i]);
     }
         MostraCorreta();
         setTimeout(function(){
                    $("#main").fadeOut(function(){
  document.getElementById("palavra").innerHTML = " Fim do jogo </div>";
      document.getElementById("palavra").style.color = "red";
final = true;
      $("#palavra").fadeIn();
    setTimeout(function(){
        y = "<p id='pergunta'> Qual o seu nome? </p> <input type='text' class='nomeJogador' id='nomeJogador' autofocus> <button class='enviaPontos' id='enviaPontos'>Enviar</button> <section id='dica'></section>";
        document.getElementById("jogador").innerHTML = y;
   $("#main").fadeIn();
    }, 400);
});
    }, 1200);  
     }
    }
$("#enviar").click(function(){
a = document.getElementById("tentativa").value.toUpperCase();
TestarLetra(a);
$("#enviar").css("background-color", "red");
setTimeout(function(){
$("#enviar").css("background-color", "black");},200); 
  });


$("body").on("click", ".enviaPontos", function(){
EnviaPontos();
      colorchange(document.getElementById('#enviaPontos'));
});

$("body").on("keyup", ".nomeJogador", function(e){
    if(e.keyCode == 13){
        $(".enviaPontos").click();
      $(".enviaPontos").css("background-color", "red");
setTimeout(function(){
$(".enviaPontos").css("background-color", "black");
},200); 
    }
});

$("#tentativa").keyup(function(event){
    if(event.keyCode == 13){
        $("#enviar").click();
      $("#enviar").css("background-color", "red");
setTimeout(function(){
$("#enviar").css("background-color", "black");
},200); 
    }
});
    
$("#pular").click(function(){
   
    PularPalavra();
});
$("#aleatorio").click(function(){
   
    Dica();
});

PularPalavra = function(){
    $("#pular").remove();
    $("#main").fadeOut(function(){
   
    MostraCorreta();
    setTimeout(function(){
        IniciaProxLv();
    }, 500);
    });

}

Dica = function(){
 b = Math.floor(Math.random() * palavraEscolhida.length );
a = palavraEscolhida[b];
    for (i = 0; i < letrasUsadas.length; i++){
            if(a == letrasUsadas[i]){
               Dica();
                }
                
}
    $("#aleatorio").remove();
TestarLetra(a);
}

MostraCorreta = function(){
    espaco = document.getElementById("palavra").children;
    for (i = 0; i < espaco.length; i++){
            espaco[i].innerHTML = palavraEscolhida[i];
            $("#letra"+i).fadeIn(100, function(){
            });
        }        
}
IniciaProxLv = function(){
              letrasUsadas =[];
          letrasErradas =[];
          for(i = 0; i < letrasTentadas.length; i++){
              letrasTentadas[i].innerHTML = "";
          }
        document.getElementById("enforcado").style.backgroundImage = "url('"+sprites[erros]+"')";

          document.getElementById("palavra").innerHTML = "";
          
          $(".teste").fadeOut(function(){$(".teste").fadeIn();});
           receberPalavra();
 
      
       }

EnviaPontos = function(){

         nome = document.getElementById ("nomeJogador").value;
         entrada = {"funcao":"enviarPontos", "nome":nome, "pontos":pontos};
$("#main").fadeOut();
         $.post("gerenciadorDB.php" , entrada , function(result){
             RecebeTabela();
         });    

}
  
     
     function RecebeTabela(){
document.getElementById("main").innerHTML = "<div id='tabela'></div>"
         $.post("gerenciadorDB.php", {"funcao":"recebeTabela"}, function(result){
            $("#tabela").append(result);
$("#main").append("<a href='https://llag.000webhostapp.com/'><button id='novamente'> Jogar novamente? </button></a>")
$("#main").fadeIn();
             
         });
         
     }
    colorchange = function(elemento) {
        if (elemento.style.webkitAnimationName !== 'colorchange') {
            elemento.style.webkitAnimationName = 'colorchange';
            elemento.style.webkitAnimationDuration = '1s';

            // make sure to reset the name after 4 seconds, otherwise another call to colorchange wont have any effect
            setTimeout(function() {
                elemento.style.webkitAnimationName = '';
            }, 1000);
        }
    }
    
});