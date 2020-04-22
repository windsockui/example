<template>
    <section class="w-full h-64 bg-gray-800" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <div class="container mx-auto">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4"/>
        </div>
    </section>
</template>

<script>
    export default {
        name: "FooterWind",
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

</style>
