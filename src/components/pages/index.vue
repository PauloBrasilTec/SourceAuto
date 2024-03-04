<template>
  <div>
    <dash-board class="dash-board"  @send_dados_external="receiveDataDash"></dash-board>
    <div style="padding-top: 140px;"> <!-- Adjust the padding-top value to match the height of your dash-board -->
      <router-view :dados_external="this.dados_external"></router-view>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        search : '',
        dados_external : [{}],
      }
  },methods: {
    receiveDataDash(data) {
      if(data !== undefined){
        this.dados_external = data.dados;
      }
    }
  }
}
</script>

<style scoped>

.dash-board {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

</style>