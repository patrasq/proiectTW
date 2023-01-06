import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)


app.mixin({
    methods: {
        route(path, params) {
            // find routes with matching path
            const matchingRoutes = router.options.routes.filter(route => route.path.startsWith(path))
      
            // sort by params no desc
            const sortedRoutes = matchingRoutes.sort((a, b) => b.path.split('/').length - a.path.split('/').length)
      
            // find first route with all params
            const route = sortedRoutes.find(route => {
              const routeParams = route.path.split('/').slice(1)
              return Object.keys(params).every(param => routeParams.includes(':' + param))
            })
      
            // replace params and return path
            if (route) {
              let routePath = route.path
              for (const key in params) {
                routePath = routePath.replace(':' + key, params[key])
              }
              return router.resolve({ path: routePath, params }).href
            }
      
            // return original if no match
            return path
        },

        isAuthenticated() {
            return localStorage.getItem('token') !== null;
        },

        decodeJwt() {
            const token = localStorage.getItem('token');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const decodedToken = JSON.parse(window.atob(base64));
            
            return decodedToken;
        },

        getUser() {
            return this.isAuthenticated() ? this.decodeJwt() : '';
        },
    }
})

app.mount('#app')
