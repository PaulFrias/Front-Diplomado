<template>
  <div class="detalleView">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Fluid {{$route.params.id}}</h1>
        <p class="lead">{{breed.description}}.</p>
      </div>
    </div>
  </div>
</template>
<script>
let login = localStorage.getItem("jwt") ;
export default {
    data() {
      return {
        breed: [],
      };
    },
  methods: {
    async getDetalle() {
      try {
        const respuesta = await fetch("http://localhost:3000/breed/6",{
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.breed = await respuesta.json();
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getDetalle();
  }
  }
</script>
<style scoped>
.detalleView{
  background-image: url(../assets/logoTransparente.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
}
</style>

