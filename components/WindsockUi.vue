<template>
    <section>
        <!--
        <div class="container mx-auto relative z-30 h-16 overflow-visible -mb-16 pl-56 flex">
            <div class="flex items-center text-gray-500"> <input type="checkbox" class="m-2" v-model="editing"> Editing</div>
        </div>
        -->
        <div ref="toolbar" class="absolute h-16 z-30 rounded-lg shadow-md flex glass" style="left:calc(100% - 200px); top:50px">
            <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-white cursor-move" @mousedown="startDrag">
                <fa icon="grip-vertical" class="text-gray-500" />
            </div>
            <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-white cursor-pointer">
                <fa icon="upload" class="" />
            </div>
            <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-gray-500 text-white cursor-pointer">
                <fa icon="times" class="" />
            </div>
        </div>
        <component
            :ref="item.id"
            v-bind:is="item.title"
            :key="item.id"
            v-for="(item, index) in cmsData.components"
            :editing="editing"
            @hook:mounted="addClasses(item.id)">
        </component>
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

    export default {
        name: "WindsockUi",
        components: {ParagraphWind, SlantedBreakWind, HeroWind, NavbarWind, CardsWind, FooterWind},
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
            startDrag(mouse) {
                if (!this.toolbar.dragging) {
                    this.toolbar.offsetY = mouse.clientY - this.$refs.toolbar.getBoundingClientRect().top;
                    this.toolbar.offsetX = mouse.clientX - this.$refs.toolbar.getBoundingClientRect().left;
                    this.toolbar.dragging = true;
                    this.toolbar.mouseMoveListener = window.addEventListener('mousemove', this.doDrag);
                    this.toolbar.mouseUpListener = window.addEventListener('mouseup', this.endDrag);

                }
            },
            doDrag: function (mouse) {
                if (this.toolbar.dragging) {
                    this.$refs.toolbar.style.top = (mouse.clientY - this.toolbar.offsetY + window.pageYOffset) + "px";
                    this.$refs.toolbar.style.left = (mouse.clientX - this.toolbar.offsetX + window.pageXOffset) + "px";
                }
            },
            endDrag() {
                this.toolbar.dragging = false;
                window.removeEventListener('mousemove', this.doDrag);
                window.removeEventListener('mouseup', this.endDrag);
            }
        },
        head() {
            return {
                title: this.pageTitle
            }
        }
    }
</script>
