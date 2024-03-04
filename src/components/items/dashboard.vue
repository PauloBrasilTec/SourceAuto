<template>
    <v-toolbar class="custom-dash" elevation="20" :height="120">
        <v-container fluid ma-0 pa-0 fill-height >
          <v-card-actions class="flex justify-center">
            <v-img class="ml-left" src="/src/assets/logo.png" max-width="120px"> </v-img>

            <v-col min-width="50px"  cols="3">
                <input-custom v-model="this.search" v-on:change="send_dados_external" label="Digite aqui o que você procura..." type="search" ></input-custom>
            </v-col>

            <v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>

            <v-badge :content="100" :dot="true">
              <v-btn class="hidden-sm-and-down" icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-badge>

            <v-badge  :content="100" :dot="true">
              <v-btn class="hidden-sm-and-down" icon>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>

            <div class="hidden-sm-and-down" >

              <v-menu :close-on-content-click="false" transition="scale-transition" >
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    <v-icon>mdi-account</v-icon>
                            Entrar
                    <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list >
                  <v-list-item v-for="(item, i) in user" :key="i" >
                    <router-link  class="router-link" :to="item.link">
                      <button-custom block size="small" :label="item.title"></button-custom>
                    </router-link>
                    
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu :close-on-content-click="false" transition="scale-transition" >
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    <v-icon>mdi-phone</v-icon>
                      Fale conosco
                    <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list >
                  <v-list-item v-for="(item, i) in FaleConosco" :key="i" >
                    <router-link  class="router-link" :to="item.link">
                      <button-custom :prepend-icon="item.icon" :ripple="false" block disable size="small" :label="item.title"></button-custom>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-actions>
          <v-card-actions class="flex justify-center hidden-sm-and-down">
            <v-menu :close-on-content-click="false" transition="scale-transition" >
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    <v-icon>mdi-menu</v-icon>
                    Menu
                    <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list >
                  <v-list-item v-for="(item, i) in departamentos" :key="i" >
                    <router-link class="router-link" :to="{ name: 'produtos_departamento', params: { id: item.id } }">
                      <button-custom block size="small" :label="item.title"></button-custom>
                    </router-link> 
                  </v-list-item>
                </v-list>
            </v-menu>

            <router-link  class="router-link" to="/lancamentos">
                  <v-btn prepend-icon="mdi-rocket" > Lançamentos </v-btn>
            </router-link>

            <router-link class="router-link" to="/outlet">
                  <v-btn prepend-icon="mdi-ticket" > Outlet </v-btn>
            </router-link>

            <router-link class="router-link" to="/blog">
                  <v-btn prepend-icon="mdi-newspaper-variant-multiple" > Blog </v-btn>
            </router-link>

          </v-card-actions>
        </v-container>
    </v-toolbar>
</template>
<script>
import axios from 'axios';
export default {
    data () {
      return {
        search : '',
        items_search : [{}],
        departamentos : [
          { title: 'Acessórios', id : 'acessorios' },
          { title: 'Faróis', id: 'farois'},
          { title: 'Lanterna', id: 'lanterna'},
          { title: 'Lataria',id : 'lataria'},
          { title: 'Lâmpadas',id : 'lampadas'},
          { title: 'Parachoques',id : 'parachoques'},
          { title: 'Paralamas e Acessórios',id:'paralamas-e-acessorios'},
          { title: 'Retrovisores e Acessórios', id : 'retrovisores-e-acessorios' },
          { title: 'Vidros',id : 'vidros'},
          { title: 'mecanica',id: 'mecanica'},
        ],
        user : [
          { title: 'Entrar',link : '/'},
          { title: 'Minhas compras', link : '/'},
          { title: 'Rastrear compra', link : '/'},
        ],
        FaleConosco : [
          { title: '+55 (47) 3521-8716',link : '/', icon: 'mdi-phone'},
          { title: '+55 (47) 3521-8716', link : '/', icon: 'mdi-whatsapp'},
          { title: '+55 (47) 98885-3163', link : '/', icon: 'mdi-whatsapp'},
        ],
      }
  },methods: {
    send_dados_external() {
      var dados = {pesquisa : this.search}
      this.$emit('send_dados_external', {dados : dados});
    }
  }
}
</script>

<style>
.custom-dash {
  background: linear-gradient(to right, #FF4B2B, #ff8e16) !important;
}

</style>
