<template>
    <div>
        <div class="h-16 relative z-20 shadow-md bg-gray-900" />
        <section class="container mx-auto -mt-16 relative z-20 artemis-navbar" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4 right-0"/>
            <div class="flex w-full border-1 h-16">
                <!-- EDIT MODE DISABLED :class="{'cursor-pointer':!this.$route.path.endsWith('/edit')}" @click="switchToEdit"-->
                <div class="relative shadow-lg overflow-visible h-24 w-40 bg-gray-800 flex flex-col flex-shrink-0 justify-center items-center mr-12">
                    <nuxt-link to="/" class="hover:cursor-pointer"><img src="https://i.imgur.com/JtKkapg.png" class="flex h-16 p-1"/></nuxt-link>
                    <div class="roboto-condensed font-thin text-sm justify-center pt-1 text-gray-500 tracking-wider">ARTEMIS PROGRAM</div>
                </div>
                <div class="flex text-gray-400 roboto font-thin menu">
                    <nuxt-link exact to="/" class="flex items-center hover:cursor-pointer hover:bg-gray-800 pl-2 pr-2">Home</nuxt-link>
                    <nuxt-link exact to="/about" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">About</nuxt-link>
                    <nuxt-link exact to="/developers" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Developer</nuxt-link>
                    <nuxt-link exact to="/registration" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Registration</nuxt-link>
                    <nuxt-link exact to="/mapping-wizard" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">FHIR Wizard</nuxt-link>
                    <nuxt-link exact to="/downloads" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Downloads</nuxt-link>
                    <nuxt-link exact to="/forum" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Forum</nuxt-link>
                    <nuxt-link exact to="/contact-us" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Contact</nuxt-link>
                </div>
                <div class="flex flex-grow text-gray-400 roboto font-thin justify-end"><a href="https://ndoh.rsahealth.org/magi/#/auth/login-page" target="_blank" class="flex items-center hover:cursor-pointer  hover:text-white hover:bg-gray-800 pl-2 pr-2">Login</a></div>
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
    .artemis-navbar .menu.nuxt-link-active {
        @apply bg-blue-900;
        @apply text-white;
    }
</style>
