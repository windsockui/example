<template>
    <div>
        <div class="h-16 relative z-20 shadow-md bg-blue-900" />
        <section class="container mx-auto -mt-16 relative z-20 artemis-navbar" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4 right-0"/>
            <div class="flex w-full border-1 h-16">
                <div class="flex flex-shrink-0 justify-center items-center w-48 bg-blue-800" :class="{'cursor-pointer':!this.$route.path.endsWith('/edit')}" @click="switchToEdit">
                    <span class="text-blue-100 neo text-2xl tracking-wider">ARTEMIS</span>
                </div>
                <div class="flex text-gray-400 roboto font-thin">
                    <nuxt-link to="/home" class="flex items-center hover:cursor-pointer hover:text-white pl-2 pr-2">Home</nuxt-link>
                    <nuxt-link to="/developers" class="flex items-center hover:cursor-pointer hover:text-white pl-2 pr-2">Developer</nuxt-link>
                    <nuxt-link to="/registration" class="flex items-center hover:cursor-pointer hover:text-white pl-2 pr-2">Developer Registration</nuxt-link>
                    <nuxt-link to="/mapping-tool" class="flex items-center hover:cursor-pointer hover:text-white pl-2 pr-2">Mapping Tool</nuxt-link>
                    <nuxt-link to="/contact-us" class="flex items-center hover:cursor-pointer hover:text-white pl-2 pr-2">Contact Us</nuxt-link>
                </div>
                <div class="flex text-gray-400 flex-grow justify-end items-center"><a href="https://ndoh.rsahealth.org/magi/#/auth/login-page" target="_blank" class="cursor-pointer hover:text-white pl-4 hover:text-white pl-4">Login</a></div>
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
<style>
    .artemis-navbar .nuxt-link-active {
        @apply bg-blue-500;
        @apply text-white;
    }
</style>
