<template>
    <img ref="image" :src="src">
</template>


<script>
    
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
