<template>
    <div id="helpM">
        <img src="../assets/iWouldLike2.png" alt="branding logo" id="logo">
        <h1>Identificador: {{token}}</h1>
        <div class="group">
            <h3>¿Para qué sirve mi identificador?</h3>
            <p class="pStyle">El identificador es una secuencia de números que usa el servidor (el programa que envia/guarda los datos) para 
                saber quien eres y asi saber que mostrarte. Si tu navegador no envia ese identificador, el servidor rechazará cualquier 
                cosa que le pidas desde tu navegador.
            </p>

            <p class="pStyle">El identificador solo se genera cuando haces clic en "Continuar", si no lo has hecho, por esa razón tal vez te diga "Autenticación requerida o invalida" en algún 
                momento.
            </p>
        </div>

        <div class="group">
            <h3>Instrucciones para participar</h3>
            <p class="pStyle">
                Antes que nada, deberas leer los conceptos de participación, asi sabras si quieres o no participar. si no quieres participar, 
                solo cierras al página y ahí queda todo, pero si quieres participar entonces debes hacer clic donde dice "Continuar", luego la aplicación 
                te mostrará las preguntas, si ya las contestaste anteriormente, el servidor lo verificará y no te permitira rellenar las preguntas de nuevo.
            </p>

            <p class="pStyle">
                Las preguntas se guardan cuando tienen alguna respuesta seleccionada o escrita, si no tiene respuesta seguiras viendolas hasta que conteste todo. 
                Cuando hayas contestado todo, la aplicación te mostrará un mensaje indicandolo, ahi podras ver todas las respuesta y si alguna no te gusta o quieres cambiarla 
                podras borrarla, si borras alguna deberas respoderla de nuevo para ver la opcion de enviar que aparece junto con la de ver las respuestas que hayas puesto.
            </p>

            <p class="pStyle">
                Es importante mencionar que si no le das clic al boton de "enviar", no podré ver tus respuestas ya que solo estarán guardadas en tu dispositivo. 
                Cuando las hayas enviado te enviará a otra página con más detalles sobre la aplicación y que te dará acceso a otras partes de la misma. Luego, si ya no te 
                interesa más nada, solo tienes que cerrar la página para salir.
            </p>
        </div>

        <div class="group">
            <h3>¿Que significa cada ícono?</h3>

           <div>
                <img src="../assets/help.svg" alt="help"> 
                <p>Si le haces click te mostrará la pagina con ayuda.</p>
           </div>

            <div>
                <img src="../assets/info.svg" alt="info"> 
                <p>Te muestra información sobre la aplicación y cual es el proposito de conocer tus respuestas.</p>
            </div>

            <div>
                <img src="../assets/problem.svg" alt="problem"> 
                <p>Si ves que la aplicación tiene algo extraño o que te dificulta usarla, puedes usar ese ícono para dejarme un 
                    mensaje explicando el inconveniente que se te presentó, para asi poder verificarlo y arreglarlo. Tienes varias opciones,
                    puedes elegir la que más te convenga. 
                </p>
            </div>

            <div>
                <div id="back" v-on:click="goBack()">
                    <span>{{char_01}}</span>
                </div>
                <p>Lo veras cuando estes rellenando las preguntas, te servira para volver a una pregunta que ya habias pasado. Si has puesto una 
                    respuesta y lo usas, la respuesta no se va a guardar.
                </p>
            </div>

            <div>
                <div id="next" v-on:click="goNext()">
                    <span>></span>
                </div>
                <p>Lo veras cuando estes rellenado las preguntas, te servira para avanzar a la pregunta siguiente con la diferencia que si 
                    haz puesto una respuesta, la guardará.
                </p>
            </div>

            <p class="pStyle">
                También es bueno mencionar que los <span class="router">textos como este</span> sirven para enviarte a donde está otra información 
                u otra parte de la aplicación (enlace o link). El logo de la parte superior izquierda puede ser usado para regresar a la página de 
                inicio de la aplicación, donde explico el objetivo y el por qué de la encuesta.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    computed : {
        token() {
            let auth = localStorage.getItem("auth")

            if(auth != null) {
                auth = JSON.parse(auth)
                return auth.id
            } else return "-"
        }
    },
    data() {
        return {
            char_01: "<",
       }
    }

}
</script>


<style scoped>
.router {
    text-decoration: none;
    color: #79c471;
}

.group {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 2px solid #fff;
    display: flex;
    flex-direction: column;
    background: #c9c9c93d;
    padding-bottom: 30px;
}

#helpM {
    margin-bottom: 20px;
}

@media only screen and (max-width: 750px) {
  #helpM {
    height: auto;
    cursor: default;
    padding-top: 9vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #logo {
    height: 175px;
    width: 270px;
  }

  h1 {
    text-align: center;
    margin: 0 10px 15px 10px;
  }

  h3 {
    text-align: center;
    margin: 10px 10px 15px 10px;
  }

  p {
    margin: 0 10px 15px 10px;
    font-size: 17px;
    text-align: justify;
  }
  img {
      height: 45px;
      margin: 5px 0;
  }

  .group {
    margin: 10px 5px 30px 5px;
  }

    .group div {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
  
    #next {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #back {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #next span {
        text-align: center;
        font-size: 45px;
        width: 60px;
        padding-bottom: 8px;
    }

    #back span {
        text-align: center;
        font-size: 45px;
        width: 60px;
        padding-bottom: 8px;
    }

    #next:active span {
        background: #79c471;
        border-radius: 50%;
    }

    #back:active span {
        background: #79c471;
        border-radius: 50%
    }

}

@media only screen and (min-width: 751px) {

    #helpM {
        height: auto;
        cursor: default;
        margin: 0 auto 15px auto;
        padding-top: 7.5vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 350px;
        max-width: 1366px;

    }

    #logo {
        height: 250px;
        width: 360px;

    }

    h1 {
        text-align: center;
        margin: 0 10px 15px 10px;
    }

    h3 {
        text-align: center;
        margin: 10px 10px 15px 10px;
        font-size: 24px;
    }

    p {
        margin: 0 20px 0px 10px;
        font-size: 19px;
        text-align: justify;
    }

    .pStyle {
        margin: 0 50px 15px 50px;
    }

    img {
        height: 70px;
        margin: 10px 10px;
    }

    .group {
        margin: 10px 35px 25px 35px;
    }

    .group div {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    #next {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #back {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #next span {
        text-align: center;
        font-size: 52px;
        width: 70px;
        height: 70px;
        margin: 10px 10px;
    }

    #back span {
        text-align: center;
        font-size: 52px;
        width: 70px;
        height: 70px;
        margin: 10px 10px;
    }

    #next:hover span {
        background: #79c471;
        border-radius: 50%;
        transition: all .5s;
    }

    #back:hover span {
        background: #79c471;
        border-radius: 50%;
        transition: all .5s;
    }
}



</style>