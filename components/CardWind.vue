<template>
    <div class="relative rounded-lg overflow-hidden shadow-lg bg-white" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <windsock-component-toolbar v-if="componentToolbar && editing" v-on="$listeners" :disable="{delete:true, up:true, down:true}" :buttons="[{icon:'camera', tooltip:'switch image', callback:askImageUrl}]" class="right-0 mt-4 mr-4"></windsock-component-toolbar>
        <img class="object-cover h-64 w-full" :src="content.imageUrl" alt="Sunset in the mountains">
        <div class="px-6 py-4">
            <h2 class="text-xl mb-2 roboto-condensed editable" :class="{'editing':editing}" :contenteditable="editing" @blur="update($event, 'heading')">{{content.heading}}</h2>
            <p class="text-gray-900 text-base roboto font-thin editable" :class="{'editing':editing}" :contenteditable="editing" @blur="update($event, 'text')">
                {{content.text}}
            </p>
        </div>
        <div class="px-6 py-4">
            <span v-for="tag in content.tags" class="roboto font-thin inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mt-2">{{tag}}</span>
        </div>
    </div>
</template>

<script>
    import WindsockComponentToolbar from "./WindsockComponentToolbar";
    export default {
        name: "CardWind",
        components: {WindsockComponentToolbar},
        props: ['editing', 'value'],
        data: () => ({
            componentToolbar: false,
            content: {}
        }),
        methods: {
            askImageUrl() {
                this.$emit('openModal', {name:'windsock-modal-url', callback:this.imageUrlSet});
            },
            imageUrlSet(answer) {
                if (answer.status === 'ok') {
                    this.content.imageUrl = answer.data.url;
                    this.$emit('input', this.content);
                }
            },
            update(event, item) {
                this.content[item] = event.target.innerText;
                this.$emit('input', this.content);
            }
        },
        mounted() {
            this.content = this.value;
        }

    }
</script>

<style scoped>

</style>
