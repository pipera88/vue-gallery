import Vue from "vue"
import App from "./App"

/* eslint-disable no-new */
const evtHub = new Vue()
Vue.mixin({
  data: function () {
    return {
      evtHub: evtHub
    }
  }
})

new Vue({
  el: "#app",
  template: "<App :album_uri='album_uri'/>",
  components: { App },
  data: {
    album_uri: ""
  }
})
