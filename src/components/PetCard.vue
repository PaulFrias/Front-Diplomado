<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4" v-for="mascota in mascotas" :key="mascota.id">
        <div class="card">
            <img :src='mascota.image' class="img-fluid" :alt="mascota.name">
          <div class="card-body"  >
            <h5 class="card-title">{{ mascota.name }}</h5>
            <b class="card-text">{{ mascota.BreedId }}</b>
            <p class="card-text">{{ mascota.description }}</p>
            <div class="row">
              <div class="col">
                <router-link :to="'/detalle/'+mascota.BreedId" class="btn btn-primary">Detalle</router-link>
              </div>
              <div class="col">
              </div>
              <div class="col">
                <router-link :to="'/adopcion/'+mascota.id" class="btn btn-primary">Adoptar</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="container my-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetCard',
  props: {
    mascotas: Array,
  },
  data() {
    return {
      editando: null,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  height: 90%;
}
img{
  height: 70%;
}
</style>
