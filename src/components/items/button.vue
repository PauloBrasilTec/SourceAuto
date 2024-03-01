<template>

    <v-btn v-if="this.type_button == 'icon'" :icon="this.icon">
    </v-btn>

    <v-btn v-else-if="this.type_button == 'success'" color="#62ff47" :block="this.block">
        {{ this.label }}
    </v-btn>

    <v-btn v-else-if="this.type_button == 'cancel'" color="#ff5547" :block="this.block">
        {{ this.label }}
    </v-btn>

    <v-btn v-else-if="this.type_button == 'edit'" color="#daff47" :block="this.block">
        {{ this.label }}
    </v-btn>

    <v-btn  v-else-if="this.type_button == 'search'"  prepend-icon="mdi-magnify" type="submit"  :color="this.color" :block="this.block">
        {{ this.label }}
    </v-btn>

    <v-btn v-else-if="this.type_button == 'submit'"  type="submit"  :color="this.color" :block="this.block" :loading="this.loading"  >
        {{ this.label }}
    </v-btn>

    <v-btn v-else :color="this.color" :block="this.block" >{{ this.label }}
    </v-btn>

</template>
<script>
export default {
    props: {
        label : String,
        action_type : String,
        type_button : String,
        color : String,
        icon : String,
        loading : String,
        block: Boolean
    },
    data() {
        return {
            
        };
    },
    methods: {
    }
}
</script>