<template>
    <div>
        <div class="h-16 relative z-20 shadow-md bg-gray-900" />
        <section class="container mx-auto -mt-16 relative z-20" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4 right-0"/>
            <div class="flex w-full border-1 h-16">
                <div class="flex flex-shrink-0 items-center w-48 p-6 bg-gray-800" :class="{'cursor-pointer':!this.$route.path.endsWith('/edit')}" @click="switchToEdit">
                    <span class="text-red-500 neo text-2xl">ARTEMIS</span>
                </div>
                <div class="flex items-end text-gray-500 pb-2 roboto font-thin cursor-pointer">
                    <nuxt-link to="/home" class="hover:text-green-400 pl-4">Home</nuxt-link>
                    <nuxt-link to="/developers" class="hover:text-green-400 pl-4">Developer</nuxt-link>
                    <nuxt-link to="/registration" class="hover:text-green-400 pl-4">Dev Registration</nuxt-link>
                    <nuxt-link to="/mapping-tool" class="hover:text-green-400 pl-4">Mapping Tool</nuxt-link>
                    <nuxt-link to="/contact-us" class="hover:text-green-400 pl-4">Contact Us</nuxt-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "ArtemisNavbarWind",
        props: ['editing'],
        data() {
            return {
                componentToolbar: false
            }
        },
        methods: {
            switchToEdit() {
                if (!this.$route.path.endsWith('/edit')) {
                    this.$router.push(this.$route.path + '/edit')
                }
            }
        }
    }
</script>
