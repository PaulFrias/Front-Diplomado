<template>
  <button type="button" class="btn btn-primary"  @click="showModalAdoptPetl = true">
    🐾 Adoptar
  </button>  
  <div class="modal" tabindex="-1" v-if="showModalAdoptPetl">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Seleccione el cliente para {{mascota.name}}</h5>
        </div>
        <div class="modal-body">
          <select class="form-select" v-model="adopt.clientId" id="typePet">
            <option id="clienteOptionValue" v-for="cliente in clientes" :key="cliente.id" :value="cliente.id"> {{ cliente.name }} </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModalAdoptPetl = false">Close</button>
          <button type="submit" class="btn btn-primary" @click="adoptPet(adopt)">💾 Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let login = localStorage.getItem("jwt"); 
let config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ login
  }
}
export default {
  name: 'ModalAdoptPet',
  props: {
    mascota: {},
  },
  data() {
    return {
      showModalAdoptPetl: false,
      adopt: {
        id: this.mascota.id ,
        clientId: ''
      },
      clientes: [],
    }
  },
  methods: {
     async adoptPet(adopt) {   
      try {
        await axios.post("http://localhost:3000/pet/adopt", adopt, config).then(() => {
          alert(this.mascota.name + ' fue adoptado correctamente por ' /*+ this.cliente.name*/);
        });
       
        } catch (error) {
        if(error.code == "ERR_NETWORK"){
          alert("Ocurrio un Error Con el Sistema. Intente Nuevamente")
        }
        else{
          alert(error)        
        }        
      } 
    },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .modal {
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     background-color: rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

</style>
