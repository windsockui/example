<template>
    <section class="container mx-auto text-gray-500 roboto font-thin text-lg mt-8 lg:mt-16 leading-relaxed">
        <h1 class="text-4xl roboto-condensed text-gray-400 mb-3 editable" :class="{'editing':editing}" :contenteditable="editing">Reconsider the way you view your CMS</h1>
        <p class="editable" :class="{'editable':editing}" :contenteditable="editing">
        Content management should be simple, yet it has become an massively ugly thing to try and get your head around.
        tailwindui changes this all for you. Suddenly you can now add editable content areas to your web site that
        follow the style and direction you want it to.
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
            }
        },
    }
</script>

<style scoped>

</style>
