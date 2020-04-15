<template>
    <div class="flex justify-center ml-12 mr-12 bg-black-transparent-85 w-full h-16 sm:w-128 border-gray-700 border-2 rounded-lg text-gray-500 roboto font-thin shadow-lg">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 text-yellow-500 cursor-pointer"><fa icon="exclamation-triangle" /></div>
        <div class="flex flex-grow items-center">{{data}}</div>
        <div class="flex items-center pl-5 pr-5 mt-3 border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="$emit('answer', {status:'close'})"><fa icon="check" /></div>
    </div>
</template>

<script>
    export default {
        name: "WindsockModalAlert",
        props: ['data']
    }
</script>

<style scoped>

</style>
