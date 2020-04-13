<template>
    <div class="relative z-10 h-64 md:h-96 lg:h-128 w-full bg-black">
        <div class="absolute z-20 bottom-0 mb-12 md:mb-20 lg:mb-32 ml-8 md:ml-20 text-white">
            <h1 class="text-2xl md:text-4xl font-light roboto-condensed editable" :class="{'editing':editing}" :contenteditable="editing">{{content.title}}</h1>
            <p class="text-lg md:text-2xl roboto mt-1 md:mt-2 font-thin editable" :class="{'editing':editing}" :contenteditable="editing">{{content.subtitle}}</p>
        </div>
        <img :src="content.imageUrl" class="w-full h-full object-cover absolute left-0 top-0 darken object-top" alt="Sterile Insect Release Hopper"/>
    </div>
</template>

<script>
    export default {
        name: "HeroWind",
        props: {
            "editing" : {
                type: Boolean,
                default: false,
            },
            "content": {
                default: {
                    imageUrl: "https://i1.wp.com/www.freetworoam.com/wp-content/uploads/2019/04/IMG_6315-1.jpg?fit=1200%2C899&ssl=1",
                    title: "Lorem ipsum dolor sit amet",
                    subtitle: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
                }
            }
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>
