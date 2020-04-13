<template>
    <section>
        <windsock-toolbar v-if="editing" @close="editing = false"/>
        <component
            :ref="item.id"
            v-bind:is="item.title"
            :key="item.id"
            v-for="(item) in cmsData.components"
            :editing="editing"
            :content="cmsData.content[item.id]"
            @hook:mounted="addClasses(item.id)">
        </component>
        <div>{{cmsData.content}}</div>
    </section>
</template>

<script>

    import NavbarWind from "@/components/NavbarWind";
    import HeroWind from "@/components/HeroWind";
    import SlantedBreakWind from "@/components/SlantedBreakWind";
    import ParagraphWind from "@/components/ParagraphWind";
    import CardsWind from "@/components/CardsWind";
    import FooterWind from "@/components/FooterWind";
    import axios from "axios";
    import WindsockToolbar from "@/components/WindsockToolbar";

    export default {
        name: "WindsockUi",
        components: {WindsockToolbar, ParagraphWind, SlantedBreakWind, HeroWind, NavbarWind, CardsWind, FooterWind},
        data() {
            return {
                cmsData: {},
                toolbar: {
                    dragging: false,
                    offsetX: 0,
                    offsetY: 0,
                    mouseMoveListener: undefined,
                    mouseUpListener: undefined
                },
                pageTitle: '',
                editing: false
            }
        },
        mounted() {
            this.checkEditMode();
            this.fetchData();
        },
        methods: {
            async fetchData() {
                const result = await axios.get('/cms/data/www.windsockui.com');

                this.cmsData = result.data;
                console.log (this.cmsData);
                this.pageTitle = this.cmsData.page.title;
            },
            checkEditMode() {
                const path = this.$route.path;
                if (path.endsWith("/edit")) {
                    this.editing = true;
                }
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
            }
        },
        watch: {
            editing: function(n) {
                if (n === false) {
                    const path = this.$route.path;
                    this.$router.push('/' + path.substring(0, path.lastIndexOf("/edit")));
                }
            }
        },
        head() {
            return {
                title: this.pageTitle,
                bodyAttrs: {
                    class: this.editing ? 'disable-selection' : ''
                }
            }
        }
    }
</script>
