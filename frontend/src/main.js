import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)


app.mixin({
    methods: {
        isAuthenticated() {
            return localStorage.getItem('token') ? true : false;
        },

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

        timeLeft(date) {
            const now = new Date();
            const timeLeft = new Date(date) - now;
            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            return { days, hours, minutes, seconds };
        },

        timeLeftString(date) {
            const timeLeft = this.timeLeft(date);

            if (timeLeft.days < 0 && timeLeft.hours < 0 && timeLeft.minutes < 0 && timeLeft.seconds < 0) {
                return `Expired`;
            }

            return `${timeLeft.days}d ${timeLeft.hours}h`;
        }
    }
})

app.mount('#app')
