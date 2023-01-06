<template>
    <div class="container mx-auto mt-5">
        <div class="w-full p-10 rounded-md border bg-gray-50">
            <div class="flex flex-col md:flex-row">
                <h1 class="text-3xl font-bold text-black">Andrei's inventory</h1>
            </div>
        </div>

        <div class="container mx-auto mt-5">
            <div class="w-full p-10 rounded-md border bg-gray-50">
                <div class="flex flex-col md:flex-row w-full items-center gap-4">
                    <h1 class="text-3xl font-bold text-black">Inventory</h1>
                    <span class="cursor-pointer bg-gradient-to-br from-green-400 to-green-600 block px-4 py-2  text-white rounded-full h-full flex items-center justify-center">+</span>
                </div>
                <div class="w-full md:w-1/2 flex flex-col mt-5">
                    <div class="flex flex-row gap-5 items-center justify-end">
                        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search">
                    </div>
                    <table class="bg-white rounded-md border table-auto w-full mt-5 overflow-scroll">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-left">Item</th>
                                <th class="px-4 py-2 text-left">Quantity</th>
                                <th class="px-4 py-2 text-left">Price</th>
                                <th class="px-4 py-2 text-left">Category</th>
                                <th class="px-4 py-2 text-left">Description</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border px-4 py-2">Item 1</td>
                                <td class="border px-4 py-2">1</td>
                                <td class="border px-4 py-2">10</td>
                                <td class="border px-4 py-2">Category 1</td>
                                <td class="border px-4 py-2">Description 1</td>
                                <td class="border px-4 py-2">
                                    Claim
                                </td>
                            </tr>
                            <tr class="bg-gray-100">
                                <td class="border px-4 py-2">Item 2</td>
                                <td class="border px-4 py-2">2</td>
                                <td class="border px-4 py-2">20</td>
                                <td class="border px-4 py-2">Category 2</td>
                                <td class="border px-4 py-2">Description 2</td>
                                <td class="border px-4 py-2">
                                    Claim
                                </td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Item 3</td>
                                <td class="border px-4 py-2">3</td>
                                <td class="border px-4 py-2">30</td>
                                <td class="border px-4 py-2">Category 3</td>
                                <td class="border px-4 py-2">Description 3</td>
                                <td class="border px-4 py-2">
                                    Claim
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>