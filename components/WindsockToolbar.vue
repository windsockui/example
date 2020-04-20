<template>
    <div ref="toolbar" class="absolute h-16 z-30 rounded-lg flex bg-black-transparent-85 border-2 border-gray-700 text-md" style="left:calc(100% - 300px); top:50px">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-green-700 hover:text-green-500 cursor-move" @mousedown="startDrag" title="drag">
            <fa icon="grip-vertical" class="text-md" />
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
                    mouseUpListener: undefined
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

<style scoped>
    @-webkit-keyframes rotating {
        from{
            -webkit-transform: rotate(0deg);
        }
        to{
            -webkit-transform: rotate(360deg);
        }
    }

    .rotating {
        -webkit-animation: rotating 2s linear infinite;
    }
</style>
