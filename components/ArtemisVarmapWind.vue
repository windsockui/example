<template>
    <section class="relative container mx-auto mt-12" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="relative float-right mr-4 mt-4"/>
        <div class="bg-blue-900 rounded-lg shadow-lg p-4 text-white">
            <h2 class="roboto-condensed text-2xl font-thin">Mapping FHIR variables to custom app variables</h2>
            <p class="roboto font-thin mt-6 text-gray-400">Please register using the form below. Keep an eye in your inbox for the welcome email.</p>

            <div class="flex flex-row mt-4">
                <div class="flex w-32 pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">Selection</div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">FHIR variable</div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">Your variable</div>
            </div>
            <div class="flex flex-row mt-2">
                <div class="flex w-32 pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex w-64 pr-2 h-10 items-center bg-blue-800">
                    <select v-model="category" class="text-gray-900 bg-gray-300 rounded text-sm p-1 ml-2">
                        <option value="personal">Patient Information</option>
                        <option value="observations">Patient Observations</option>
                        <option value="facilities">Facilities</option>
                    </select>
                </div>
                <div class="flex roboto pl-3 w-64 items-center font-thin text-gray-400 bg-blue-800"><div class="">( <fa icon="times"/> to remove )</div></div>
                <div class="flex roboto pl-3 w-64 items-center font-thin text-gray-400 bg-blue-800"><div>( with default suggestions )</div></div>
            </div>
            <div class="flex flex-row mt-2">
                <div class="flex w-32  pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex flex-col w-64 pr-4">
                    <div  v-for="(variable, index) in variables[category]" @click="select(variable)" class="flex h-8 bg-blue-800 items-center overflow-hidden border border-white mb-2 p-1 rounded-lg hover:cursor-pointer bg-transparent roboto text-sm font-thin hover:bg-blue-700 cursor-pointer">
                        <div class="pl-2 flex-grow items-center" :title="variable.long">{{variable.short}}</div>
                        <div class="pl-3 pr-2 border-l border-white"><fa icon="angle-right"></fa></div>
                    </div>
                </div>
                <div class="flex flex-col w-64 pr-4">
                    <div v-for="(variable, index) in selected" @click="remove(index)" class="flex h-8 bg-green-800 items-center overflow-hidden border border-white mb-2 p-1 rounded-lg hover:cursor-pointer bg-transparent roboto text-sm font-thin hover:bg-blue-700 cursor-pointer">
                        <div class="pl-2 flex-grow items-center" :title="variable.long">{{variable.short}}</div>
                        <div class="pl-3 pr-2 border-l border-white"><fa icon="times"></fa></div>
                    </div>
                </div>
                <div class="flex flex-col w-64 pr-2">
                    <div class="" v-for="(variable, index) in selected">
                        <input :value="variable.var" @change="updateVariable(index, $event)" @focusout="updateVariable(index, $event)" type="text" class="flex h-8 bg-gray-400 items-center overflow-hidden border border-white mb-2 pl-2 rounded-lg hover:cursor-pointer bg-transparent text-black roboto text-sm font-thin flex-grow items-center">
                    </div>
                </div>
            </div>
            <pre class="ml-32 mt-12 mb-12 mr-32 shadow-inner bg-gray-400 text-gray-700 p-4 rounded-lg">
{{result}}
            </pre>
        </div>

    </section>
</template>

<script>
    export default {
        name: "ArtemisVarmapWind",
        props: {
            "editing": {
                type: Boolean,
                default: false,
            }
        },
        data: () => ({
            category: 'personal',
            componentToolbar: false,
            selected: [],
            result: {},
            variables: {
                "personal": [
                    {key:'date-of-birth',       short:'Date of birth',                  long:'The date the patient was born (yyyy-mm-dd)'},
                    {key:'email-address',       short:'Email',                          long:'Patient email address'},
                    {key:'msisdn',              short:'Mobile no',                      long:'MSISDN (+ followed by country code, no leading zero, followed by mobile number'},
                    {key:'given-name',          short:'First name',                     long:'Birth name (as it appears in their South African id)'},
                    {key:'family-name',         short:'Family name',                    long:'Surname (as it appears in their South African id)'},
                    {key:'address-unit-number', short:'Patient address, unit',          long:'Address unit number (for apartments and complexes)'},
                    {key:'address-building',    short:'Patient address, building',      long:'Address building name  (for apartments and complexes only)'},
                    {key:'address-street',      short:'Patient address, street',        long:'Street number and name'},
                    {key:'address-district',    short:'Patient address, suburb',        long:'Suburb or district name'},
                    {key:'address-town',        short:'Patient address, town or city',  long:'Town or city or closest metropolitan area'},
                    {key:'address-postal-code', short:'Patient address, postal code',   long:'Four digit postal code'},
                    {key:'address-region',      short:'Patient address, province',      long:'Province in South Africa'}
                ],
                "observations": [
                    {key:'respiration-rate',    short:'Respiration rate', long:'Breathing rate (in full in-and-out breaths per minute'},
                    {key:'blood-pressure-systolic', short:'Patient blood pressure (systolic)', long:'Lower figure (measured in inches of mercury)'},
                    {key:'blood-pressure-diastolic', short:'Patient blood pressure (diastolic)', long:'Higher figure (measured in inches of mercury)'},
                    {key:'heart-rate', short:'Heart rate', long:'Patient heart rate (beats per minute - bpm)'},
                    {key:'body-weight', short:'Weight', long:'Patient weight Kilograms'},
                    {key:'body-height', short:'Height', long:'Centimeters'},
                    {key:'body-bmi', short:'Body mass index (BMI)', long:'Patient weight (kg) multiplied by the square of their height (m)'},
                ],
                "facilities": [
                    {key:'facility-name',       short:'First name',                      long:'Birth name (as it appears in their South African id)'},
                    {key:'address-unit-number', short:'Facility address, unit',          long:'Address unit number (for apartments and complexes)'},
                    {key:'address-building',    short:'Facility address, building',      long:'Address building name  (for apartments and complexes only)'},
                    {key:'address-street',      short:'Facility address, street',        long:'Street number and name'},
                    {key:'address-district',    short:'Facility address, suburb',        long:'Suburb or district name'},
                    {key:'address-town',        short:'Facility address, town or city',  long:'Town or city or closest metropolitan area'},
                    {key:'address-postal-code', short:'Facility address, postal code',   long:'Four digit postal code'},
                    {key:'address-region',      short:'Facility address, province',      long:'Province in South Africa'}
                ]
            }
        }),
        methods: {
            select(item) {
                item.category = this.category;
                item.var = item.key;
                this.selected.push(item);
            },
            remove (index) {
                this.selected.splice(index, 1);
            },
            updateVariable(index, event) {
                this.selected[index].var = event.target.value;
                this.recalculateResults();
            },
            recalculateResults() {
                let array = [];
                for (let i = 0; i < this.selected.length; i++) {
                    let item = {};
                    item.fhir = 'fihr.resource.' + this.selected[i].category + '.' + this.selected[i].key;
                    item.varible = this.selected[i].var;
                    array.push(item);
                }
                this.result = array;
            }
        },
        watch: {
            'selected': {
                deep: true,
                handler: function() {
                    this.recalculateResults();
                }
            }
        }
    }
</script>
<style scoped>
    .shadow-inner {
        box-shadow: inset 2px 2px 8px 0 rgba(0, 0, 0, 0.3);
    }
</style>

