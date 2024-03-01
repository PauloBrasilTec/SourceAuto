<template>
    
    <v-autocomplete v-if="this.type == 'autocomplete'"
       :label="this.label"
       :v-model="this.value"
       :readonly="this.readonly"
       :items="this.options"
       :multiple="this.multiple"
       :rules="[rules.all].concat(this.rules_adicionais)"
       clearable
       chips
       variant="solo-filled"
       no-data-text="Nenhum item encontrado !"
       density="compact"
    ></v-autocomplete>

    <v-file-input v-else-if="this.type == 'fileinput'"
        :label="this.label"
        :v-model="this.value"
        :disabled = "this.readonly"
        :multiple="this.multiple"
        :rules="[isrequired()].concat(this.rules_adicionais)"
        show-size
        :counter="this.counter"
        variant="solo-filled"
        density="compact"
    ></v-file-input>

    <v-text-field v-else-if="this.type == 'search'"
        :label="this.label"
        :v-model="this.value"
        :loading="this.loading"
        variant="solo-filled"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        :maxlength="this.max_length"
        :counter="this.counter"
        density="compact"
    ></v-text-field>

    <v-text-field  v-else
        :label="this.label" 
        :v-model="this.value"
        :disabled = "this.readonly"
        :rules="[rules.all]"
        :counter="this.counter"
        density="compact"
        variant="solo-filled">
    </v-text-field>

</template>
<script>

import utils from '../items/utils.vue';
export default {
    props: {
        type: String,
        label: String,
        required: Boolean,
        readonly: Boolean,
        max_length: String,
        options: Array,
        multiple: Boolean,
        rules_adicionais : Object,
        loading : Boolean,
        counter : String,
    },
    data() {
        return {
            value: '',
            rules: {
                all: v => {
                    if(!utils.methods.is_null(this.required) && this.required == "true" ){
                        return !!v || "Preencha o campo acima !";
                    }
                    if(!utils.methods.is_null(this.counter)){
                        return  v?.length <= this.counter || 'Numero de caracteres excedido !';
                    }
                    return true;
                }
            },
            defaults: {
                global: {
                elevation: 10,
                }
            },


            
        };
    }
}
</script>