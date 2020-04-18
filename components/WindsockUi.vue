<template>
    <section>
        <windsock-toolbar v-if="editing" @close="toolbarCancel" @openModal="openModal" @uploadContent="uploadContent"/>
        <component
            :ref="item.id"
            v-bind:is="item.title"
            :key="item.id"
            v-for="(item) in cmsData.components"
            :editing="editing"
            v-model="cmsData.content[item.id]"
            @hook:mounted="addClasses(item.id)"
            @openModal="openModal"
        >
        </component>
        <windsock-modal v-if="modalData.name">
            <component :is="modalData.name" @answer="modalAnswered" :data="modalData.data"/>
        </windsock-modal>
        <!-- We can build template in a much more exciting way -->
        <!--
        <div>{{cmsData.content}}</div>
        -->
    </section>
</template>
<script>

    import axios from "axios";
    import {v5} from 'uuid';

    import NavbarWind from "@/components/NavbarWind";
    import HeroWind from "@/components/HeroWind";
    import SlantedBreakWind from "@/components/SlantedBreakWind";
    import ParagraphWind from "@/components/ParagraphWind";
    import CardsWind from "@/components/CardsWind";
    import FooterWind from "@/components/FooterWind";
    import WindsockToolbar from "@/components/WindsockToolbar";
    import WindsockModal from "@/components/WindsockModal";
    import WindsockModalUrl from "@/components/WindsockModalUrl";
    import WindsockModalAlert from "./WindsockModalAlert";

    export default {
        name: "WindsockUi",
        components: {
            WindsockModal,
            WindsockToolbar,
            ParagraphWind,
            SlantedBreakWind,
            HeroWind,
            NavbarWind,
            CardsWind,
            FooterWind,
            WindsockModalUrl,
            WindsockModalAlert
        },
        props: {
            'domain' : {
                required: true,
            }
        },
        data() {
            return {
                cmsData: {
                    page:{}, components:[], layout:{}, content:{}
                },
                SessionId: undefined,
                originalCmsData: {},
                toolbar: {
                    dragging: false,
                    offsetX: 0,
                    offsetY: 0,
                    mouseMoveListener: undefined,
                    mouseUpListener: undefined
                },
                pageTitle: '',
                editing: false,
                modalData: {
                    name: null,
                    callback: null,
                    data: null
                }
            }
        },
        mounted() {
            this.checkEditMode();
            this.fetchContent();
        },
        methods: {
            async fetchContent() {
                const result = await axios.get('/cms/data/' + this.domain + this.$route.path.replace("/edit"));
                let dataReceived = result.data.json;
                if (dataReceived.page) {
                    this.cmsData.page = dataReceived.page;
                    this.pageTitle = this.cmsData.page.title;
                }
                if (dataReceived.components) this.cmsData.components = dataReceived.components;
                if (dataReceived.layout) this.cmsData.layout = dataReceived.layout;
                if (dataReceived.content) this.cmsData.content = dataReceived.content;
            },
            async uploadContent(data) {
                const result = await axios.put('/cms/data/' + this.domain + this.$route.path.replace("/edit"), this.cmsData);
                if (result.status === 200) {
                    data.callback();
                }
            },
            checkEditMode() {
                const path = this.$route.path;
                if (path.endsWith("/edit")) {
                    this.editing = true;
                }
            },
            openModal(modalData) {
                this.modalData = modalData
            },
            modalAnswered(answer) {
                this.modalData.name = null;
                this.modalData.callback && this.modalData.callback(answer);
            },
            toolbarCancel() {
                this.editing = false;
                const path = this.$route.path;
                this.$router.push('/' + path.substring(0, path.lastIndexOf("/edit")));
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
