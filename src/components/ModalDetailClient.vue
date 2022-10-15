<template>
  <button type="button" class="btn btn-info"  @click="showClientDetailModal = true">
    🔍 Detalles
  </button>  
  <div class="modal" tabindex="-1" v-if="showClientDetailModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detalles del cliente</h5>
        </div>
        <div class="modal-body">
          <label class="form-label">Tipo de identificacion</label>
          <input type="text" class="form-control" id="ClientDocumentType" :value="cliente.documentType" readonly > 
        </div>
        <div class="modal-body">
          <label class="form-label">Documento de identificacion</label>
          <input type="text" class="form-control" id="ClientdocumentId" :value="cliente.documentId" readonly>
        </div>
        <div class="modal-body">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" id="ClientName" :value="cliente.name" readonly>
        </div>
        <div class="modal-body">
          <label class="form-label">Direccion</label>
          <input type="text" class="form-control" id="ClientAddress" :value="cliente.address" readonly>
        </div>
        <div class="modal-body">
          <label class="form-label">Telefono</label>
          <input type="text" class="form-control" id="ClientPhone" :value="cliente.phone" readonly>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showClientDetailModal = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDetailClient',
  props:{
    cliente: {}
  },
  data() {
    return {
        showClientDetailModal: false,
    }
  },
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

</style>
