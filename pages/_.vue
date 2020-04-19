<template>
    <windsock-ui domain="www.windsockui.com"/>
</template>

<script>

    import WindsockUi from "../components/WindsockUi";
    export default {
        name: "index.vue",
        components: {WindsockUi},
        mounted() {
            console.log (process.env.MARK || "Mark van Wyk");
            console.log (process.env.DATABASE_URL);
            console.log (process.env.DOMAIN);
        }
    }

</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
