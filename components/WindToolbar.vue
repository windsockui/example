<template>
    <div ref="toolbar" class="absolute h-16 z-30 rounded-lg shadow-md flex glass" style="left:calc(100% - 200px); top:50px">
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-white cursor-move" @mousedown="startDrag">
            <fa icon="grip-vertical" class="text-gray-500" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-r border-gray-500 text-white cursor-pointer">
            <fa icon="upload" class="" />
        </div>
        <div class="flex items-center pl-5 pr-5 mt-3 mb-3 border-gray-500 text-white cursor-pointer" @click="$emit('close')">
            <fa icon="times" class="" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "WindToolbar",
        data() {
            return {
                toolbar: {
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
