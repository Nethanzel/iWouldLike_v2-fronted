<template>
  <div id="appCont">
    <div class="survey" v-if="access">
      <div class="ils_cont">
        <img src="../assets/answer.png" class="ils" />
      </div>

      <h1 v-if="!finished">Por favor, contesta con honestidad.</h1>
      <questions 
        v-on:view="showView($event)"
        v-on:finished="showSend($event)"
        v-on:count="setQuestionCount($event)"
        v-on:rejected="handelRejection($event)"
        v-if="!finished" />

      <h2 v-if="!finished">¡Recuerda enviar las respuestas al finalizar!</h2>
      <p id="topP" v-if="!finished">Tus respuesta son anonimas, no hay razón para estar preocupado por lo que conteste.</p>
      <p v-if="!finished">Haz click en las imagenes (si aparece alguna) para verlas en pantalla completa.</p>

      <img id="svSpin" src="../assets/spin.png">

      <div v-if="finished" id="finish">
        <div id="navC">
          <h2 id="choosen">Para enviar tus respuestas haz click en "enviar".</h2>
          <p id="changeAnsP"> Si quieres cambiar alguna respuesta, en la parte de "ver respuestas" podras borrar la que quieras y luego volver a contestarla.</p>
            <div class="nav" v-on:click="done()" id="done">
                <span class="r_link">Enviar</span>
            </div>

            <div id="ansViewBtn" class="nav" v-on:click="loadAnswers()">
              <span class="r_link">Ver respuestas</span>
            </div>
        </div>

        <div id="answersView"> </div>
      </div>
    </div>

    <div id="superView">
      <img src="" id="superView_img">
    </div>

    <img id="svSpinII" src="../assets/spin.png" v-if="loading">

    <div v-if="!access && !loading" class="advc">
      <img src="" id="afterErrorImg" />
      <h2 id="afterError" >. . .</h2>
    </div>
  </div>
</template>

<script>

import questions from '@/components/Questions.vue'
import axios from 'axios'
import e_404 from '../assets/404.png'
import e_500 from '../assets/500.png'
import e_unk from '../assets/unknown.png'
import e_nn from '../assets/noNetwork.png'
import e_401 from '../assets/401.png'

export default {
  name: "survey",
  title: "I would like to ask...",

  components: {
    questions
  },

  data() {
    return {
      finished: false,
      questionCount: 0,
      access: false,
      loading: true,
    }
  },

  methods: {
    handelRejection(e) {
      this.loading = false
      this.access = false

      if(e.code == 401) {
        setTimeout(() =>{
          document.getElementById("afterError").innerText = "El servidor rechazó la conexión porque el identificador no es valido."
          document.getElementById("afterErrorImg").src = e_401
        }, 125)
      } else if(e.code == 0) {  
        setTimeout(() =>{
          document.getElementById("afterError").innerText = "Hubo un error, intenta actualizar la página."
          document.getElementById("afterErrorImg").src = e_unk
        }, 125)
      }
    },

    done () {
      let click = document.getElementById("done")
      click.style.display = "none"

      document.getElementById("svSpin").style.display = "block"
      document.getElementById("choosen").innerText = "Tus respuestas se estan enviando..."
      document.getElementById("changeAnsP").style.display = "none"
      document.getElementById("ansViewBtn").style.display = "none"

      let token = this.clienttoken()
      let data = new FormData

      let storage = localStorage.getItem("questionStorage")
      if(storage != null) {
        storage = JSON.parse(storage)
        data.append("answers", JSON.stringify(storage.questions))
      }

      data.append("client", token)
      data.append("date", new Date())

      axios.post("/api/questions", data, {headers: {"token": token}})

      .then(res => {
        if(res.status == 204) {
          
          let status = localStorage.getItem("iwouldliketoask")
          status = JSON.parse(status)
          status.sent = new Date()

          localStorage.setItem("iwouldliketoask", JSON.stringify(status))

          this.messageBox("Tus respuestas fueron enviadas!", 1)
          this.$router.push({name: "Done"})
          click.style.display = "flex"
          document.getElementById("svSpin").style.display = "none"
          document.getElementById("choosen").innerText = 'Para enviar tus respuestas haz click en "enviar".'
          document.getElementById("changeAnsP").style.display = "flex"
          document.getElementById("ansViewBtn").style.display = "flex"
        }
      })

      .catch((err) => {
        click.style.display = "flex"
        document.getElementById("svSpin").style.display = "none"
        document.getElementById("choosen").innerText = 'Para enviar tus respuestas haz click en "enviar".'
        document.getElementById("changeAnsP").style.display = "flex"
        document.getElementById("ansViewBtn").style.display = "flex"

        let e = String(err).toLowerCase()
        if(e.includes("network error")) {
          this.messageBox("Servidor fuera de alcance.", 2)
        } else if (e.includes("code 401")) {
          this.messageBox("Autenticación requerida o invalida.", 0)
        } else if (e.includes("code 403")) {
          this.messageBox("Ya has participado.", 2)
          this.$router.push({name: "Done"})
        } else if (e.includes("code 404")) {
          this.messageBox("Solictud invalida.", 0)
        } else if(e.includes("code 500")) {
          this.messageBox("Estamos teniendo algunos problemas con el servidor.", 2)
        } else {
          this.messageBox("Error desconocido.", 0)
        }
      })

    },

    showView(uri) {
      document.getElementById("superView_img").src = uri
      let superView = document.getElementById("superView")
      superView.style.transform = "scale(1)"
    },

    showSend(state) {
      this.finished = state
    },

    loadAnswers() {
      document.getElementById("navC").style.display ="none"
      let ansView = document.getElementById("answersView")
      ansView.innerHTML = ""
      ansView.style.display = "flex"

      let storage = localStorage.getItem("questionStorage")
      if(storage != null) {
        storage = JSON.parse(storage)
        let answers = storage.questions

        for(let i = 0; i < answers.length; i++) {
          ansView.innerHTML += `
            <div class="answerEl">
              <div class="qaView">
                <p class="q">${answers[i].question}</p>
                <p class="a">R: "${answers[i].answer}"</p>
              </div>
              <div id="removeAn">
                <div id="removeAns" class="cremoveAns" tag="${i}">X</div>
              </di>
            </div>
          `
        }

        ansView.innerHTML += `
          <div id="edited" >
                <span class="r_link">Listo!</span>
          </div>
        `
        if(answers.length > 0) {
            let deleters = document.getElementsByClassName("cremoveAns")
            for(let i = 0; i < deleters.length; i++) {
              deleters[i].addEventListener("click", (e) => {
                let deleter = e.target
                let index = deleter.getAttribute("tag")
                this.removeAnswer(index)
              })
            }
        }

        document.getElementById("edited").addEventListener("click", () => {
          this.editDone()
        })
      }
    },

    editDone() {
      let storage = localStorage.getItem("questionStorage")
      if(storage != null) {
        storage = JSON.parse(storage)
        let answers = storage.questions

        if(answers.length == this.questionCount) {
          this.finished = true
          document.getElementById("navC").style.display ="block"
          document.getElementById("answersView").style.display = "none"
        } else {
          this.finished = false
        }
      }
    },

    removeAnswer(pos){
      let storage = localStorage.getItem("questionStorage")
      let status = localStorage.getItem("iwouldliketoask")

      if(storage != null) {
        storage = JSON.parse(storage)
        status = JSON.parse(status)

        let x = storage.questions[pos].pos
        storage.questions.splice(pos, 1)

        x = x - 1
        let z = status.positions.indexOf(x)

        status.positions.splice(z, 1)

        localStorage.setItem("questionStorage", JSON.stringify(storage))
        localStorage.setItem("iwouldliketoask", JSON.stringify(status))

        this.loadAnswers()
      }
    },

    setQuestionCount (event) {
      this.questionCount = event
      document.getElementById("svSpin").style.display = "none"
    }
  },

  mounted () {

    let superView = document.getElementById("superView")
    superView.addEventListener("click", (e) => {
      let target = e.target.getAttribute("id")
      if(target == "superView") {superView.style.transform = "scale(0)"}
    })

    let token = this.clienttoken()

    let status = localStorage.getItem("iwouldliketoask")
    status = JSON.parse(status)
    let project = status !== null ? status.project : null

    axios.get("/api", {headers: {token: token, project}})
      .then(res => {
        if(res.status == 204) {
          this.access = true
          this.loading = false
        }
      })

      .catch(err => {
          let e = String(err).toLowerCase()
          this.loading = false
          this.access = false

          setTimeout(() => {
            if(e.includes("network error")) {
            this.messageBox("Servidor fuera de alcance.", 2)
            document.getElementById("afterError").innerText = "Parece que no tienes internet."
            document.getElementById("afterErrorImg").src = e_nn
            
            } else if (e.includes("code 401")) {
              this.messageBox("Ya has participado.", 2)
              this.$router.push({name: "Done"})
            } else if (e.includes("code 404")) {
              this.messageBox("Servidor no encontrado.", 0)
              document.getElementById("afterError").innerText = "Servidor no encontrado."
              document.getElementById("afterErrorImg").src = e_404          
            } else if(e.includes("code 500")) {
              this.messageBox("Estamos teniendo algunos problemas con el servidor.", 2)
              document.getElementById("afterError").innerText = "Hubo un problema con el servidor."
              document.getElementById("afterErrorImg").src = e_500
            } else {
              this.messageBox("Error desconocido.", 0)
              document.getElementById("afterError").innerText = "Hubo un error, intenta actualizar la página."
              document.getElementById("afterErrorImg").src = e_unk
            }
          }, 0.1)
      })
  }
}
</script>

<style>

#afterError {
  text-align: center;
}

.advc {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.advc h2 {
  cursor: default;
}

#changeAnsP {
  text-align: center;
}

#topP {
  margin-top: 15px;
  margin-bottom: 10px;
}

@keyframes rotate360 {

  to { transform: rotate(360deg); }
}

@-webkit-keyframes rotate360 {

  to { transform: rotate(360deg); }
}

#svSpin { 
  animation: 1.5s rotate360 infinite linear; 
  height: 40px;
  width: 40px;
}


#svSpinII { 
  animation: 1.5s rotate360 infinite linear; 
  height: 40px;
}

#superView {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #ffffff77;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  transition: transform .4s ease-in-out;
  z-index: 10;
}

#finish {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.survey #finish {
  width: 100%;
  display:flex;
  align-self: center;
  padding-bottom: 10px;
}

.survey #answersView {
  border: 1px solid #ffffff8a;

  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;

  display: none;
  flex-direction: column;
  align-items: center;
}

.survey .answerEl {
  display: flex;
  border: 2px solid #fff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background: #ffffff3b;
  margin-bottom: 10px;
}

.survey .q {
  color: #fff;
  margin: 5px 0 10px 0;
  font-weight: bold;
  overflow: auto;
  overflow-wrap: break-word; 
  max-width : 100%;
  text-align: center;
}

.survey .a {
  color: rgba(255, 255, 255, 0.733);
  margin: 5px 0;
  font-style: italic;
  overflow-wrap: break-word; 
  max-width : 100%;
}

.survey #removeAn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
}

p {
  text-align: center;
}

#appCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;
}

@media only screen and (max-width: 750px) {

  #appCont {
    padding-top: 9vh;
  }

  .survey {
    cursor: default;
    height: 100vh;
    width: 97%;
    padding-top: 5vh;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
  }

  .survey h1 {
    text-align: center;
    margin: -15px 0 5px 0px;
    font-size: 21px;
  }

  .survey h2 {
    text-align: center;
    margin: 10px 0 0 0;
    font-size: 19px;
  }

  .survey .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 30px 0;

  }

  .survey .nav .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 17px;
    min-width: 130px;
    text-align: center;
  }

  .survey .nav .r_link:active {
    background: #53ff78;
    color: #000
  }

  .survey #edited {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0 15px 0;

  }

  .survey #edited .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 17px;
    min-width: 130px;
    text-align: center;
  }

  .survey #edited .r_link:active {
    background: #53ff78;
    color: #000
  }

  .survey #superView_img {
    max-width: 87vh;
    min-width: 85vh;
     -moz-transform: rotate(90deg);
     -o-transform: rotate(90deg);
     -webkit-transform: rotate(90deg);
     transform: rotate(90deg);
  }

  .survey #answersView {
    margin: 0 auto;
    padding: 10px 4px;
    width: 97%;
    max-width: 100%;
  }

  .survey .answerEl {
    width: 97%;
    padding: 4px 0 4px 4px;
  }

  .survey .qaView {
    padding: 2px 5px;
    width: 90%;
  }

  .survey #removeAns {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #ff000048;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    font-weight: bold;
    font-size: 17px;
  }

  .survey #removeAns:active {
    background: #ff0000;
    transition: .5s;
  }

  .survey .q {
    font-size: 15px;
 
  }

  .survey .a {
    font-size: 15px;
  }

  .survey #removeAn {
    padding: 0 4px 0 5px;
    min-width: 30px;
  }


}

@media only screen and (min-width: 751px) {

  #appCont {
    padding-top: 5vh;
    max-width: 1366px;
    margin-left: auto;
    margin-right: auto;
  }


  .survey {
    height: auto;
    min-height: 75vh;
    padding-top: 0vh;
    padding-bottom: 15px;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .survey h1 {
    text-align: center;
    margin: -15px 0 10px 0;
  }

  .survey h2 {
    text-align: center;
    margin: 5px 0 -5px 0;
  }

  .survey .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 30px 0;
  }

  .survey .nav .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 19px;
    min-width: 130px;
    text-align: center;
  }

  .survey .nav .r_link:hover {
    background: #53ff78;
    color: #000
  }


  .survey #edited {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 5px 0;
  }

  .survey #edited .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 19px;
    min-width: 130px;
    text-align: center;
  }

  .survey #edited .r_link:hover {
    background: #53ff78;
    color: #000
  }


  .survey #superView_img {
    max-width: 95vw;
    min-width: 90vw;
    max-height: 95vh;
  }

  .survey #removeAns {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #ff000048;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    font-weight: bold;
    font-size: 19px;
  }

  .survey #removeAns:hover {
    background: #ff0000;
    transition: .5s;
  }

  .survey #answersView {
    margin: 0 15px;
    margin: 0 auto;
    padding: 15px 5px;
    width: 600px;
    max-width: 740px;
  }

  .survey .answerEl {
    width: 70%;
    max-width: 500px;
    padding: 8px 0 8px 8px;
  }

  .survey .qaView {
    padding: 5px 10px;
    width: 90%;
  }

    .survey .q {
    font-size: 15px;
  }

  .survey .a {
    font-size: 15px;
  }

  .survey #removeAn {
    padding: 0 5px 0 5px;
  }

}

</style>
