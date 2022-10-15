<template>
  <button type="button" class="btn btn-success"  @click="showClientEditModal = true">
    ✏️ Editar
  </button>  
  <div class="modal" tabindex="-1" v-if="showClientEditModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Formulario para Editar cliente</h5>
        </div>
        <div class="modal-body">
          <label class="form-label">Tipo de identificacion</label>
          <input type="text" class="form-control" id="ClientDocumentType" v-model="edit.documentType" > 
        </div>
        <div class="modal-body">
          <label class="form-label">Documento de identificacion</label>
          <input type="text" class="form-control" id="ClientdocumentId" v-model="edit.documentId">
        </div>
        <div class="modal-body">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" id="ClientName" v-model="edit.name">
        </div>
        <div class="modal-body">
          <label class="form-label">Direccion</label>
          <input type="text" class="form-control" id="ClientAddress" v-model="edit.address">
        </div>
        <div class="modal-body">
          <label class="form-label">Telefono</label>
          <input type="text" class="form-control" id="ClientPhone" v-model="edit.phone">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showClientEditModal = false">Close</button>
          <button type="submit" class="btn btn-primary" @click="editClient(edit)">💾 Guardar</button>
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
  name: 'ModalEditClient',
  props:{
    cliente: {}
  },
  data() {
    return {
        showClientEditModal: false,
        edit: {
        documentType: this.cliente.documentType,
        documentId: this.cliente.documentId,
        name: this.cliente.name,
        address: this.cliente.address,
        phone: this.cliente.phone
        }
    }
  },
  methods: {
     async editClient(client) {   
      try {
        await axios.put("http://localhost:3000/client", client, config).then(() => {
           alert('El cliente: ' + client.name +' modificado correctamente');
        });
       
        } catch (error) {
        if(error.code == "ERR_NETWORK"){
          alert("Ocurrio un Error Con el Sistema. Intente Nuevamente")
        }
        else{
          alert(error)        
        }        
      } 
      }
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

  .modal-dialog-centered{
    width: 60%;
  }

  button{
  margin: 10px
}

</style>
