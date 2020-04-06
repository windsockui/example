<template>
    <windsock-ui/>
</template>

<script>

    import NavbarWind from "../components/NavbarWind";
    import HeroWind from "../components/HeroWind";
    import SlantedBreakWind from "../components/SlantedBreakWind";
    import ParagraphWind from "../components/ParagraphWind";
    import WindsockUi from "../components/WindsockUi";
    import CardsWind from "../components/WindsockUi";
    export default {
        name: "index.vue",
        components: {WindsockUi, ParagraphWind, SlantedBreakWind, NavbarWind, HeroWind, CardsWind}
    }

</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
