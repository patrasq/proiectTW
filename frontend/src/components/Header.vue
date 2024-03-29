<template>
    <header>
        <div class="container mx-auto flex flex-row py-10">
            <div class="w-8/12">
                <RouterLink to="/" class="logo">
                    <h1 class="text-green-500 text-2xl block max-w-max">Foowa</h1>
                </RouterLink>
            </div>
            <div class="w-4/12">
                <div v-if="!auth" class="flex flex-row gap-5 items-center w-full flex justify-end">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink
                        class="bg-gradient-to-br from-green-400 to-green-600 block py-2 px-8 text-white rounded-full"
                        to="/login">Login</RouterLink>
                </div>
                <div v-else class="flex flex-row gap-5 items-center w-full flex justify-end">
                    <div class="relative">
                        <input v-model="searchUser" class="bg-gray-100 rounded-full px-4 py-1" type="text"
                            placeholder="Search user">
                        <div class="grid grid-cols-1 divide-y absolute top-8 left-0 bg-white rounded-md border min-w-[140px]"
                            v-if="foundUsers?.length">
                            <div class="px-5 py-2 flex flex-row gap-2" v-for="user in foundUsers" v-bind:key="user.id">
                                <RouterLink :to="route('/dashboard/profile/', { id: user.id })">{{ user.name }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="group relative flex flex-row">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M17.25 12V10C17.25 7.1005 14.8995 4.75 12 4.75C9.10051 4.75 6.75 7.10051 6.75 10V12L4.75 16.25H19.25L17.25 12Z">
                            </path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M9 16.75C9 16.75 9 19.25 12 19.25C15 19.25 15 16.75 15 16.75">
                            </path>
                        </svg>
                        <div
                            class="hidden group-hover:grid grid-cols-1 divide-y absolute top-8 z-20 left-0 bg-white rounded-md border min-w-[180px]">
                            <div class="px-5 py-3 flex flex-col gap-2" v-for="alert in alerts" v-bind:key="alert.id">
                                {{ alert.contents }}
                                <span class="text-gray-500 text-xs"> {{ - timeLeft(alert.createdAt).hours }}h ago</span>
                            </div>
                        </div>
                    </div>
                    <div class="group bg-gray-100 rounded-full px-4 py-1 relative flex flex-row">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#000" />
                        </svg>
                        <span class="text-black">{{ getUser().name }}</span>
                        <div
                            class="z-20 hidden group-hover:grid grid-cols-1 divide-y absolute top-8 left-0 bg-white rounded-md border min-w-[140px]">
                            <div class="px-5 py-2 flex flex-row gap-2">
                                <div class="w-2/12 flex items-center justify-center">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"></circle>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z">
                                        </path>
                                    </svg>
                                </div>
                                <RouterLink :to="route('/dashboard/profile/', { id: getUser().id })">Profile
                                </RouterLink>
                            </div>
                            <div class="px-5 py-2 flex flex-row gap-2">
                                <div class="w-2/12 flex items-center justify-center">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5" d="M15.75 8.75L19.25 12L15.75 15.25"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5" d="M19 12H10.75"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25">
                                        </path>
                                    </svg>
                                </div>
                                <span @click="logout" class="cursor-pointer">Sign out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import api from '../services/apiService';
export default {
    name: "Header",

    data() {
        return {
            alerts: [],
            searchUser: '',
            foundUsers: [],
            timestamp: Date.now()
        }
    },

    mounted() {
        setInterval(() => {
            this.timestamp = Date.now()
        }, 1000)
    },

    created() {
        api.get('/alerts/' + this.getUser().id)
            .then(res => {
                this.alerts = res.data.data;
            })
            .catch(err => {
                console.log(err);
            })
    },

    computed: {
        auth() {
            return localStorage.getItem('token') ? true : false
        }
    },

    watch: {
        searchUser: function () {
            if (this.searchUser.length > 2) {
                api.get('/users?search=' + this.searchUser)
                    .then(res => {
                        this.foundUsers = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    },

    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/').then(() => {
                window.location.reload();
            });
        },

        alerts() {
            api.get('/alerts/' + getUser().id)
                .then(res => {
                    this.alerts = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
}
</script>