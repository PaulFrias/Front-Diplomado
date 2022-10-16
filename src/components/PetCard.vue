<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4" v-for="mascota in mascotas" :key="mascota.id">
        <div class="card" v-if="mascota.ClientId == null">
            <img :src='mascota.image' class="img-fluid" :alt="mascota.name">
          <div class="card-body"  >
            <h5 class="card-title">Nombre: {{ mascota.name }}</h5>
            <div v-for="breed in breeds" :key="breed.id">
              <b class="card-text"  v-if="mascota.BreedId === breed.id">Raza: {{ breed.name }}</b>
            </div>
            <p class="card-text">{{ mascota.description }}</p>
            <div class="row">
              <div class="col">
                <router-link :to="'/detalle/'+mascota.BreedId" class="btn btn-primary">🔍 Detalle</router-link>
              </div>
              <div class="col">
                <ModalEditPet :mascota="mascota" :types="types" />
              </div>
              <div class="col">       
                <ModalAdoptPet :mascota="mascota"/>
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
import ModalEditPet from '@/components/ModalEditPet.vue'
import ModalAdoptPet from '@/components/ModalAdoptPet.vue'
export default {
  name: 'PetCard',
  props: {
    mascotas: Array,
    types: Array,
    breeds: Array
  },
  data() {
    return {
      editando: null,
    };
  },
  components: {
    ModalEditPet,
    ModalAdoptPet
  }
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
