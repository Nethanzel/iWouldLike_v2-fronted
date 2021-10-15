<template>

  <div id="done">

    <div class="ils_cont">
      <img src="../assets/done.png" class="ils" />
    </div>

    <div class="grtng">
      <h1>¡Ya has participado! Gracias por ayudar.</h1>
      <p class="center">Por favor pidele a tus amgios que tambien participen. <strong>Para salir solo tienes que cerrar la página</strong></p>

      <p class="center">Si quieres ver el progreso de la recoleccion de datos, <router-link :to="{name: 'Overview'}">aqui</router-link> 
        podras ver un resumen.</p>

      <p class="center">A continuacion podras ver todas tus respuestas:</p>

      <div id="answersView"> </div>

      <p>Este proyecto es de código abierto (open source), puedes acceder al <a href="https://github.com/Nethanzel/i_would_like_to_ask" target="_blank">
        repositorio en Github</a>. <strong>Si quieres recibir el resultado de la investigación, <router-link :to="{name: 'Report'}">
        envia un reporte</router-link> con tu correo y especificando que quieres recibirlo.</strong> Recuerda que tambien puedes 
        enviar algún reporte sobre tu experiencia al usar la aplicación, ya sea por errores que presente o alguna idea/critica que
        quieras aportar, será bien recibida.
      </p>
    </div>    
  </div>

</template>

<script>
import { format, register } from 'timeago.js';
// eslint-disable-next-line no-unused-vars
register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'in %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index])

const timeago = timestamp => format(timestamp, 'es_ES')

export default {
    name: "done",
    title: "I would like to ask...",

    methods: {
        loadAnswers() {
            let ansView = document.getElementById("answersView");
            ansView.innerHTML = "";
            ansView.style.display = "flex";

            let storage = localStorage.getItem("questionStorage");
            let sttus = localStorage.getItem("iwouldliketoask");
                      
            sttus = JSON.parse(sttus);

            if(storage == null || sttus == null) {
              this.$router.push({name: "Survey"});
              this.messageBox("No ha completado la encuesta.", 2);
            }

            if(sttus == null) {
              return this.$router.push({name: "Survey"})
            }

            if(sttus.sent !== undefined) {
              ansView.innerHTML = "<p>Enviado " + timeago(new Date(sttus.sent), 'es_ES') + "</p>";
              storage = JSON.parse(storage)
              let answers = storage.questions

              for(let i = 0; i < answers.length; i++) {
                ansView.innerHTML += `
                    <div class="answerEl">
                        <div class="qaView">
                            <p class="q">${answers[i].question}</p>
                            <p class="a">R: "${answers[i].answer}"</p>
                        </div>
                    </div>
                `
              }
            } else {
              this.$router.push({name: "Survey"});
              ansView.innerHTML = "<h2>No hay respuestas para mostrar.</h2>";
              this.messageBox("No ha completado la encuesta.", 2);
            }
        },
    },

    mounted() {
        this.loadAnswers()
    }
}
</script>

<style>

.grtng {
  margin-top: -25px;
}

#done a {
    text-decoration: none;
    color: #79c471;
}

h3 {
  text-align: center;
}

#done #answersView {
    border: 1px solid #ffffff8a;

    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    max-width: 75%;
    display: none;
    flex-direction: column;
    align-items: center;
}

#done .answerEl {
    display: flex;
    border: 2px solid #fff;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    background: #ffffff3b;
    margin-bottom: 10px;
    max-width: 90%;
}

#done .q {
  color: #fff;
  margin: 5px 0 10px 0;
  font-weight: bold;
  overflow: auto;
  overflow-wrap: break-word; 
  max-width : 100%;
  text-align: center;
}

#done .a {
  color: rgba(255, 255, 255, 0.733);
  margin: 5px 0;
  font-style: italic;
  overflow-wrap: break-word; 
  max-width : 100%;
  text-align: left;
}

#done h2 {
    text-align: center;
}

@media only screen and (max-width: 750px) {

    #done {
        height: auto;
        cursor: default;
        padding: 0 10px;
        padding-top: 9.5vh;
    }

    #done h1 {
        text-align: center;
        margin: 5px 0 15px 0 ;
    }

    #done p{
        text-align: justify;
        font-size: 17px;
        margin: 20px 0 10px 0;
    }
  #done .center {
    text-align: justify;
  }

  #done #answersView {
    margin: 20px auto;
    padding: 15px 4px;
    width: 100%;
    max-width: 95%;
  }

  #done .answerEl {
    width: 90%;
    padding: 4px 4px 4px 4px;
  }

  #done .qaView {
    padding: 2px 5px;
    width: 100%;
  }

  #done .q {
    font-size: 15px;
 
  }

  #done .a {
    font-size: 15px;
  }

}

@media only screen and (min-width: 751px) {
    #done {
      height: auto;
      cursor: default;
      padding-top: 9.5vh;
      max-width: 1366px;
      margin-right: auto;
      margin-left: auto;
    }

    #done h1 {
        text-align: center;
        margin: 5px 0 15px 0 ;

    }

    #done p{
        text-align: justify;
        font-size: 19px;
        margin: 20px 0 10px 0;
        padding: 0 70px;
    }
    
  #done .center {
    text-align: center;
  }

    
  #done #answersView {
    margin: 20px auto;
    padding: 15px 5px;
    max-width: 740px;
  }

  #done .answerEl {
    width: 70%;
    max-width: 500px;
    padding: 8px 0px 8px 0px;
  }

  #done .qaView {
    padding: 5px 10px;
    width: 100%;
  }

    #done .q {
        font-size: 15px;
    }

  #done .a {
    font-size: 15px;
  }

}

</style>