<template>
    <div class="report">

      <div class="ils_cont">
        <img src="../assets/broke.png" class="ils" />
      </div>

      <h1>¡Ayudame a alcanzar la meta diciendome si la aplicación tiene fallos!</h1>
      <p class="advice">Puedes usar una de las dos opciones a continuación: </p>

      <form id="reportColl">
          <h2>¡Haz tu reporte aqui!</h2>
          <label for="donde">¿Donde falló la aplicación? (puedes poner el link)</label> <input type="url" id="donde" v-model="where"> 
          <label for="desc">Agrega una pequeña descripción: </label>
          <textarea cols="40" rows="5" id="desc" v-model="desc"></textarea>
          <label for="capt">Agrega alguna captura: </label> <input type="file" accept="image/*" id="capt">
          <div id="nav" v-on:click="sendReport()">
              <span id="sendBtn" class="r_link">Enviar</span>
              <img id="spin" src="../assets/spin.png">
          </div>
      </form>

      <h2>También puedes comunicarlo a través de...</h2>
      <div id="contact">

        <a href="https://facebook.com/natanaelabaad" target="_blank">
          <div class="socialIcon face">
            <img src="../assets/facebook.svg" alt="facebook">
            <p>Facebook</p>
          </div>
        </a>

        <a href="https://t.me/iwouldliketoask" target="_blank">
          <div class="socialIcon tele">
            <img src="../assets/telegram.svg" alt="telegram">
            <p>Telegram</p>
          </div>
        </a>

        <a href="https://github.com/nethanzel" target="_blank">
          <div class="socialIcon git">
            <img src="../assets/github.svg" alt="github">
            <p>Github</p>
          </div>
        </a>

      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      where: undefined,
      desc: undefined,
      capture: undefined
    }
  },
  methods: {

    sendReport() {
      let sendBtn = document.getElementById("sendBtn")
      let spin = document.getElementById("spin")

      spin.style.display = "inline"
      sendBtn.style.display = "none"

      let token = this.clienttoken()
      let report = new FormData

      if((this.where == undefined || this.where == "") && (this.desc == undefined || this.desc == "") && this.capture == undefined) {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        return this.messageBox("Primero agrega algún detalle.", 0)
      } else if(this.where == undefined && (this.desc != undefined || this.capture != undefined)) {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        return this.messageBox("Debes especificar donde está el problema.", 2)
      } else if(this.where != undefined && ((this.desc == undefined || this.desc == "") && this.capture == undefined)) {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        return this.messageBox("Agrega alguna referencia.", 2)
      } else if(this.capture != undefined && this.where == undefined) {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        return this.messageBox("Debes especificar donde está el problema.", 2)
      } else if(this.desc != undefined && this.where == undefined) {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        return this.messageBox("Debes especificar donde está el problema.", 2)
      }

      report.append("where", this.where)
      report.append("desc", this.desc)
      report.append("screen", this.capture)
      report.append("client", token)
      report.append("date", new Date())
      
      axios.post("/api/reports", report, {headers: {"token": token}})

      .then(res => {
        if (res.status == 204) {
          this.messageBox("Su reporte fue realizado. Gracias!", 1)
          let inputCollection = document.getElementById("reportColl")
          inputCollection.reset()
          this.capture = undefined
          this.desc = undefined
          this.where = undefined
          spin.style.display = "none"
          sendBtn.style.display = "inline"
        }
      })

      .catch((err) => {
        spin.style.display = "none"
        sendBtn.style.display = "inline"
        let e = String(err).toLowerCase()
        if(e.includes("network error")) {
          this.messageBox("Servidor fuera de alcance.", 2)
        } else if (e.includes("code 401")) {
          this.messageBox("Autenticación requerida o invalida.", 0)
        } else if (e.includes("code 404")) {
          this.messageBox("Solictud invalida.", 0)
        } else if(e.includes("code 500")) {
          this.messageBox("Estamos teniendo algunos problemas con el servidor.", 2)
        } else {
          this.messageBox("Error desconocido.", 0)
          console.log(e)
        }
      })
    },

    getCapture() {
      let inputFile = document.getElementById("capt")
      inputFile.addEventListener("change", () => {
        this.capture = inputFile.files[0]
       })
    }
  },

  mounted() {
    this.getCapture()
  }
}
</script>

<style scoped>


@keyframes rotate360 {

    to { transform: rotate(360deg); }
}

@-webkit-keyframes rotate360 {

    to { transform: rotate(360deg); }
}

#spin { 
    animation: 1.5s rotate360 infinite linear; 
    height: 40px;
    display: none;
}

.socialIcon {
  height: 60px;
  width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 20px;

  padding: 5px 5px 10px 5px;

  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  transition: 1s;
  cursor: pointer;
}

.socialIcon img{
  height: 40px;
  width: 40px;
}

.socialIcon p {
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #fff;
}

#contact{
  display: flex;
  align-items: center;
  justify-content: center;
}

#desc {
  resize: none;
}

#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px 0;
}

#nav .r_link {
  background: #79c471;
  padding: 5px 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  text-decoration: none;
  font-size: 17px;
}

#donde, textarea {
  color: #000;
  font-size: 16px;
  font-weight: bold;
  padding: 2px 5px;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}

input, textarea {
  margin-top: 3px;
}

.advice {
  text-align: center;
}

#reportColl {
  background: transparent;
  border: 2px solid #fff;
  background: #c9c9c959;
}

@media only screen and (max-width: 750px) {
  .report {
    height: auto;
    cursor: default;
    padding-top: 8vh;
    margin: 0 0 15px 0;
    min-width: 350px;
  }

  h1 {
    text-align: center;
    margin: -25px 0 10px 0;
    font-size: 24px;
  }

  p {
    margin-bottom: 15px;
    font-size: 17px;
    margin: 0 10px 15px 10px;
  }

  form {
    margin: 10px 10px 50px 10px;
    padding: 10px 10px 15px 10px;
    border-radius: 5px;
    background: #858484;
    display: flex;
    flex-direction: column;
  }

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }

  textarea:focus {
    outline: none;
    margin-bottom: 10px;
  }

  input[type=url]:focus {
    outline: none;
    margin-bottom: 10px;
  }

  input[type=url] {
    outline: none;
    border: none;
    height: 23px;
    margin-bottom: 10px;
  }

  textarea {
    outline: none;
    margin-bottom: 10px;
    max-width: 100%;
    max-height: 160px;
    min-width: 200px;
    min-height: 50px;
  }

  #nav .r_link:active {
    background: #53ff78;
    color: #000;
  }

  .tele:active {
    background: #37bbe78c;
    transition: 1s;
  }

  .face:active {
    background: #3f65a68c;
    transition: 1s;
  }

  .git:active {
    background: #0000008c;
    transition: 1s;
  }

}

@media only screen and (min-width: 751px) {
  .report {
    height: auto;
    cursor: default;
    margin: 0 10px 15px 10px;
    padding-top: 5vh;
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
    margin: -20px 0 20px 0;
  }

  p {
    font-size: 19px;
    margin: 0 10px 15px 10px;
  }

   form {
    min-width: 600px;
    align-self: center;
    margin: 10px 10px 70px 10px;
    padding: 15px 10px 15px 10px;
    border-radius: 5px;
    background: #858484;
    display: flex;
    flex-direction: column;
  }

  h2 {
    text-align: center;
    margin-bottom: 15px;
  }

  textarea:focus {
    outline: none;
    margin-bottom: 10px;
  }

  input[type=url]:focus {
    outline: none;
    margin-bottom: 10px;
  }

  input[type=url] {
    outline: none;
    border: none;
    height: 23px;
    margin-bottom: 10px;
  }

  textarea {
    outline: none;
    margin-bottom: 10px;
    max-width: 600px;
    min-width: 600px;
    max-height: 200px;
    min-height: 50px;
  }

  #nav .r_link:hover {
    background: #53ff78;
    color: #000;
  }

  .tele:hover {
    background: #37bbe7;
    transition: 1s;
  }

  .face:hover {
    background: #3f65a6;
    transition: 1s;
  }

  .git:hover {
    background: #0000008c;
    transition: 1s;
  }

}
</style>