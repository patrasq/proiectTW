<template>
    <header>
        <div class="container mx-auto flex flex-row py-3">
            <div class="w-10/12">
                <RouterLink to="/" class="logo">
                    <h1 class="text-green-500">Foowa</h1>
                </RouterLink>
            </div>

            <div class="flex flex-row gap-5 items-center">
                <RouterLink to="/" exact>Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <template v-if="isAuthenticated">
                    <div class="group bg-gray-100 rounded-full px-4 py-1 relative flex flex-row">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#000"/>
                        </svg>
                        <span class="text-black">{{ getUser().name }}</span>
                        <div class="hidden group-hover:grid grid-cols-1 divide-y absolute top-8 left-0 bg-white rounded-md border min-w-[140px]">
                            <div class="px-5 py-2 flex flex-row gap-2">
                                <div class="w-2/12 flex items-center justify-center">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                                    </svg>
                                </div>

                                <RouterLink :to="route('/dashboard/profile/', {id: getUser().id})">Profile</RouterLink>
                            </div>
                            <div class="px-5 py-2 flex flex-row gap-2">
                                <div class="w-2/12 flex items-center justify-center">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 8.75L19.25 12L15.75 15.25"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H10.75"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"></path>
                                    </svg>

                                </div>

                                <RouterLink to="/dashboard/profile">Sign out</RouterLink>
                            </div>
                        </div>
                    </div>
                </template>
                <RouterLink v-else class="bg-gradient-to-br from-green-400 to-green-600 block py-2 px-8 text-white rounded-full" to="/login">Login</RouterLink>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",

        methods: {
            logout() {
                localStorage.removeItem('token');
                this.$router.push({ path: '/login' });
            },
        }
    }
</script>