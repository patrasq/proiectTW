import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)


app.mixin({
    methods: {
        route: (path, params) => {
            if (typeof params !== 'object') {
                console.error('params must be an object')
                return
            }
            
            let pathFound = path

            // find path in router
            const route = router.getRoutes().find(route => {
                Object.keys(params).forEach(key => {
                    if (route.path.includes(`:${key}`)){
                        pathFound = route.path.replace(`:${key}`, params[key])
                    }
                })
            })

            return router.resolve(pathFound).href
        },
    }
})

app.mount('#app')
