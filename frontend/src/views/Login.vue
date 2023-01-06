<template>

  <div class="absolute top-0 left-0 z-10 w-full h-full flex flex-col-reverse lg:flex-row">
    <div class="w-12/12 lg:w-3/12 p-10 flex justify-center flex-col">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Log in</h1>

      <div class="bg-red-200 text-red-500 rounded-md border border-red-300 p-10 mb-10 w-full" v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <form @submit.prevent="handleSubmit" class="w-full">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="form.email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********">
        </div>
        <div class="flex items-center justify-between mt-10">
          <button class="bg-gradient-to-br from-green-400 to-green-600 block py-2 px-8 text-white rounded-full" type="submit">
            Log in
          </button>
          <div class="flex flex-col">
          <a class="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="#">
            Forgot Password?
          </a>
            <RouterLink class="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" to="/register">
              Create an Account
            </RouterLink>
          </div>
        </div>
      </form>
    </div>
    <div class="bg-gradient-to-br from-green-300 to-green-400 w-12/12 lg:w-9/12 h-full flex items-center justify-center">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="text-white text-4xl font-bold mb-4">Foowa</div>
      </div>
    </div>
  </div>
</template>

<script>
// include apiservice
import api from '../services/apiService'

export default {
data() {
  return {
    form: {
      name: '',
      email: '',
      password: '',
    },
    errors: []
  }
},
methods: {
  handleSubmit() {
    this.errors = []
    api.post('users/login', this.form)
      .then(response => {
        // set token to local storage
        localStorage.setItem('token', response.data.data.token)
        // redirect to dashboard
        this.$router.push({ path: '/dashboard/profile/' + response.data.data.id })
      })
      .catch(error => {
        if(error?.response?.data.errors) {
          error.response.data.errors.forEach(error => {
            this.errors.push(error)
          })
        }

        if(error?.response?.data.message) {
          this.errors.push(error.response.data.message)
        }
      })
    }
  }
}
</script>

  
