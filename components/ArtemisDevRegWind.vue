<template>
    <section class="container mx-auto">
        <div class="bg-blue-900 rounded-lg shadow-lg p-4 text-white">
            <h2 class="roboto-condensed text-2xl font-thin">Developer Registration</h2>
            <p class="roboto font-thin mt-6 text-gray-400">Please register using the form below. Keep an eye in your inbox for the welcome email.</p>
            <div class="flex flex-row mt-6">
                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">first name</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>

                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">last name</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>
            </div>
            <div class="flex flex-row mt-6">
                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">e-mail</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>

                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">mobile</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>
            </div>
            <div class="flex flex-row mt-6">
                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">password</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>

                <div class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">confirm pass</div>
                <div><input class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300"/></div>
            </div>
            <div class="flex flex-row mt-6">
                <div class="flex w-32"></div>
                <div>
                    <input type="button" value="Register" class="border border-white p-2 rounded-lg cursor-pointer bg-transparent roboto font-thin hover:bg-blue-700 hover:shadow-md"/>
                </div>
            </div>
        </div>


    </section>
</template>

<script>
    export default {
        name: "ArtemisDevRegWind"
    }
</script>

<style scoped>
    .shadow-inner {
        box-shadow: inset 2px 2px 8px 0 rgba(0, 0, 0, 0.3);
    }
</style>
