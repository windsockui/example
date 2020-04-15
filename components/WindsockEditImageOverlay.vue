<template>
    <div class="absolute left-0 right-0 top-0 bottom-0 p-5">
        <div class="flex items-center justify-center bg-black-transparent-85 w-10 h-10 border-gray-700 border-2 rounded-lg text-gray-500 hover:text-white cursor-pointer" @click="openModal('windsock-modal-url')">
            <fa icon="camera" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "WindsockEditImageOverlay",
        data() {
            return {
                visible: false
            }
        }, methods: {
            openModal(modalName) {
                this.$emit('openModal', {name:modalName, callback:this.modalResponse});
            },
            modalResponse(data) {
                console.log (data);
            }
        }
    }
</script>

<style scoped>

</style>
