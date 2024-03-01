<template>
  <v-card :loading="this.loading">
    <v-data-iterator :items="this.items" :items-per-page="itemsPerPage" :search="search">
      <template v-slot:header="{ items, page, pageCount, prevPage, nextPage }">
        <v-toolbar class="px-2">
          <v-row>
            
            <v-col class="float-left" cols="2" >
              <v-text-field :disabled="this.items.length === 1" v-model="search" clearable density="comfortable" hide-details placeholder="Search"
                prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo"></v-text-field>
            </v-col>

            <v-col class="float-left" cols="0" ></v-col>

            <v-col class="float-left" cols="1" >
              <v-menu :close-on-content-click="false" transition="scale-transition" >
              <template v-slot:activator="{ props }">
                <v-btn size="large" v-bind="props">
                  <v-icon>mdi-filter</v-icon>
                  Filtros
                </v-btn>
              </template>
              <v-list max-width="170px" width="150%" >
                <v-list-item v-for="(item, i) in filter" :key="i" >
                  <input-custom :label=item.title type="autocomplete"></input-custom>
                </v-list-item>
              </v-list>
              </v-menu>
            </v-col>


            <v-col class="float-left" cols="1" >
              <v-btn @click="reload()" icon="mdi-reload"></v-btn>
            </v-col>

            <v-col class="float-left" cols="1" >
              <v-autocomplete :disabled="this.items.length <= 12" density="comfortable" hide-details label=""  :items="['12', '30', '60', '70', '80', '90', '100']"
                v-model="itemsPerPage"></v-autocomplete>
            </v-col>
            
            <v-col  class="float-left" cols="1" >
              <v-btn :disabled="page === 1" icon="mdi-arrow-left" size="small" variant="tonal" class="me-2"
                @click="prevPage"></v-btn>
              <v-btn :disabled="page === pageCount" icon="mdi-arrow-right" size="small" variant="tonal"
                @click="nextPage"></v-btn>
            </v-col>


          </v-row>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items, page, pageCount, prevPage, nextPage }">
        <v-row style="padding: 1%;" v-if="items.length > 0 && loading== false">
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="2">


            <v-card elevation="24" color="#fec6cf" link hover max-height="500px" max-width="300px">
              <v-sheet border>
                <v-btn  variant="plain" style="margin: 1%;" icon="mdi-cart-plus"></v-btn>
                <v-btn variant="plain" color="red" style="margin: 1%;" icon="mdi-heart"></v-btn>
                <v-img width="300" height="300" Object-fit="cover" on-load="" v-if="item.raw.src != undefined " :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                :src="item.raw.src"></v-img>
                <v-img  v-else width="300" height="300" :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                src="/src/assets/produto-nao-encontrado.png"></v-img>
                <v-list-item :title="item.raw.nome" lines="two" density="comfortable">
                  <template v-slot:title>
                    <strong class="text-h7">
                      {{ item.raw.nome }}
                    </strong>
                  </template>
                </v-list-item>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <v-card-actions v-if="items.length == 0 && loading== false" class="flex-initial justify-center">
          <h3>Nenhum item encontrado !</h3>
        </v-card-actions>
        <div class="d-flex align-center justify-end pa-4">
          <v-btn :ripple="false" class="ml-5" > Total : {{ this.items.length }} </v-btn>
          <v-btn :ripple="false" class="ml-5"> Page {{ page }} of {{ pageCount }} </v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
export default {
  props: {
    items: Array,
    loading: Boolean
  },
  data: () => ({
    search: '',
    itemsPerPage: 12,
    filter: [
        { title: 'Marca' },
        { title: 'Modelo' },
        { title: 'Ano' },
        { title: 'Categoria' },
        ],
  }),methods: {
     reload(){
      this.$emit('reload_datagrid',{});
    }
  }
}
</script>