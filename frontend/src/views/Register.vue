	<template>
	<div class="container mx-auto px-4">
		<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
		<form class="bg-white border bg-gray-50 rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
		<div class="flex flex-row w-full gap-4">
			<div class="mb-4 w-6/12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
					First name
				</label>
				<input v-model="form.firstName" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="First name">
			</div>
			<div class="mb-4 w-6/12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
					Last name
				</label>
				<input v-model="form.lastName" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Last name">
			</div>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email">
				Email
			</label>
			<input v-model="form.email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="phoneNumber">
				Phone number
			</label>
			<input v-model="form.phoneNumber" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" placeholder="Phone number">
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
				Password
			</label>
			<input v-model="form.password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********">
		</div>
		<div class="flex items-center justify-between">
			<button class="bg-gradient-to-br from-green-400 to-green-600 block py-2 px-8 text-white rounded-full" type="submit">
				Sign Up
			</button>
			<a class="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="#">
				Forgot Password?
			</a>
		</div>
		</form>
	</div>
	</template>

	<script>
	// include apiservice
	import api from '../services/apiService'

	export default {
	data() {
		return {
		form: {
			username: '',
			email: '',
			password: '',
			password_confirmation: ''
		}
		}
	},
	methods: {
		handleSubmit() {
			api.post('user/register', this.form)
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
	</script>

		
