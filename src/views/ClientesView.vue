<template>
  <div class="clientesView">
    <div v-if="!clientes.length" class="alert alert-info" role="alert">
      No se han agregado clientes
    </div>
    <ModalCreateClient/>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>          
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td v-if="editando === cliente.id">
            <input type="text" class="form-control" v-model="cliente.name" />
          </td>
          <td v-else>
            {{ cliente.name }}
          </td>          
          <td v-if="editando === cliente.id">
            <button class="btn btn-success" @click="guardarCliente(cliente)">
              💾 Guardar
            </button>
            <button
              class="btn btn-secondary ml-2"
              @click="cancelarEdicion(cliente)"
            >
              ❌ Cancelar
            </button>
          </td>
          <td v-else>
            <button class="btn btn-info" @click="editarCliente(cliente)">
              ✏️ Editar
            </button>
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
</template>


<script>
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
    editarCliente(cliente) {
      this.clienteEditada = Object.assign({}, cliente);
      this.editando = cliente.id;
    },
    guardarCliente(cliente) {
      if (!cliente.nombre.length) {
        return;
      }
      this.$emit("actualizar-cliente", cliente.id, cliente);
      this.editando = null;
    },
    cancelarEdicion(cliente) {
      Object.assign(cliente, this.clienteEditada);
      this.editando = null;
    },
  },
  mounted() {
    this.getClients();
  },
  components: {
      ModalCreateClient
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
