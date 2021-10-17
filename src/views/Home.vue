<template>
  <div class="home">

    <div class="ils_cont">
      <img src="../assets/introduce.png" class="ils" />
    </div>

    <h1>¿De qué se trata?</h1>

    <div>
      <p>
        Estas a punto de participar en una investigación dirigida por estudiantes de la universidad O{{charOne}}M, solo necesitamos que contestes y luego envies 
        algunas preguntas sobre seguridad informática, <strong>en ningún momento se te pedirá alguna información personal</strong>, lo único necesario 
        son tus respuestas. Si quieres saber más sobre la investigación, en la sección <router-link to="/about">"Saber más"</router-link> 
        encontraras otros detalles.
      </p>

      <p>
        Podras ver tus respuestas antes de enviarlas y si por alguna razón quieres cambiar alguna, 
        cuando hayas contestado todo te dará las opciones donde puedes borrar alguna de ellas y luego volver a 
        contestarla. Tendras la opción de enviar tu cuestionario completado cuando quieras (aún si sales de la página), luego que lo hayas enviado, ya no 
        podras volver a modificar nada.
      </p>

      <p>Si en algun momento notas que la aplicación funciona de forma incorrecta o te parece que es dificil de usar, tienes la 
        posibilidad de <router-link to="/report">enviar un reporte</router-link> cuando quieras, explicando lo que pasa o alguna 
        idea que quisieras compartirnos. Podras ver un <router-link to="/overview">resumen</router-link> del progreso donde podras ver el alcance que lleva la investigación.
      </p>

      <p>Si al usar la aplicación encuentras algo que no está muy claro, en la sección de <router-link to="/help">Ayuda</router-link> podras encontrar detalles
        sobre el uso de la aplicación y los pasos que debes seguir para participar.
      </p>
    </div>

    <div id="nav" v-on:click="go()">
        <span id="goBtn" class="r_link">Continuar</span>
        <img id="spin" src="../assets/spin.png">
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  title: "I would like to ask...",
  data () {
    return {
      charOne: "&",
      authTryCount: 0,
    }
  },

  methods: {
    go() {
      document.getElementById("spin").style.display = "block";
      document.getElementById("goBtn").style.display = "none";

      setTimeout(() => {
        if(this.authTryCount >= 3) {
          this.messageBox("Error al crear autenticación del cliente.", 2);
          document.getElementById("spin").style.display = "none";
          document.getElementById("goBtn").style.display = "block";
          this.authTryCount = 0;
          return clearTimeout();
        }
        this.clienttoken();
        this.goSurvey();
        this.authTryCount++;
      }, 3000);
    },

    goSurvey() {
      let token = localStorage.getItem("auth")
      if(token != null) {
        this.$router.push({name: "Survey"})
      } else this.go()
    }
  },
}
</script>

<style>

.home h1 {
  text-align: center;
  margin: 0 0 20px 0;
}

.home a {
    text-decoration: none;
    color: #79c471;
}

@keyframes rotate360 {

    to { transform: rotate(360deg); }
}

@-webkit-keyframes rotate360 {

    to { transform: rotate(360deg); }
}

.home #spin { 
    animation: 1.5s rotate360 infinite linear; 
    height: 40px;
    display: none;
}

@media only screen and (max-width: 750px) {
  .home {
    height: auto;
    cursor: default;
    padding-top: 9vh;

  }

  .home p {
    text-align: justify;
    padding: 10px 15px;
    font-size: 17px;
  }

  .home #nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 30px 0;
  }

  .home #nav .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 17px;
  }

  .home #nav .r_link:hover {
    background: #53ff78;
    color: #000;
  }
}
@media only screen and (min-width: 751px) {
  .home {
    height: auto;
    cursor: default;
    padding-top: 7vh;
    max-width: 1366px;
    margin-left: auto;
    margin-right: auto;
  }

  .home p {
    text-align: justify;
    font-size: 19px;
    padding: 10px 70px;
  }

  .home #nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 30px 0;
  }

  .home #nav .r_link {
    background: #79c471;
    padding: 10px 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-decoration: none;
    font-size: 17px;
  }

  .home #nav .r_link:hover {
    background: #53ff78;
    color: #000;
  }
  
}

</style>
