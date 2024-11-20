import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import ru from 'element-plus/es/locale/lang/ru'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
  locale: ru,
})
app.mount('#app')
