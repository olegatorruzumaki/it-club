import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'
import './index.css'

import Payment from './components/Payment.vue';
import SelectContact from './components/SelectContact.vue';
import AddContact from './components/AddContact.vue';
import AddMethod from './components/AddMethod.vue';
import SelectMethod from './components/SelectMethod.vue';
import FinalForm from './components/FinalForm.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Payment',
            component: Payment,
            meta: {transition: 'slide-right'},
        },
        {
            path: '/selectContact',
            name: 'SelectContact',
            component: SelectContact,
            meta: {transition: 'slide-left'},
        },
        {
            path: '/addContact',
            name: 'AddContact',
            component: AddContact,
            meta: {transition: 'slide-left'},
        },
        {
            path: '/addMethod',
            name: 'AddMethod',
            component: AddMethod,
            meta: {transition: 'slide-left'},
        },
        {
            path: '/selectMethod',
            name: 'SelectMethod',
            component: SelectMethod,
            meta: {transition: 'slide-left'},
        },
        {
            path: '/finalForm',
            name: 'Final',
            component: FinalForm,
            meta: {transition: 'fade-bottom'},
        },
    ]
})

router.afterEach((to, from) => {
    if (to.name === "Payment" && from.name === "Final") {
        to.meta.transition = 'fade-top';
    }
})

createApp(App).use(router).mount('#app')
