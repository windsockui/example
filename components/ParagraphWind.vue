<template>
    <section class="container mx-auto text-gray-500 roboto font-thin text-lg mt-8 lg:mt-16 leading-relaxed">
        <h1 class="text-4xl roboto-condensed text-gray-400 mb-3 editable" :class="{'editing':editing}" :contenteditable="editing" :v-if="content.heading">{{content.heading}}</h1>
        <p class="editable" :class="{'editing':editing}" :contenteditable="editing" :v-if="content.text">
            {{content.text}}
        </p>
    </section>
</template>

<script>
    export default {
        name: "ParagraphWind",
        props: {
            "editing" : {
                type: Boolean,
                default: false,
            },
            "content": {
                default: {
                    heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                }
            }
        },
    }
</script>

<style scoped>

</style>
