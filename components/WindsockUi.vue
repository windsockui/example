<template>
    <section>
        <transition name="fade">
            <windsock-toolbar v-if="editing" @close="toolbarCancel" @openModal="openModal" @uploadContent="uploadContent" @addComponent="addComponent"/>
        </transition>
        <!-- @TODO: This only allows stacked sections and divs one atop another. Need to allow templates -->
        <transition-group name="components" tag="div">
            <component
                v-for="(item, index) in cmsData.components"
                :ref="item.id"
                :is="item.componentName"
                :key="(item.id)"
                :editing="editing"
                v-model="cmsData.content[item.id]"
                @openModal="openModal"
                class="component"
                @hook:mounted="addClasses(item.id)"
            >
                <template slot-scope="{buttons, clazz, disabled}">
                    <windsock-component-toolbar
                        v-if="editing" :buttons="buttons" :class="clazz" :disabled="disabled"
                        @componentRemove="removeComponent(item.id)"
                        @componentUp="moveComponentUp(index)"
                        @componentDown="moveComponentDown(index)"
                    />
                </template>
            </component>
        </transition-group>

        <!--
        <pre class="text-white">{{cmsData}}</pre>
        -->

        <windsock-modal v-if="modalData.name">
            <component :is="modalData.name" @answer="modalAnswered" :data="modalData.data"/>
        </windsock-modal>
    </section>
</template>
<script>

    import axios from "axios";
    import {v4 as uuidv4} from 'uuid';

    // Front-end Components
    import NavbarWind from "@/components/NavbarWind";
    import HeroWind from "@/components/HeroWind";
    import SlantedBreakWind from "@/components/SlantedBreakWind";
    import ParagraphWind from "@/components/ParagraphWind";
    import CardsWind from "@/components/CardsWind";
    import FooterWind from "@/components/FooterWind";
    import HtmlWind from "@/components/HtmlWind";

    // CMS Components
    import Windsock404 from "@/components/Windsock404";
    import Windsock504 from "@/components/Windsock504";
    import WindsockToolbar from "@/components/WindsockToolbar";
    import WindsockModal from "@/components/WindsockModal";
    import WindsockModalUrl from "@/components/WindsockModalUrl";
    import WindsockModalAlert from "@/components/WindsockModalAlert";
    import WindsockComponentToolbar from "@/components/WindsockComponentToolbar";
    import ArtemisNavbarWind from "@/components/ArtemisNavbarWind";
    import ArtemisDevRegWind from "@/components/ArtemisDevRegWind";
    import ArtemisVarmapWind from "@/components/ArtemisVarmapWind";

    export default {
        name: "WindsockUi",
        /* @TODO: These components must all load dynamically (editable via an online code editor) */
        components: {
            ArtemisVarmapWind,
            ArtemisDevRegWind,
            ArtemisNavbarWind,
            HtmlWind,
            CardsWind,
            FooterWind,
            HeroWind,
            NavbarWind,
            ParagraphWind,
            SlantedBreakWind,
            Windsock404,
            Windsock504,
            WindsockComponentToolbar,
            WindsockModal,
            WindsockModalUrl,
            WindsockModalAlert,
            WindsockToolbar

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
                /* @TODO uploadContent() and fetchContent() both duplicate the fetchContent code */
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
                        this.cmsData.components.push({id:'windsock404',componentName:'windsock404'});
                    } else if (error.response.status === 504) {
                        this.cmsData.components.push({id:'windsock504',componentName:'windsock504'});
                    } else {
                        console.log ('ERROR:' + error);
                    }

                }

            },
            async uploadContent(data) {
                try {
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
                } catch (error) {
                    this.cmsData.components.push({id:'windsock404',componentName:'windsock404'});
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
            addComponent(componentName) {
                let uuid = uuidv4();
                try {
                    if (this.cmsData.components.length === 1 && this.cmsData.components[0].componentName === 'windsock404') {
                        this.cmsData.components = [];
                    }
                } catch (error) {
                    console.error(error);
                }
                this.cmsData.components.push({componentName: componentName, id: uuid});
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
                    let self = this;
                    setTimeout(function () {
                        self.$router.push(newPath === '' ? '/' : newPath);
                    }, 500);
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
            },
            removeComponent(id) {
                this.cmsData.components = this.cmsData.components.filter(function(obj) {
                    return obj.id !== id;
                });
                this.$delete (this.cmsData.layout,id);
                this.$delete (this.cmsData.content,id);
            },
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
<style>

    .component {
        left: 0;
    }

    .components-move {
        opacity: 0.5;
        transition: transform 0.5s;
    }

    .components-leave-active {
        opacity: 0;
        transition: all 0.5s;
        left:-2000px
    }

</style>
