<template>
    <div class="about">
        <img src="../assets/iWouldLike2.png" alt="branding logo" id="logo">
        <h1><strong>I would like to ask...</strong></h1>

        <p>"I would to ask" o en español "Quisiera preguntar", es un pequeño proyecto de código abierto (Open Source), el cual 
          fue desarrollado para realizar una investigación y reunir datos sobre el contexto de seguridad informática que permitan 
          detectar indicadores de la incidencia de eventos negativos en el area en República Dominicana.
        </p>

        <p>
          La intención es mantener los datos accesibles a todos, a travez de esta misma aplicacion o por algún otro medio, ya que de nada 
          valdria mantenerlos escondidos cuando la razon de este proyecto se basa en que al no haber fuentes confiables que dispongan 
          datos de forma pública, es necesario realizar una investigación y crear una fuente de datos.
        </p>

        <p>
          Puedes accerder al <a href="https://github.com/Nethanzel/i_would_like_to_ask" target="_blank">repositorio del proyecto</a> en Github y colaborar o ver 
          los códigos fuente, cualquier idea/critica será bien recibida.
        </p>

        <div class="group">
          <h2>Sobre la investigación</h2>

          <p>
            Esta investigación está siendo dirigida por <strong>Natanael Abad</strong>, estudiante de término de <strong>Ingeniería de Sistemas y Computación</strong> 
            de la universidad Dominicana O{{charOne}}M, como parte del proyecto de monografíco. La investigación es de caracter social y se basa en identificar 
            alguno de los indicadores que pueden ser interpretados como razones que estan permitiendo o que podrian permitir que las personas en nuestro país sean victima de filtración 
            o robo de datos personales (como contraseñas, datos bancarios o archivos privados) por parte de los archifamosos hackers.
          </p>
          <p>
            Actualmente, existe muy poca información por parte de las instituciones reguladoras sobre estadisticas o detalles que puedan servir, por lo 
            que preferí crear mi propia fuente de referencia, pero para eso necesito que por favor, contestes las preguntas que he 
            creado para determinar lo anterior. Es importante destacar que estas estádisticas se generan por las denuncias que realizan las personas en los 
            lugares dispuestos para esos fines, y aunque las personas hacen sus denuncias, las generalidades que descienden de estas no estan disponibles como 
            información que ofrecen esas instituciones.
          </p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      charOne: "&"
    }
  }
}
</script>

<style scoped>

.about a {
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

h2 {
  margin: 10px 0;
  text-align: center;
  font-size: 30px;
}

@media only screen and (max-width: 750px) {
  .about {
    height: auto;
    cursor: default;
    padding-top: 10vh;
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

  p {
    margin: 0 10px 15px 10px;
    font-size: 17px;
    text-align: justify;
  }

  .group {
    margin: 10px 5px 50px 5px;
  }

}


@media only screen and (min-width: 751px) {

  .group {
    margin: 10px 35px 50px 35px;
  }

  .about {
    height: auto;
    cursor: default;
    margin: 0 auto 15px auto;
    padding-top: 8vh;
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

  p {
    margin: 20px 0 10px 0;
    padding: 0 70px;
    font-size: 19px;
    text-align: justify;
  }
}


</style>