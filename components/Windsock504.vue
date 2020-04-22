<template>
    <section>
        <div class="flex justify-center items-center h-screen">
            <div class="flex flex-col" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
                <slot v-if="componentToolbar"/>
                <div class="flex justify-center text-massive text-gray-300 roboto-condensed">504</div>
                <div class="flex justify-center text-4xl text-gray-500 font-thin">Could not reach server</div>
                <div class="flex justify-center text-2xl text-gray-500 font-thin">Please try again later</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Windsock504",
        data() {
            return {
                componentToolbar: false
            }
        }
    }
</script>

<style scoped>

</style>
