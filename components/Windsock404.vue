<template>
    <section class="relative">
        <div class="flex justify-center items-center h-screen">
            <div class="flex flex-col" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
                <slot v-if="componentToolbar"/>
                <div class="flex justify-center text-massive text-gray-300 roboto-condensed">404</div>
                <div class="flex justify-center text-4xl text-gray-500 font-thin">Not found, however</div>
                <div class="flex justify-center text-2xl text-gray-500 font-thin" v-if="!$route.path.endsWith('/edit')" >You can&nbsp;<nuxt-link class="text-green-500 hover:text-white" :to="$route.path + '/edit'">edit</nuxt-link>&nbsp;this page</div>
                <div class="flex justify-center text-2xl text-gray-500 font-thin" v-if="$route.path.endsWith('/edit')">You can add components to this page with&nbsp;<strong>+</strong></div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Windsock404",
        data() {
            return {
                componentToolbar: false
            }
        }
    }
</script>

<style scoped>

</style>
