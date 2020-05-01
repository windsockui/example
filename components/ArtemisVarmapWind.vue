<template>
    <section class="relative container mx-auto mt-12" @mouseover="componentToolbar=true" @mouseleave="componentToolbar=false">
        <slot v-if="componentToolbar && editing" v-on="$listeners" clazz="relative float-right mr-4 mt-4"/>
        <div class="bg-blue-900 rounded-lg shadow-lg p-4 text-white">
            <h2 class="roboto-condensed text-2xl font-thin">Mapping FHIR variables to custom app variables</h2>
            <p class="roboto font-thin mt-6 text-gray-400">Please register using the form below. Keep an eye in your inbox for the welcome email.</p>
            <div class="flex flex-row mt-6">
                <div class="flex w-32 pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex w-96 pr-2 h-10 items-center bg-blue-800 ">
                    <select v-model="category" @change="subcategory=''" class="text-gray-900 bg-gray-300 rounded text-sm text-thin p-1 ml-2 w-64">
                        <option disabled value="">Select category</option>
                        <option v-for="(category, index) in variables" :key="index">{{index}}</option>
                    </select>
                    <div class="flex flex-grow justify-center">
                        <fa icon="chevron-right" class=""/>
                    </div>
                </div>
                <div class="flex w-96 pr-2 h-10 items-center bg-blue-800">
                    <select v-model="subcategory" class="text-gray-900 bg-gray-300 rounded text-sm p-1 ml-2 w-64">
                        <option disabled value="">Select subcategory</option>
                        <option v-for="(category, index) in variables[category]" :key="index">{{index}}</option>
                    </select>
                    <div class="flex flex-grow justify-center">
                        <fa icon="chevron-right" class=""/>
                    </div>
                </div>
                <div class="flex roboto pl-3 w-64 items-center font-thin text-gray-400 bg-blue-800"><div>Then select variables below</div></div>
            </div>
            <div class="flex flex-row mt-4">
                <div class="flex w-32 pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">Available</div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">Selected</div>
                <div class="flex w-64 pr-2 pl-3 font-thin text-xl roboto text-gray-400">Your name</div>
            </div>
            <div class="flex flex-row mt-2">
                <div class="flex w-32  pr-2 font-thin roboto text-gray-400"></div>
                <div class="flex flex-col w-64 pr-4">
                    <template v-if="variables && variables[category] && variables[category][subcategory]">
                        <div  v-for="(variable, index) in variables[category][subcategory]" @click="select(variable)" class="flex h-8 bg-blue-800 items-center overflow-hidden border border-white mb-2 p-1 rounded-lg hover:cursor-pointer bg-transparent roboto text-sm font-thin hover:bg-blue-700 cursor-pointer">
                            <div class="pl-2 flex-grow items-center" :title="variable.long">{{variable.short}}</div>
                            <div class="pl-3 pr-2 border-l border-white"><fa icon="angle-right"></fa></div>
                        </div>
                    </template>
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
            category: '',
            subcategory: '',
            componentToolbar: false,
            selected: [],
            result: {},
            variables: {
                "Biomedical Research and Regulation": {
                    "MedicinalProduct": [
                        {"key":"masterFile",    "short":"masterFile",        "long":"A master file for to the medicinal product (e.g. Pharmacovigilance System Master File)"},
                        {"key":"paediatricUseIndicator",    "short":"paediatricUseIndicator",        "long":"If authorised for use in children"},
                        {"key":"clinicalTrial",    "short":"clinicalTrial",        "long":"Clinical trials or studies that this product is involved in"},
                        {"key":"intendedUse",    "short":"intendedUse",        "long":"The intended use of the product, e.g. prevention, treatment"}
                    ],
                    "MedicinalProductContraindication":[
                        {"key":"subject",    "short":"subject",        "long":"The medication for which this is an indication"},
                        {"key":"diseaseStatus",    "short":"diseaseStatus",        "long":"The status of the disease or symptom for the contraindication"},
                        {"key":"therapeuticIndication",    "short":"therapeuticIndication",        "long":"Information about the use of the medicinal product in relation to other therapies as part of the indication"}
                    ],
                    "MedicinalProductIndication":[
                        {"key":"diseaseSymptomProcedure",    "short":"diseaseSymptomProcedure",        "long":"The disease, symptom or procedure that is the indication for treatment"},
                        {"key":"intendedEffect",    "short":"intendedEffect",        "long":"The intended effect, aim or strategy to be achieved by the indication"},
                        {"key":"otherTherapy",    "short":"otherTherapy",        "long":"Information about the use of the medicinal product in relation to other therapies described as part of the indication"}
                    ]
                },
                "Community Based Collaborative Care": {
                    "Consent":[
                        {"key":"patient",    "short":"patient",        "long":"Who the consent applies to"},
                        {"key":"policy",    "short":"policy",        "long":"Policies covered by this consent"},
                        {"key":"dataPeriod",    "short":"dataPeriod",        "long":"Timeframe for data controlled by this rule"}
                    ]
                },
                "Clinical Decision Support": {
                    "ActivityDefinition":[
                        {"key":"lastReviewDate",    "short":"lastReviewDate",        "long":"When the activity definition was last reviewed"},
                        {"key":"observationResultRequirement",    "short":"observationResultRequirement",        "long":"What observations must be produced by this action"},
                        {"key":"dynamicValue",    "short":"dynamicValue",        "long":"Dynamic aspects of the definition"}
                    ],
                    "DetectedIssue":[
                        {"key":"identifier",    "short":"identifier",        "long":"Unique id for the detected issue"},
                        {"key":"implicated",    "short":"implicated",        "long":"Problem resource"},
                        {"key":"mitigation",    "short":"mitigation",        "long":"Step taken to address"}
                    ],
                    "EffectEvidenceSynthesis":[
                        {"key":"effectivePeriod",    "short":"effectivePeriod",        "long":"When the effect evidence synthesis is expected to be used"},
                        {"key":"resultsByExposure",    "short":"resultsByExposure",        "long":"What was the result per exposure?"},
                        {"key":"certaintySubcomponent",    "short":"certaintySubcomponent",        "long":"A component that contributes to the overall certainty"}
                    ]
                },
                "Clinical Genomics": {
                    "MolecularSequence":[
                        {"key":"specimen",    "short":"specimen",        "long":"Specimen used for sequencing"},
                        {"key":"genomeBuild",    "short":"genomeBuild",        "long":"The Genome Build used for reference, following GRCh build versions e.g. 'GRCh 37'"},
                        {"key":"variantPointer",    "short":"variantPointer",        "long":"Pointer to observed variant information"}
                    ]
                },
                "Clinical Quality Information": {
                    "Measure":[
                        {"key":"experimental",    "short":"experimental",        "long":"For testing purposes, not real usage"},
                        {"key":"clinicalRecommendationStatement",    "short":"clinicalRecommendationStatement",        "long":"Summary of clinical guidelines"},
                        {"key":"experimental",    "short":"experimental",        "long":"For testing purposes, not real usage"}
                    ],
                    "MeasureReport":[
                        {"key":"measureScore",    "short":"measureScore",        "long":"For subject-list reports, the subject results in this population"},
                        {"key":"component",    "short":"component",        "long":"Stratifier component values"},
                        {"key":"evaluatedResource",    "short":"evaluatedResource",        "long":"What data was used to calculate the measure score"}
                    ]
                }
            }
        }),
        methods: {
            prepareText(text) {
                return text.toLowerCase().replace(/\ /g, '-');
            },
            select(item) {
                item.category = this.category;
                item.subcategory = this.subcategory;
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
                    item.fhir = 'fihr.resource.' + this.prepareText(this.selected[i].category) + '.' + this.prepareText(this.selected[i].subcategory) + '.' + this.selected[i].key;
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

