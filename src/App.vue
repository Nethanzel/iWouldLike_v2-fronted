<template>
  <div id="app">
    <headeR />
    <router-view />
  </div>
</template>

<script>
import headeR from '@/components/header.vue'

export default {
  title: "I would like to ask...",
  components: {
    headeR
  },

  mounted() {
    this.sockets.subscribe('CLEAR', (data) => {
      let client = localStorage.getItem("auth")
      client = JSON.parse(client)

      if(client.id == data.id) {
        localStorage.removeItem("questionStorage")
        localStorage.removeItem("iwouldliketoask")
      }
    });
  },

  beforeDestroy() {
    this.sockets.unsubscribe('CLEAR');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}

body {
  background: #000000e0;
  background-repeat: no-repeat;
  background-size: auto;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
}

p {
  cursor: default;
}

.ils {
  width: 35vh;
  height: 35vh;
}

#afterErrorImg {
  width: 17vh;
  height: 17vh;
  background-color: #d8d8d8;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;

}

.ils_cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 750px) {
  .ils {
    width: 30vh;
    height: 30vh;
  }

  #afterErrorImg {
    width: 23vh;
    height: 23vh;
  }
}

</style>