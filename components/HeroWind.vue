<template>
    <div class="relative z-10 h-64 md:h-96 lg:h-128 w-full bg-black" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar" :buttons="[{icon:'camera', tooltip:'switch image', callback:askImageUrl}]" clazz="mt-4 ml-4" v-on="$listeners"/>
        <div class="absolute z-20 bottom-0 mb-12 md:mb-20 lg:mb-32 ml-8 md:ml-20 text-white">
            <h1 class="text-2xl md:text-4xl font-light roboto-condensed editable" :class="{'editing':editing}" :contenteditable="editing" @blur="update($event, 'title')" v-text="content.title"></h1>
            <p class="text-lg md:text-2xl roboto mt-1 md:mt-2 font-thin editable" :class="{'editing':editing}" :contenteditable="editing" @blur="update($event, 'subtitle')" v-text="content.subtitle"></p>
        </div>
        <img :src="content.imageUrl" class="w-full h-full object-cover absolute left-0 top-0 darken object-top" alt="Sterile Insect Release Hopper"/>
    </div>
</template>

<script>

    import WindsockComponentToolbar from "./WindsockComponentToolbar";
    export default {
        name: "HeroWind",
        components: {WindsockComponentToolbar},
        data() {
            return {
                content: {},
                editHover: false,
                componentToolbar: false
            }
        },
        props: {
            "editing" : {
                type: Boolean,
                default: false,
            },
            "value": {
                default: () => {
                    return {
                        imageUrl: "https://i1.wp.com/www.freetworoam.com/wp-content/uploads/2019/04/IMG_6315-1.jpg?fit=1200%2C899&ssl=1",
                        title: "Lorem ipsum dolor sit amet",
                        subtitle: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
                    }
                }
            }
        },
        mounted() {
            this.content = this.value;
        },
        methods: {
            update(event, item) {
                this.content[item] = event.target.innerText;
                this.$emit('input', this.content);
            },
            askImageUrl() {
                this.$emit('openModal', {name:'windsock-modal-url', callback:this.imageUrlSet});
            },
            imageUrlSet(answer) {
                if (answer.status === 'ok')
                    this.content.imageUrl = answer.data.url;
            }
        }
    }
</script>

<style scoped>

</style>
