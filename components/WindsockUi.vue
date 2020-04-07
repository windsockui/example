<template>
    <section>
        <div v-for="(item, index) in cmsData.components">
            <component :ref="item.id" v-bind:is="item.title" :class="cmsData.layout[item.id] && cmsData.layout[item.id].class"></component>
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
                console.log (result.data); /*@TODO: Remove me*/
            }
        },
        head() {
            return {
                title: this.pageTitle
            }
        }
    }
</script>
