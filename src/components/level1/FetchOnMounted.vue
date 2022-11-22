<script setup>
// TODO: TDD Exercise: complete the implementation of this component
// to pass all the tests defined in its companion .test.js file

import { ref, onMounted } from 'vue';
const response = ref({});
const showError = ref(false);
const imageIsLoaded = ref(false);

onMounted(async () => {
  let res;
  try{
    res = await fetch('https://yesno.wtf/api');
  } catch(e){
    showError.value = true;
  }
  if (!res?.ok) showError.value = false;
  response.value = await res?.json?.call();
});
</script>

<template>
  <div v-show="showError">Some error occured</div>
  <img :src="response?.image" @load="imageIsLoaded = false" v-show="imageIsLoaded"/>
  <div v-show="!imageIsLoaded">loading</div>
</template>
