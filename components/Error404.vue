<template>

    <div class="flex flex-col justify-center items-center h-screen">
        <div class="text-massive text-gray-300 roboto-condensed">404</div>
        <div class="text-4xl text-gray-500 font-thin">Not found, however</div>
        <div class="text-2xl text-gray-500 font-thin" v-if="!$route.path.endsWith('/edit')" >You can <nuxt-link class="text-green-500 hover:text-white" :to="$route.path + '/edit'">edit</nuxt-link> this page</div>
        <div class="text-2xl text-gray-500 font-thin" v-if="$route.path.endsWith('/edit')">You can add components to this page with <strong>+</strong></div>
    </div>
</template>

<script>
    export default {
        name: "Error404"
    }
</script>

<style scoped>

</style>
