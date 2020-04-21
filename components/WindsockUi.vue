<template>
    <section>
        <windsock-toolbar v-if="editing" @close="toolbarCancel" @openModal="openModal" @uploadContent="uploadContent" />
        <component
            v-for="(item, index) in cmsData.components"
            :ref="item.id"
            v-bind:is="item.title"
            :key="(item.id)"
            :editing="editing"
            v-model="cmsData.content[item.id]"
            @hook:mounted="addClasses(item.id)"
            @openModal="openModal"
            @componentRemove="cmsData.components.splice(index, 1)"
            @componentUp="moveComponentUp(index)"
            @componentDown="moveComponentDown(index)"
        >
        </component>
        <windsock-modal v-if="modalData.name">
            <component :is="modalData.name" @answer="modalAnswered" :data="modalData.data"/>
        </windsock-modal>
    </section>
</template>
<script>

    import axios from "axios";

    // Front-end Components
    import NavbarWind from "@/components/NavbarWind";
    import HeroWind from "@/components/HeroWind";
    import SlantedBreakWind from "@/components/SlantedBreakWind";
    import ParagraphWind from "@/components/ParagraphWind";
    import CardsWind from "@/components/CardsWind";
    import FooterWind from "@/components/FooterWind";

    // CMS Components
    import Windsock404 from "@/components/Windsock404";
    import WindsockToolbar from "@/components/WindsockToolbar";
    import WindsockModal from "@/components/WindsockModal";
    import WindsockModalUrl from "@/components/WindsockModalUrl";
    import WindsockModalAlert from "@/components/WindsockModalAlert";
    import WindsockComponentToolbar from "@/components/WindsockComponentToolbar";

    export default {
        name: "WindsockUi",
        components: {
            CardsWind,
            FooterWind,
            HeroWind,
            NavbarWind,
            ParagraphWind,
            SlantedBreakWind,

            Windsock404,
            WindsockComponentToolbar,
            WindsockModal,
            WindsockModalUrl,
            WindsockModalAlert,
            WindsockToolbar,

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
                let result = null;
                try {
                    result = await axios.get (this.domainPath());
                    let dataReceived = result.data.json;
                    if (dataReceived.page) {
                        this.cmsData.page = dataReceived.page;
                        this.pageTitle = this.cmsData.page.title;
                    }
                    if (dataReceived.components) this.cmsData.components = dataReceived.components;
                    if (dataReceived.layout) this.cmsData.layout = dataReceived.layout;
                    if (dataReceived.content) this.cmsData.content = dataReceived.content;

                } catch (error) {
                    if (error.response.status === 404) {
                        this.cmsData.components.push({id:'windsock404',title:'windsock404'});
                    }
                }

            },
            async uploadContent(data) {
                const result = await axios.put(this.domainPath(), this.cmsData);
                let dataReceived = result.data.json;
                if (result.status === 200) {
                    if (dataReceived.page) {
                        this.cmsData.page = dataReceived.page;
                        this.pageTitle = this.cmsData.page.title;
                    }
                    if (dataReceived.components) this.cmsData.components = dataReceived.components;
                    if (dataReceived.layout) this.cmsData.layout = dataReceived.layout;
                    if (dataReceived.content) this.cmsData.content = dataReceived.content;
                    data.callback();
                }
            },
            domainPath() {
                let path = '';
                path += '/cms/data/';
                path += this.domain;
                if (this.$route.path.endsWith("/edit")) {
                    path += this.$route.path.replace('/edit', '');
                } else {
                    path += this.$route.path;
                }
                if (path.endsWith('/')) {
                    path = path.substring(0, path.length - 1)
                }
                return path;
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
                if (path.endsWith("/edit")) {
                    const newPath = path.replace("/edit", '')
                    this.$router.push(newPath == '' ? '/' : newPath);
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
            },
            moveComponentUp(index) {
                let n = this.cmsData.components.slice();
                if (n[index - 1]) {
                    let temp = n[index - 1];
                    n[index - 1] = n[index];
                    n[index] = temp;
                }
                this.cmsData.components = n;
            },
            moveComponentDown(index) {
                let n = this.cmsData.components.slice();
                if (n[index + 1]) {
                    let temp = n[index + 1];
                    n[index + 1] = n[index];
                    n[index] = temp;
                }
                this.cmsData.components = n;
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
