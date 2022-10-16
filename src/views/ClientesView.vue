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
            <th>Mascotas</th>          
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
              <ModalListPetsByClient :cliente="cliente.id"/>
            </td>          
            <td >
              <ModalDetailClient :cliente="cliente"/>
              <ModalEditClient :cliente="cliente"/>
              <button class="btn btn-danger ml-2" @click="deleteClient(cliente.id)">
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
import ModalListPetsByClient from '@/components/ModalListPetsByClient.vue'
import ModalDetailClient from '@/components/ModalDetailClient.vue'
import ModalEditClient from '@/components/ModalEditClient.vue'
import ModalCreateClient from '@/components/ModalCreateClient.vue'
let login = localStorage.getItem("jwt"); 
export default {
    name: 'app',
    data() {
      return {
        clientes: [],
        mascotasByClient: []
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
     async deleteClient(cliente) {
      try {
        await fetch("http://localhost:3000/client/" + cliente, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        alert('El cliente eliminado correctamente');
        this.$router.go(0)
      } catch (error) {
        if(error.code == "ERR_NETWORK"){
          alert("Ocurrio un Error Con el Sistema. Intente Nuevamente")
        }
        else{
          alert(error)        
        }        
      } 
    },
  },
  mounted() {
    this.getClients();
  },
  components: {
      ModalCreateClient,
      ModalEditClient,
      ModalDetailClient,
      ModalListPetsByClient
    }
  }

</script>
<style scoped>
.clientesView{
  background-image: url(../assets/logoTransparente.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
  min-height: 705px;
}
</style>
