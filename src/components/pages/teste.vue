<template>
    <div class="text-center">
      <v-btn size="x-large" text="Click Me" @click="sheet = !sheet"></v-btn>
      <v-bottom-sheet  v-model="sheet" class="bottom-sheet-right" inset>
        
      </v-bottom-sheet>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sheet: false
      }
    }
  }
  </script>
  
  <style>
    .bottom-sheet-right {
      right: 0;
      left: auto;
      transform: translateX(100%);
    }
  </style>
  