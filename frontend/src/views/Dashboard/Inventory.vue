<template>
    <div class="container mx-auto mt-5 relative">
        <div class="absolute z-20 flex items-center justify-center h-full w-full" v-if="addPopup">
            <div class="w-6/12 bg-white rounded-md p-10 z-30">
                <div class="flex flex-row w-full">
                    <h1 class="w-6/12 text-3xl font-bold text-black">Add item</h1>
                    <div class="w-6/12 flex justify-end">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="addPopup = false" class="cursor-pointer">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                        </svg>
                    </div>
                </div>
                <form class="mt-10 flex flex-col gap-5" @submit.prevent="addItem">
                    <div class="flex flex-col gap-1">
                        <span>Name</span>
                        <input v-model="item.name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Cheese">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span>Quantity</span>
                        <input v-model="item.qty" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="1">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span>Category</span>
                        <select v-model="item.category" class="appearance-none border rounded bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="" disabled selected>Select category</option>
                            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span>Expires at</span>
                        <Datepicker v-model="item.expiresAt"></Datepicker>
                    </div>
                    <button type="submit" @submit="addItem" class="bg-gradient-to-br from-green-400 to-green-600 block px-4 py-2  text-white rounded-full h-full flex items-center justify-center">Add</button>
                </form>
            </div>
            <div class="bg-black opacity-50 w-full h-full fixed top-0 left-0" @click="addPopup = false"></div>
        </div>
        <div class="w-full p-10 rounded-md border bg-gray-50">
            <div class="flex flex-col md:flex-row w-full items-center gap-4">
                <h1 class="text-3xl font-bold text-black">Inventory</h1>
                <span @click="addPopup = true" class="cursor-pointer bg-gradient-to-br from-green-400 to-green-600 block px-4 py-2  text-white rounded-full h-full flex items-center justify-center" v-if="user.id == getUser().id">+</span>
            </div>
            <div class="w-full md:w-1/2 flex flex-col mt-5">
                <div class="flex flex-row gap-5 items-center justify-end">
                    <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search" v-model="search">
                </div>

                <div v-for="category in categories" :key="category.id">
                    <div class="flex flex-col gap-2 mt-10" v-if="hasItems(category.id)">
                        <span class="text-xl font-bold">{{ category.name }}</span>
                        <div class="flex flex-row gap-5 items-center justify-start">
                            <div class="min-w-[250px] bg-white rounded-xl border" v-for="item in itemsByCategory(category.id)" v-bind:key="item.id">
                                <div class="p-3">
                                    <h1 class="text-md font-bold">{{  item.name }}</h1>

                                    <div class="flex flex-col">
                                        <div class="flex flex-col p-3">
                                            <span class="uppercase text-xs font-bold">Qty</span>
                                            <span class="text-md font-bold">{{ item.qty }}</span>
                                        </div> 
                                        <div class="flex flex-col p-3">
                                            <span class="uppercase text-xs font-bold">Expires</span>
                                            <span class="text-md font-bold">{{ timeLeftString(item.expiresAt) }}</span>
                                        </div>

                                        <span class="uppercase text-xs font-bold pl-3 mt-5">Share</span>
                                        <div class="flex flex-row p-3 gap-3">
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=#url" class="px-4 bg-blue-200 text-blue-500 rounded-full text-xs max-w-max py-2">
                                                FB
                                            </a>
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=#url" class="px-4 bg-purple-200 text-purple-500 rounded-full text-xs max-w-max py-2">
                                                IG
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-green-200 text-green-500 text-center rounded-b-xl py-2 text-xs uppercase cursor-pointer hover:bg-green-300 transition hover:text-green-600" v-if="user.id != getUser().id">
                                    Claim
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/apiService';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: "Inventory",

    components: {
        Datepicker
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            search: '',
            addPopup: false,
            inventory: [],
            initialInventory: [],
            item: {
                name: '',
                user_id: this.user.id,
                category: '',
                qty: '',
                expiresAt: null
            },
            categories: []
        }
    },

    methods: {
        addItem() {
            let userId = this.user.id;
            api.post('/inventory/' + userId, this.item)
                .then(response => {
                    this.inventory.push(response.data);
                    this.initialInventory.push(response.data);
                    this.addPopup = false;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    computed: {
        hasItems() {
            return (id) => {
                return this.inventory.filter((item) => item.category_id == id).length;
            }
        },

        itemsByCategory() {
            return (id) => {
                return this.inventory.filter((item) => item.category_id == id);
            }
        }
    },

    watch: {
        search() {
            this.inventory = this.initialInventory.filter((item) => {
                return item.name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },

    created() {
        setTimeout(() => {
            let userId = this.user.id;
            console.log(userId);
            api.get('/inventory/' + userId)
                .then(response => {
                    this.inventory = response.data.data;
                    this.initialInventory = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });

            api.get('/categories')
                .then(response => {
                    this.categories = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }, 1000);
    }
}
</script>