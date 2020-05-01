<template>
    <section class="relative container mx-auto mt-12" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="relative float-right mr-4 mt-4"/>
        <div class="bg-blue-900 rounded-lg shadow-lg p-4 text-white">
            <h2 class="roboto-condensed text-2xl font-thin">Developer Registration</h2>
            <p class="roboto font-thin mt-6 text-gray-400">Please register using the form below. Keep an eye in your inbox for the welcome email.</p>
            <div class="flex flex-row mt-6">
                <!-- @TODO: Add the label tags -->
                <label for="firstname" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">first name</label>
                <div>
                    <input type="text" v-model="person.firstname" id="firstname" ref="firstname" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.firstname=$event.target.value" />
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.firstname !== undefined && person.firstname.length < 1">First name is required</div>
                </div>
                <label for="lastname" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">last name</label>
                <div>
                    <input type="text" v-model="person.lastname" id="lastname" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.lastname=$event.target.value"/>
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.lastname !== undefined && person.lastname.length < 1">Last name is required</div>
                </div>
            </div>
            <div class="flex flex-row mt-6">
                <label for="email" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">e-mail</label>
                <div>
                    <input type="email" v-model="person.email" id="email" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.email=$event.target.value"/>
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.email !== undefined && !validEmail">Valid email address required</div>
                </div>

                <label for="mobile" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">mobile</label>
                <div>
                    <input type="text" v-model="person.mobile" id="mobile" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.mobile=$event.target.value"/>
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.mobile !== undefined && !validMobile">10 digit mobile number required</div>
                </div>
            </div>
            <div class="flex flex-row mt-6">
                <label for="password" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">password</label>
                <div>
                    <input type="password" v-model="person.password" id="password" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.password=$event.target.value"/>
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.password !== undefined && !strongPassword">Strong password required</div>
                </div>

                <label for="confirmPassword" class="flex w-32 justify-end pr-2 font-thin roboto text-gray-400">confirm pass</label>
                <div>
                    <input type="password" v-model="person.confirmPassword" id="confirmPassword" class="inline-block text-gray-900 rounded shadow-inner text-sm p-1 bg-gray-300" @focusout="person.confirmPassword=$event.target.value"/>
                    <div class="absolute text-red-500 text-xs font-thin" v-if="person.password !== undefined && person.password !== person.confirmPassword">Passwords much match</div>
                </div>
            </div>
            <div class="flex flex-row mt-6">
                <div class="flex w-32"></div>
                <div>
                    <input :disabled="!submitEnabled" type="button" value="Register" class="border border-white p-2 rounded-lg cursor-pointer bg-transparent roboto font-thin hover:bg-blue-700 hover:shadow-md" @click="$emit('openModal', {name:'windsock-modal-alert', data:'Registration complete!'})"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ArtemisDevRegWind",
        data() {
            return {
                componentToolbar:true,
                person: {
                    firstname: undefined,
                    lastname: undefined,
                    email: undefined,
                    mobile: undefined,
                    password: undefined,
                    confirmPassword: undefined,

                }
            }
        },
        props: {
            "editing": {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            validEmail: function () {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(this.person.email);
            },
            validMobile: function () {
                const re = /^[- +()]*[0-9][- +()0-9]{8,}$/
                return re.test(this.person.mobile);
            },
            strongPassword: function () {
                const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                return re.test(this.person.password);
            },
            submitEnabled : function () {
                return (this.person.firstname && this.person.firstname.length > 0)
            }
        }
    }
</script>

<style scoped>
    .shadow-inner {
        box-shadow: inset 2px 2px 8px 0 rgba(0, 0, 0, 0.3);
    }
</style>
