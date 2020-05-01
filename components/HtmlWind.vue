<template>
    <div @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="right-0 mr-8"></slot>
        <div class="text-2xl m-12 text-gray-500 roboto-condensed" v-if="!content">Empty Html Component</div>
        <div v-html="content" v-if="content" ></div>
        <div class="container mx-auto">
            <textarea v-show="editing && (componentToolbar || editFocused)" v-html="content" @keyup="updated" class="w-full font-mono rounded-lg shadow-lg text-green-500 bg-black-transparent-50 p-2" @focus="editFocused=true" @blur="editFocused=false"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HtmlWind",
        props: {
            "editing" : {
                type: Boolean,
                default: false,
            },
            "value": {
                type: String,
                default: ''
            }
        },
        data: () => ({
            content: '',
            componentToolbar: false,
            editFocused: false
        }),
        mounted() {
            this.content = this.value;
        },
        methods: {
            updated(event) {
                this.content=event.target.value
                this.$emit('input', this.content);
            }
        }
    }
</script>

<style scoped>

</style>
