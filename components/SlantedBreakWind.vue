<template>
    <div class="separator bg-gray-900 z-20 h-10 -mt-10 md:h-12 md:-mt-12 lg:h-16 lg:-mt-16"/>
</template>

<script>
    export default {
        name: "SlantedBreakWind",
    }
</script>

<style scoped>

    .separator {
        position: relative;
        clip-path: polygon(
            0 102%,
            100% 0%,
            100% 102%
        );
    }

</style>
