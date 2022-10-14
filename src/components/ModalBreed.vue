<template>
  <button type="button" class="btn btn-success"  @click="showBreedModal = true">
    ➕ Agregar
  </button> 
  <div class="modal" tabindex="-1" v-if="showBreedModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ingrese Nueva Raza</h5>
        </div>
        <div class="modal-body">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" id="typeName" v-model="breed.name">
        </div>
        <div class="modal-body">
          <label class="form-label">Descripcion</label>
          <div class="container my-2"></div>
          <textarea id="typeDescription" cols="50" rows="10" v-model="breed.description"></textarea>
        </div>
          <label class="form-label">Especie</label>
         <select class="form-select" v-model="breed.typeId" id="typePet">
            <option id="optionTypeValue" v-for="type in types" :key="type.id" :value="type.id"> {{ type.name }} </option>
          </select>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showBreedModal = false">Close</button>
          <button type="submit" class="btn btn-primary" @click="createBreed(breed)">💾 Guardar</button>
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
  name: 'ModalBreed',
  data() {
    return {
      showBreedModal: false,
      breed: {
        name: '',
        description: '',
        typeId: ''
      }
    }
  },
  props: {
    types: Array,
  },
  methods: {
    async createBreed(breed) {   
      try {
        await axios.post("http://localhost:3000/breed", breed, config).then(() => {
           alert('Raza ' + breed.name +' Agregada correctamente');
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

</style>
