<template>
    <img ref="image" :src="src">
</template>


<script>

    import Vue from 'vue';
    import WindsockEditImageOverlay from "@/components/WindsockEditImageOverlay";

    export default {
        name: "ImageWind",
        props: {
            "src": {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped>

</style>
