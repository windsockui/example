<template>
    <div class="container mx-auto" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <windsock-component-toolbar class="m-5 bg-red-500" v-if="componentToolbar && editing" v-on="$listeners"></windsock-component-toolbar>
        <div class="flex flex-col lg:flex-row flex-auto items-center  mt-16 lg:mt-20 flex">
            <card-wind class="w-full mb-10"/>
            <card-wind class="w-full ml-16 mr-16 mb-10"/>
            <card-wind class="w-full mb-10"/>
        </div>
    </div>
</template>

<script>
    import CardWind from "./CardWind";
    import WindsockComponentToolbar from "./WindsockComponentToolbar";
    export default {
        name: "CardsWind",
        components: {WindsockComponentToolbar, CardWind},
        props: ['editing'],
        data() {
            return {
                componentToolbar: false
            }
        }
    }
</script>

<style scoped>

</style>
