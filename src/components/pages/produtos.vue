<template >
<!-- input que dispara a busca quando muda o valor -->
<input-custom disabled style="display: none;" v-model="this.dados_external.pesquisa" :onchange="find_produto()" label="Digite aqui o que você procura..." type="search" ></input-custom>
  <v-card>
    <datagrid-custom-produtos :loading="this.loading" :items="produtos" width="100%"></datagrid-custom-produtos>
  </v-card>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import utils from '../items/utils.vue';

export default {
  props: {
    dados_external: {type: Object,default: () => {}},
  },
  setup() {
  },
  data() {
    return {
      route : useRoute(),
      produtos: [],
      loading: false,
      productId : null,
    }
  },
  methods: {
    async find_produto(){
      this.loading = true
      var url = 'https://flexi.dev:8890/teste_source_api.php'
      var dados = {}

      if(!utils.methods.is_null(this.dados_external.pesquisa)){
        dados = Object.assign(dados, { pesquisa: this.dados_external.pesquisa });
      }

      if(this.route.path !== '/'){
        dados = Object.assign(dados, {tags : this.route.path});
      }
      
      const res = await utils.methods.send_request('POST',url,dados,'find_produtos');
      if(res.status == '1'){
          this.produtos = res.dados
      }else{
        this.produtos = []
      }
      this.loading = false
    }
  }
}
</script>