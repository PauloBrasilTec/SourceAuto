// Plugins
import { registerPlugins } from '@/plugins'

// import vue 
import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'

//Pages
import index from './components/pages/index.vue'
import home from './components/pages/home.vue'
import produtos from './components/pages/produtos.vue'
import teste from './components/pages/teste.vue'
import login from './components/pages/login.vue'

//Components custom
import App from './App.vue'
import dashboard from './components/items/dashboard.vue'
import input_custom from './components/items/input.vue'
import button_custom from './components/items/button.vue'
import datagrid_custom from './components/items/datagrid.vue'

//Components custom pages 
import datagrid_custom_produtos from  './components/page_items/produtos/datagrid_produtos.vue'

//routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            name: 'produtos_all',
            component:produtos,
        },
        {
            path: '/:id',
            name: 'produtos_departamento',
            component: produtos,
            props: true
        },

        
        {path: '/teste', 
        name:'teste', 
        component:teste,
        },
        {path: '/login', 
        name:'login', 
        component:login,
        },
    ]
})
const app = createApp(App)
//axios
app.use(VueAxios, axios)

//pages
app.component('index', index)
app.use(router)

//components custom
app.component('dash-board', dashboard)
app.component('input-custom', input_custom)
app.component('button-custom', button_custom)
app.component('datagrid-custom', datagrid_custom)

//components custom pages
app.component('datagrid-custom-produtos', datagrid_custom_produtos)
registerPlugins(app)
app.mount('#app')
