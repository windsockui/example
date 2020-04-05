<template>
    <section>
        <navbar-wind/>
        <hero-wind/>
        <slanted-break-wind/>
        <paragraph-wind/>
    </section>
</template>

<script>

    import NavbarWind from "../components/NavbarWind";
    import HeroWind from "../components/HeroWind";
    import SlantedBreakWind from "../components/SlantedBreakWind";
    import ParagraphWind from "../components/ParagraphWind";
    export default {
        name: "index.vue",
        components: {ParagraphWind, SlantedBreakWind, NavbarWind, HeroWind}
    }

</script>

<style>
 body {
     @apply bg-gray-900
 }
</style>
