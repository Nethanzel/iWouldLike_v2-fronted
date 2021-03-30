import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'vue-socket.io'
import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './router'
import titleMixin from './mixins/titleMixin'

Vue.mixin(titleMixin)

Vue.mixin({
  data: function() {
    return { 
      clienttoken: () => {
        let gettoken = localStorage.getItem("auth")
        if(gettoken != null) {
          gettoken = JSON.parse(gettoken)
          return gettoken.id
        } else {
          axios.get("/auth")
          .then((response) => {
              let token = response.headers.token
              localStorage.setItem("auth", JSON.stringify({id: token}))
              return token
          })
        }
      },
      messageBox: (message, status) => {
        let  color = undefined
        if(status == 0) {
          color = "#ff0000d0"
        } else if(status == 1) {
          color = "#00ff00d0"
        } else if(status == 2) {
          color = "#ffa500d0"
        }
        let box = document.getElementById("messageBand")
        let messageText = document.getElementById("messageBand_text")
        messageText.innerText = message
        box.style.background = color
        box.style.height= "30px"
        setTimeout(()=>{box.style.height= "0px"}, 5000)
      }
    }
  }
})

Vue.config.productionTip = false

Vue.use(vueAxios, axios)
Vue.use(new SocketIO({
  debug: false,
  connection: '/'
}))

Vue.config.devtools = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')