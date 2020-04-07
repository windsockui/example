<template>
    <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row flex-auto items-center  mt-16 lg:mt-20 flex">
            <card-wind class="w-full mb-10"/>
            <card-wind class="w-full ml-16 mr-16 mb-10"/>
            <card-wind class="w-full mb-10"/>
        </div>
    </div>
</template>

<script>
    import CardWind from "./CardWind";
    export default {
        name: "CardsWind",
        components: {CardWind}
    }
</script>

<style scoped>

</style>
