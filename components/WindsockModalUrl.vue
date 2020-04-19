<template>
    <div class="flex justify-center ml-12 mr-12 bg-black-transparent-85 w-full h-16 sm:w-128 border-gray-700 border-2 rounded-lg text-gray-500 roboto font-thin shadow-lg">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 text-green-700 cursor-pointer"><fa icon="camera" class="w-2" /></div>
        <div class="flex flex-grow items-center"><input type="text" v-model="url" class="w-full rounded-lg bg-gray-900 p-1 roboto font-thin text-gray-500" placeholder="https://"></div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="$emit('answer', {status:'ok', data:{url:url}})"><fa icon="check" class="w-2" /></div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 text-gray-500 hover:text-white cursor-pointer" @click="$emit('answer', {status:'cancel'})"><fa icon="times" class="w-2" /></div>
    </div>
</template>

<script>
    export default {
        name: "WindsockModalUrl",
        data() {
            return {
                url: null
            }
        }
    }
</script>
