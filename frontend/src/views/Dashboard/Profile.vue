<template>
    <div class="flex flex-col container mx-auto">
        <div class="min-h-[150px] bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex flex-col md:flex-row">
            <div class="w-12/12 md:w-10/12 p-10">
                <h1 class="text-5xl font-bold text-white">{{  user.name  }}</h1>
                <span class="text-2xl font-bold text-white">33 iteme</span>
            </div>
            <div class="w-12/12 md:w-2/12 flex items-center justify-center p-10">
                <span class="bg-green-100 text-green-600 w-full text-center py-2 rounded-full">Add as friend</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/apiService';

export default {
    name: "Profile",

    data() {
        return {
            user: {},
            errors: []
        }
    },

    beforeMount() {
        // get last part of url
        const url = window.location.href;
        const lastPart = url.substr(url.lastIndexOf('/') + 1);

        api.get('/users/' + lastPart).then((response) => {
            this.user = response.data.data;
        });
    },
}
</script>