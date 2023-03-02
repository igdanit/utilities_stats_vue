import { createApp } from 'vue'
import App from './App.vue'

import { SetupCalendar } from 'v-calendar';

import { TokenService } from './utils/tokens/service.token'

const app = createApp(App)

app.provide('tokenService', new TokenService())

app.use(SetupCalendar, {})

app.mount('#app')
