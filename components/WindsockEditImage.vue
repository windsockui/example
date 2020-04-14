<template>

    <div class="absolute left-0 right-0 top-0 bottom-0 p-5" @mouseover="visible=true" @mouseout="visible=false">
        <div class="flex items-center justify-center bg-black-transparent w-10 h-10 border-gray-700 border-2 rounded-lg text-gray-500 hover:text-white cursor-pointer">
                <fa icon="camera" />
        </div>
    </div>

</template>

<script>
    export default {
        name: "WindsockEditImage",
        data() {
            return {
                visible: false
            }
        }
    }
</script>

<style scoped>

</style>
