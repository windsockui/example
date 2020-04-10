<template>
    <div ref="toolbar" class="absolute h-16 z-30 rounded-lg shadow-md flex glass" style="left:calc(100% - 300px); top:50px">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-white cursor-move" @mousedown="startDrag" title="drag">
            <fa icon="grip-vertical" class="text-green-700" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="Rollback">
            <fa icon="undo-alt" class="" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="save">
            <fa icon="save" class="" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="publish">
            <fa icon="upload" class="" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="$emit('close')" title="exit editor">
            <fa icon="times" class="" />
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
                    offsetX: 0,
                    offsetY: 0,
                    mouseMoveListener: undefined,
                    mouseUpListener: undefined
                }
            }
        },
        methods: {
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

</style>
