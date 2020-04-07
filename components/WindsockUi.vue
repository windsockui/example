<template>
    <section>
        <div class="container mx-auto relative z-30 h-16 overflow-visible -mb-16 pl-56 flex">
            <div class="flex items-center text-gray-500"> <input type="checkbox" class="m-2" v-model="editing"> Editing</div>
        </div>
        <component
            :ref="item.id"
            v-bind:is="item.title"
            :key="item.id"
            v-for="(item, index) in cmsData.components"
            :editing="editing"
            @hook:mounted="addClasses(item.id)"></component>
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
                pageTitle: '',
                editing: false
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
            },
            addClasses(id) {

                let oldClasses = this.$refs[id][0].$el.classList;
                let newClasses = this.cmsData.layout[id] && this.cmsData.layout[id].class.split(" ");

                if (newClasses) {
                    oldClasses.remove(...oldClasses);
                    for (let i in Object.getOwnPropertyNames(newClasses)) {
                        let clazz = newClasses[i];
                        if (clazz) {
                            oldClasses.add(clazz);
                        }
                    }
                }

            },
            search(array, string) {
                let j = [];
                for (let i in array) {
                    if (array[i].includes(string)) {

                    }
                }
            }

        },
        head() {
            return {
                title: this.pageTitle
            }
        }
    }
</script>
