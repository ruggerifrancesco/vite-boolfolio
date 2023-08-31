import { createApp } from 'vue'
import { router } from './router';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './styles/style.scss'
import App from './App.vue'

createApp(App).use(router).mount('#app')
