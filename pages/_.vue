<template>
    <!--@TODO: Disabling Universal. SPA only. Window.location.host ain't going to do it on server... -->
    <windsock-ui :domain="host"/>
</template>

<script>

    import WindsockUi from "../components/WindsockUi";
    export default {
        name: "index.vue",
        components: {WindsockUi},
        computed: {
            'host': () => {
                return window.location.host;
            }
        }
    }
</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
