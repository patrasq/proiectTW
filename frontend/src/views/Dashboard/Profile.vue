<template>
    <div class="flex flex-col container mx-auto">
        <div class="min-h-[150px] bg-gradient-to-br from-green-500 to-green-400 rounded-2xl flex flex-col md:flex-row">
            <div class="w-12/12 md:w-10/12 p-10">
                <h1 class="text-5xl font-bold text-white">{{ user.name }}</h1>
                <span class="text-2xl font-bold text-white">Number of items: {{ items.length }}</span>
            </div>
            <div class="w-12/12 md:w-2/12 flex items-center justify-center p-10">
                <span class="bg-green-100 text-green-600 w-full text-center py-2 rounded-full cursor-pointer"
                    @click="addFriend" v-if="user.id != getUser().id && !isFriend">Add as friend</span>
                <span class="bg-green-100 text-green-600 w-full text-center py-2 rounded-full cursor-pointer"
                    @click="removeFriend()" v-if="isFriend && user.id != getUser().id">Remove
                    friend!</span>
                <span class="bg-green-100 text-green-600 w-full text-center py-2 rounded-full"
                    v-if="user.id == getUser().id">You have {{
                    friends.length }} friends!</span>
            </div>
        </div>
        <Inventory :user="user" />
    </div>
</template>

<script>
    import api from '../../services/apiService';
    import Inventory from './Inventory.vue';

    export default {
        name: "Profile",

        components: {
            Inventory
        },

        data() {
            return {
                user: {},
                errors: [],
                items: [],
                friends: [],
                isFriend: false
            }
        },

        mounted() {
            const url = window.location.href;
            const lastPart = url.substr(url.lastIndexOf('/') + 1);

            api.get('/users/' + lastPart).then((response) => {
                this.user = response.data.data;
            });

            api.get('/inventory/' + lastPart).then((response) => {
                this.items = response.data.data;
            });

            api.get('/users/friends/' + lastPart).then((response) => {
                this.friends = response.data.data;
                this.friends.forEach((friend) => {
                    if (friend.friend_id == this.getUser().id || friend.user_id == this.getUser().id) {
                        this.isFriend = true;
                    }
                });
            });
        },

        methods: {
            addFriend() {
                api.post('/users/friends', { friendId: this.user.id }).then((response) => {
                    alert('Friend added');
                    this.isFriend = true;
                }).catch((error) => {
                    alert(error.response.data.error);
                });
            },

            removeFriend() {
                api.delete('/users/friends/' + this.user.id).then((response) => {
                    alert('Friend removed');
                    this.isFriend = false;
                }).catch((error) => {
                    console.log(error);
                    alert(error);
                });
            },
        }
    }
</script>