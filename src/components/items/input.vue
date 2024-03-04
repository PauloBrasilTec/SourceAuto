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


    <div class="flex justify-start" v-else-if="this.type == 'password'">
        <v-text-field class="grid justify-items-end ..."
            :label="this.label" 
            :type="show1 ? 'text' : 'password'"
            v-model="this.value"
            :disabled="this.readonly"
            :rules="[rules.all]"
            :counter="this.counter"
            density="compact"
            variant="solo-filled"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
        >
    </v-text-field>
        
    </div>

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
            show1: false,
            rules: {
                all: v => {

                    var errors = [];
                    var result =  true;

                    if(!utils.methods.is_null(this.required) && this.required == "true" ){
                        if(! !!v){
                            errors.push("Preencha o campo acima !");
                        }
                    }

                    if(!utils.methods.is_null(this.counter)){
                        if(!v?.length <= this.counter){
                            errors.push('Numero de caracteres excedido !')
                        }
                    }

                    if(!utils.methods.is_null(this.type)  && this.type == "email" ){
                        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                        if(!regex.test(v)){
                            errors.push('Email inválido !')
                        }
                    }

                    return errors.length > 0 ? errors[0] : true

                }
            },
            defaults: {
                global: {
                elevation: 10,
                }
            },
        };
    },methods: {
  }
}
</script>