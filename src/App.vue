<template>
  <div id="app">
    <BarnavHome/>
    <router-view/>
    <FooterPets/>
  </div>
</template>

<script>
  import BarnavHome from '@/components/BarnavHome.vue'
  import FooterPets from '@/components/FooterPets.vue'
  
  export default {
    name: 'app',
    components: {
      BarnavHome,
      FooterPets
    },
  }
</script>


<style>
</style>
