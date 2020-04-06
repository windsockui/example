<template>
    <section>
        <div v-for="(item, index) in cmsData.components">
            <component v-bind:is="item"></component>
        </div>
    </section>
</template>

<script>
    // https://css-tricks.com/creating-vue-js-component-instances-programmatically/

    import NavbarWind from "@/components/NavbarWind";
    import HeroWind from "@/components/HeroWind";
    import SlantedBreakWind from "@/components/SlantedBreakWind";
    import ParagraphWind from "@/components/ParagraphWind";
    import CardsWind from "@/components/CardsWind";
    import FooterWind from "@/components/FooterWind";
    import axios from "axios";

    export default {
        name: "WindsockUi",
        components: {ParagraphWind, SlantedBreakWind, HeroWind, NavbarWind, CardsWind, FooterWind},
        data() {
            return {
                cmsData: {},
                pageTitle: ''
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                const result = await axios.get('/cms/data/www.windsockui.com');
                this.cmsData = result.data;
                this.pageTitle = this.cmsData.page.title;
                console.log (result.data)
            }
        },
        head() {
            return {
                title: this.pageTitle
            }

        }
    }
</script>

<style scoped>

</style>
