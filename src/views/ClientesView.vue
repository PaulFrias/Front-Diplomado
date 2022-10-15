<template>
  <div class="clientesView">
    <div v-if="!clientes.length" class="alert alert-info" role="alert">
      No se han agregado clientes
    </div>
    <div class="container my-5">
      <ModalCreateClient/>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th> 
            <th>Documento</th>     
            <th>Celular</th>        
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td >
              {{ cliente.name }}
            </td> 
            <td >
              {{ cliente.documentType }}: {{ cliente.documentId }} 
            </td> 
            <td>
              {{ cliente.phone }}
            </td>         
            <td >
              <ModalDetailClient :cliente="cliente"/>
              <ModalEditClient :cliente="cliente"/>
              <button
                class="btn btn-danger ml-2"
                @click="$emit('delete-cliente', cliente.id)"
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import ModalDetailClient from '@/components/ModalDetailClient.vue'
import ModalEditClient from '@/components/ModalEditClient.vue'
import ModalCreateClient from '@/components/ModalCreateClient.vue'
let login = localStorage.getItem("jwt")  
export default {
    name: 'app',
    data() {
      return {
        clientes: [],
      };
    },
  methods: {
    async getClients() {
      try {
        const respuesta = await fetch("http://localhost:3000/client", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.clientes = await respuesta.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getClients();
  },
  components: {
      ModalCreateClient,
      ModalEditClient,
      ModalDetailClient
    }
  }

</script>
<style scoped>
.clientesView{
  background-image: url(../assets/logoTransparente.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
}
</style>
