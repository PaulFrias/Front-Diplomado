<template>
    <div v-if="!mascotasByClient.length" >
        El cliente no tiene mascotas
    </div>
    <div v-for="mascota in mascotasByClient" :key="mascota.id">
        <a>{{mascota.name}}</a>
    </div>
</template>
<script>

let login = localStorage.getItem("jwt"); 
export default {
    name: 'ModalListPetByClient',
    props: {
        cliente: String
    },
    data() {
      return {
        mascotasByClient: []
      };
    },
  methods: {
    async getPetsByClient() {
        console.log(this.cliente)
      try {
        const respuesta = await fetch("http://localhost:3000/pet/client/"+ this.cliente ,{
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.mascotasByClient = await respuesta.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPetsByClient();
  },
}
</script>
