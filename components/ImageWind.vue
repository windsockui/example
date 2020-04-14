<template>
    <img ref="image" :src="src">
</template>


<script>

    import Vue from 'vue';
    import WindsockEditImage from "@/components/WindsockEditImage";

    export default {
        name: "ImageWind",
        components: {WindsockEditImage},
        data() {
            return {
                editOverlay: undefined
            }
        },
        props: {
            "editing" : {
                type: Boolean,
                default: false
            },
            "src": {
                type: String,
                default: ''
            }
        },
        mounted() {
            let imageEditClass = Vue.extend(WindsockEditImage);
            let imageEdit = new imageEditClass();
            imageEdit.$mount();
            if (this.editing)
                this.editOverlay = this.$refs.image.insertAdjacentElement("afterend", imageEdit.$el);

        },
        watch: {
            editing: function(o, n) {
                if (n === false) {
                    this.editOverlay.remove();
                }
            }
        }
    }
</script>

<style scoped>

</style>
