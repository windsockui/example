<template>
    <div ref="toolbar" class="absolute h-16 z-30 rounded-lg flex bg-black-transparent-85 border-2 border-gray-700 text-md" style="left:calc(100% - 380px); top:50px">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-green-700 hover:text-green-500 cursor-move" @mousedown="startDrag" title="drag">
            <fa icon="grip-vertical" class="text-md" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="toolbar.addMenu = !toolbar.addMenu" title="add component">
            <fa icon="plus" class="text-md" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-800" title="rollback (coming soon)">
            <fa icon="undo-alt" class="text-md" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-800" title="save (coming soon)">
            <fa icon="save" class="text-md"/>
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="publish" @click="upload">
            <fa icon="upload" class="text-md" v-if="toolbar.uploading === 'no'"/>
            <fa icon="sync-alt" class="text-md text-yellow-500 rotating" v-if="toolbar.uploading === 'uploading'"/>
            <fa icon="check" class="text-md text-green-500" v-if="toolbar.uploading === 'uploaded'"/>
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="$emit('close')" title="exit editor">
            <fa icon="times" class="text-md" />
        </div>
        <transition name="fade">
            <div class="absolute pt-2 pb-2 bg-black-transparent-85 rounded-lg shadow-lg z-40 mt-12 ml-16 roboto font-thin text-gray-600 cursor-pointer" v-if="toolbar.addMenu">
                <!-- @TODO: This needs to be dynamic based on the components available. At the moment the components are 'hard'. Need to make them soft (as in a DB). -->
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'navbar-wind'), toolbar.addMenu = false]">Navbar</div>
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'hero-wind'), toolbar.addMenu = false]">Hero</div>
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'paragraph-wind'), toolbar.addMenu = false]">Paragraph</div>
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'cards-wind'), toolbar.addMenu = false]">Cards</div>
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'slanted-break-wind'), toolbar.addMenu = false]">Separator</div>
                <div class="pt-1 pr-4 pb-1 pl-4 hover:bg-gray-200" @click="[$emit('addComponent', 'footer-wind'), toolbar.addMenu = false]">Footer</div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "WindsockToolbar",
        data() {
            return {
                toolbar: {
                    touch: 'ontouchstart' in window || navigator.msMaxTouchPoints,
                    dragging: false,
                    uploading: 'no',
                    offsetX: 0,
                    offsetY: 0,
                    mouseMoveListener: undefined,
                    mouseUpListener: undefined,
                    addMenu: false
                }
            }
        },
        methods: {
            openModal(modalName, data) {
                this.$emit('openModal', {name:modalName, data:data, callback:this.modalResponse});
            },
            upload() {
                this.toolbar.uploading = "uploading";
                this.$emit('uploadContent', {callback: this.uploaded});
            },
            uploaded() {
                let self = this;
                this.toolbar.uploading = 'uploaded';
                setTimeout(function() {
                    self.toolbar.uploading = 'no';
                }, 800);

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
        }
    }
</script>

