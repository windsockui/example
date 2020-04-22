<template>
    <div class="relative separator bg-gray-900 z-10 h-16 -mt-16" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <div class="h-full">
            <!--
            @TODO: This toolbar has a negative margin, which makes sense so it sits on top of things, but with
            @TODO: thinner components that means this either lands underneah or on top of the other component. This makes
            @TODO: it hard to see / mouseover / moove, etc -->
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="right-0 mt-4 mr-4"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SlantedBreakWind",
        data() {
            return {
                componentToolbar:true
            }
        },
        props: {
            "editing": {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style scoped>

    .separator {
        clip-path: polygon(
            0 102%,
            100% 0%,
            100% 102%
        );
    }

</style>
