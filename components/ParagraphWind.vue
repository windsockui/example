<template>
    <section class="relative container mx-auto text-gray-500 roboto font-thin text-lg mt-8 lg:mt-16 leading-relaxed" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="right-0 mr-8"></slot>
        <h1 class="text-4xl roboto-condensed text-gray-400 mb-3 editable"  :class="{'editing':editing}" :contenteditable="editing" ref="heading" v-if="content.heading" v-text="content.heading" @blur="update($event, 'heading')"></h1>
        <p class="editable whitespace-pre-line" :class="{'editing':editing}" :contenteditable="editing" v-if="content.text" v-text="content.text" ref="text" @blur="update($event, 'text')"></p>
    </section>
</template>

<script>
    import WindsockComponentToolbar from "@/components/WindsockComponentToolbar";
    export default {
        name: "ParagraphWind",
        components: {WindsockComponentToolbar},
        props: {
            "editing" : {
                type: Boolean,
                default: false,
            },
            "value": {
                type: Object,
                default: () => ({
                    heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                })
            }
        },
        data() {
            return {
                content: {},
                componentToolbar:true,
            }
        },
        mounted() {
            this.content = this.value;
        },
        methods: {
            update(event, item) {
                this.content[item] = event.target.innerText;
                this.$emit('input', this.content);
            }
        }
    }
</script>
