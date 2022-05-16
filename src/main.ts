import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'
import './index.css'

import Payment from './components/Payment.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Payment', component: Payment},
    ]
})

createApp(App).use(router).mount('#app')
