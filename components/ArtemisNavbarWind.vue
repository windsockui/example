<template>
    <div>
        <div class="h-16 relative z-20 shadow-md bg-gray-900" />
        <section class="container mx-auto -mt-16 relative z-20 artemis-navbar" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4 right-0"/>
            <div class="flex w-full border-1 h-16">
                <div class="relative shadow-lg overflow-visible h-24 w-40 bg-gray-800 flex flex-col flex-shrink-0 justify-center items-center mr-12" :class="{'cursor-pointer':!this.$route.path.endsWith('/edit')}" @click="switchToEdit">
                    <img src="https://i.imgur.com/JtKkapg.png" class="flex h-16 p-1"/>
                    <div class="roboto-condensed font-thin text-sm justify-center pt-1 text-gray-500 tracking-wider">ARTEMIS PROGRAM</div>
                </div>
                <div class="flex text-gray-400 roboto font-thin">
                    <nuxt-link to="/" class="flex items-center hover:cursor-pointer hover:bg-gray-800 pl-2 pr-2">Home</nuxt-link>
                    <nuxt-link to="/about" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">About</nuxt-link>
                    <nuxt-link to="/developers" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Developer</nuxt-link>
                    <nuxt-link to="/registration" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Registration</nuxt-link>
                    <nuxt-link to="/mapping-wizard" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">FHIR Wizard</nuxt-link>
                    <nuxt-link to="/mapping-wizard" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Downloads</nuxt-link>
                    <nuxt-link to="/forum" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Forum</nuxt-link>
                    <nuxt-link to="/contact-us" class="flex items-center hover:cursor-pointer hover:text-white hover:bg-gray-800 pl-2 pr-2">Contact</nuxt-link>
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
    .artemis-navbar .nuxt-link-active {
        @apply bg-blue-900;
        @apply text-white;
    }
</style>
