import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { createPinia } from 'pinia'
// import store from './store'; // If using Vuex or Pinia
import './assets/styles/tailwind.css'
import Vue3TouchEvents from 'vue3-touch-events';
// import { db, auth } from './firebase';



// window.axios = require('axios');

const app = createApp(App);

app.use(router);
// app.use(createPinia());
app.use(Vue3TouchEvents, {
    // Optional configuration
    disableMouse: true, // Disable mouse events
    disableMouseEvents: true,
    touchClass: 'touch',
    tapTolerance: 10, // default 10px
    swipeTolerance: 75, // default 100px
    longTapTimeInterval: 500, // default 500ms
  })
app.mount('#app');
