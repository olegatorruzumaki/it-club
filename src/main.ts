import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'
import './index.css'

import Payment from './components/Payment.vue'
import SelectContact from './components/SelectContact.vue'
import AddContact from './components/AddContact.vue'
import AddMethod from './components/AddMethod.vue'
import SelectMethod from './components/SelectMethod.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', 
        name: 'Payment', 
        component: Payment,
    },
        {path: '/selectContact',
        name: 'SelectContact', 
        component: SelectContact,
    },
        {path: '/addContact',
        name: 'AddContact',
        component: AddContact,
    },
        {path: '/addMethod',
        name: 'AddMethod',
        component: AddMethod,
    },
        {path: '/selectMethod',
        name: 'SelectMethod',
        component: SelectMethod,
    },
    ]
})

createApp(App).use(router).mount('#app')
