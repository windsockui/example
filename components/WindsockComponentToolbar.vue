<template>
    <div ref="toolbar" class="absolute z-30 rounded-lg flex bg-black-transparent-85 border-2 border-gray-700">
        <div class="flex items-center pl-3 pr-3 mt-2 mb-2 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="move component up" @click="$emit('componentUp')">
            <fa icon="arrow-up" class="text-md" />
        </div>
        <div class="flex items-center pl-3 pr-3 mt-2 mb-2 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" title="move component down" @click="$emit('componentDown')">
            <fa icon="arrow-down" class="text-md"/>
        </div>
        <div v-for="(item) in buttons" class="flex items-center pl-3 pr-3 mt-2 mb-2 border-r border-gray-500 text-gray-500 hover:text-white cursor-pointer" @click="item.callback" :title="item.tooltip">
            <fa :icon="item.icon" class="text-md"></fa>
        </div>
        <div class="flex items-center pl-3 pr-3 mt-2 mb-2 text-red-700 hover:text-red-500 cursor-pointer" title="remove component" @click="$emit('componentRemove')">
            <fa icon="trash-alt" class="text-md"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WindsockComponentToolbar",
        props: {
            'buttons': {
                type: Array
            },
            'friends' : {
                type: String,
                default: 'The friend'
            }
        }
    }
</script>
