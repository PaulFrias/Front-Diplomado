<template>
  <div class="mascotasView">
    <div v-if="!mascotas.length" class="alert alert-info" role="alert">
      No se han agregado Mascotas
    </div>
    <div class="container my-5">
      <router-link to="/formCreatePet" class="btn btn-primary">➕  Agregar Mascota</router-link>
    </div>
    <PetCard :mascotas="mascotas"/>
  </div>
</template>

<script>
  let login = localStorage.getItem("jwt") ;
import PetCard from '@/components/PetCard.vue'
export default {
    name: 'app',
    data() {
      return {
        mascotas: [],
      };
    },
  methods: {
    async getMascotas() {
      try {
        const respuesta = await fetch("http://localhost:3000/pet", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.mascotas = await respuesta.json();
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getMascotas();
  },
  components: {
    PetCard
  }
  }
</script>
<style scoped>
.mascotasView{
  background-image: url(../assets/logoTransparente.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
}
</style>
