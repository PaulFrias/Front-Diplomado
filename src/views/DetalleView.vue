<template>
  <div class="detalleView">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4"> {{breed.name}}</h1>
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
    props:{
    },
  methods: {
    async getDetalle() {
      try {
        const respuesta = await fetch("http://localhost:3000/breed/id/" + this.$route.params.id,{
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
  min-height: 755px;
}
</style>

