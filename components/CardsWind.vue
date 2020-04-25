<template>
    <div class="relative">
        <div class="container mx-auto" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
            <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="mt-4 ml-4"/>
            <div class="flex flex-col lg:flex-row flex-auto items-center mt-16 lg:mt-20 justify-between">
                <card-wind v-for="(item, index) in content" :key="index" :value="item" @input="(itemContent) => $set(content, index, itemContent)" :editing="editing" class="w-full lg:w-3/10 mb-10"  @openModal="(data) => $emit('openModal', data)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import CardWind from "./CardWind";
    import WindsockComponentToolbar from "./WindsockComponentToolbar";
    export default {
        name: "CardsWind",
        components: {WindsockComponentToolbar, CardWind},
        props: {'value': {
                type: Array,
                default: () => [
                    {
                        imageUrl: 'https://i.imgur.com/ktfSmsw.jpg',
                        heading: 'Lorem ipsum dolor sit amet',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        tags: ['#ChangeThese', '#MakeItYourOwn']
                    },{
                        imageUrl: 'https://i.imgur.com/yRZr1v3.jpg',
                        heading: 'Sed ut perspiciatis unde',
                        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                        tags: ['#YourContent', '#YourTags', '#GreatCards']
                    },{
                        imageUrl: 'https://i.imgur.com/8kNXt3t.jpg',
                        heading: 'At vero eos et accusamus',
                        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
                        tags: ['#YouAreInControl']
                    }
                ]
            },
            'editing': {
                default: false
            }
        },
        data: () => ({
            componentToolbar: false,
            content: []
        }),
        mounted() {
            this.content = this.value;
        },
        watch: {
            'content': {
                'deep':true,
                handler() {
                    this.$emit('input', this.content);
                }
            }
        }
    }
</script>

<style scoped>

</style>
