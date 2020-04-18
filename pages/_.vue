<template>
    <windsock-ui domain="www.windsockui.com"/>
</template>

<script>

    import WindsockUi from "../components/WindsockUi";
    export default {
        name: "index.vue",
        components: {WindsockUi}
    }

</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
