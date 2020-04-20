<template>
    <windsock-ui :domain="domain"/>
</template>

<script>

    import WindsockUi from "../components/WindsockUi";
    export default {
        name: "index.vue",
        components: {WindsockUi},
        computed: {
            'domain': function() {
                return process.env.domain;
            },
            'databaseUrl': function() {
                return process.env.databaseUrl;
            }
        },
        head() {
            return {
                title:'Hello'
            }
        }
    }

</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
