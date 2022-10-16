<template>
  <button type="button" class="btn btn-success"  @click="showPetEditModal = true">
    ✏️ Editar
  </button>  
  <div class="modal" tabindex="-1" v-if="showPetEditModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Formulario para Editar Mascota</h5>
        </div>
        <div class="modal-body">
          <label class="form-label">Bombre</label>
          <input type="text" class="form-control" id="ClientDocumentType" v-model="edit.name" > 
        </div>
        <div class="modal-body">
          <label class="form-label">Descripcion</label>
          <input type="text" class="form-control" id="ClientdocumentId" v-model="edit.description">
        </div>
        <div class="modal-body">
          <label class="form-label">imagen</label>
          <input type="text" class="form-control" id="ClientName" v-model="edit.image">
        </div>
        <div class="modal-body">
          <label class="form-label">Especie</label>
          <select class="form-select" v-model="edit.typeId" id="typePet" style="width: 80%">
            <option id="optionTypeValue" v-for="type in types" :key="type.id" :value="type.id"> {{ type.name }} </option>
          </select>
        </div>
        <div class="modal-body">
          <label class="form-label">Raza</label>
          <select class="form-select" @click="getBreeds(edit.typeId)" id="breedPet" v-model="edit.breedId" style="width: 80%">
            <option :value="breed.id" v-for="breed in breeds" :key="breed.id"> {{ breed.name }} </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showPetEditModal = false">Close</button>
          <button class="btn btn-primary" @click="editPet(edit)">💾 Guardar</button>
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
  name: 'ModalEditPet',
  props:{
    mascota: {},
    types: {}
  },
  data() {
    return {
        showPetEditModal: false,
        edit: {
        id: this.mascota.id,
        name: this.mascota.name,
        description: this.mascota.description,
        image: this.mascota.image,
        typeId: this.mascota.typeId,
        breedId: this.mascota.breedId
        },
        breeds: []
    }
  },
  methods: {
     async editPet(pet) {   
      try {
        await axios.put("http://localhost:3000/pet", pet, config).then(() => {
           alert('La mascota: ' + pet.name +' modificado correctamente');
           this.$router.go(0)
        });
       
        } catch (error) {
        if(error.code == "ERR_NETWORK"){
          alert("Ocurrio un Error Con el Sistema. Intente Nuevamente")
          location. reload()
        }
        else{
          alert(error)        
        }        
      } 
      },
      async getBreeds(typeid) {
      try {
        const respuesta = await fetch("http://localhost:3000/breed/"+typeid, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.breeds = await respuesta.json();
        } catch (error) {
        console.log(error);
        }
      },
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
