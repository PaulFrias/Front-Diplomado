<template>
  <div class="mascotasView">
     <div v-if="!mascotas.length" class="alert alert-info" role="alert">
      No se han agregado Mascotas
    </div>
    <div class="container my-5">
      <router-link to="/formCreatePet" class="btn btn-primary">Agregar Mascota</router-link>
    </div>
    <PetCard :mascotas="mascotas"/>
  </div>
</template>

<script>
  var TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkNjY2ZjlkYS0yNjgxLTQ3NDYtYTIyZi0zY2U4ODY2OGY2YjAiLCJpYXQiOjE2NjU1OTI2NDksImV4cCI6MTY2NTY3OTA0OX0.9PlyrD7VPhlF_AsyqByR_M7xXut7VVhlQ9RoYH65rtM"
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
            'Authorization': 'Bearer '+ TOKEN
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
