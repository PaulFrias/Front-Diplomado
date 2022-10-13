<template>
  <div class="formCreatePetView">
    <div class="cardForm">
      <form  class="border p-5 form">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="name" class="form-control" id="namePet" v-model="pet.name">
        </div>
        <div class="mb-3">
          <label class="form-label">Descripcion</label>
          <input type="description" class="form-control" id="descripcionPet" v-model="pet.description">
          <div id="descriptionHelp" class="form-text">Cuentanos las 2 cualidades mas especiales de la mascota.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Foto</label>
          <input type="description" class="form-control" id="imagePet" v-model="pet.image">
          <div id="imageHelp" class="form-text">Ingresa la Url de la foto de la mascota</div>
        </div>
        <div class="mb-3 form-check">
          <label class="form-label">Especie</label>
          <select class="form-select" v-model="pet.typeId" id="typePet">
            <option id="optionTypeValue" v-for="type in types" :key="type.id" :value="type.id"> {{ type.name }} </option>
          </select>
        </div>
        <div class="mb-3 form-check">
          <label class="form-label">Raza</label>
          <select class="form-select" @click="getBreeds(pet.typeId)" id="breedPet" v-model="pet.breedId">
            <option :value="breed.id" v-for="breed in breeds" :key="breed.id"> {{ breed.name }} </option>
          </select>
        </div>
        <div class="row">
          <div class="col-md-4">
            <button class="btn btn-primary" @click="createPet(pet)">Enviar</button>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <button type="reset" class="btn btn-primary">Reset</button>
          </div>   
        </div>    
      </form>
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
    name: 'app',
    data() {
      return {
        types:[],
        breeds:[],
        pet: {
          name : '',
          description : '',
          image : '',
          typeId : '',
          breedId : '',
        },
      }
    },
    methods: {
      async getTypes() {
      try {
        const respuesta = await fetch("http://localhost:3000/type", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ login
          },
        });
        this.types = await respuesta.json();
        this.types.sort();
        } catch (error) {
        console.log(error);
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
      async createPet(pet) {   
      try {
        await axios.post("http://localhost:3000/pet", pet, config).then(() => {
           alert('Mascota ' + pet.name +' Agregada correctamente');
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
    },
    mounted() {
    this.getTypes();
    },
  }
</script>
<style scoped>
</style>