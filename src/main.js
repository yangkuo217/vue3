import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 这是全局配置axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080' // SpringBoot默认端口

app.use(router)
app.mount('#app')