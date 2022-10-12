<template>
  <div class="formCreatePetView">
    <div class="cardForm">
      <form >
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="name" class="form-control" id="namePet">
        </div>
        <div class="mb-3">
          <label class="form-label">Descripcion</label>
          <input type="description" class="form-control" id="descripcionPet">
          <div id="descriptionHelp" class="form-text">Cuentanos las 2 cualidades mas especiales de la mascota.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Foto</label>
          <input type="description" class="form-control" id="imagePet">
          <div id="imageHelp" class="form-text">Ingresa la Url de la foto de la mascota</div>
        </div>
        <div class="mb-3 form-check">
          <label class="form-label">Especie</label>
          <select class="form-select" v-model="typeSeleccionado" id="typePet">
            <option id="optionTypeValue" v-for="type in types" :key="type.id" :value="type.id"> {{ type.name }} </option>
          </select>
        </div>
        <div class="mb-3 form-check">
          <label class="form-label">Raza</label>
          <select class="form-select" @click="getBreeds(typeSeleccionado)" id="breedPet" >
            <option selected aria-placeholder="Seleccione Especie primero">Seleciona</option>
            <option :value="breed.id" v-for="breed in breeds" :key="breed.id"> {{ breed.name }} </option>
          </select>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" @click="createPet()">Enviar</button>
          </div>
          <div class="col"></div>
          <div class="col">
            <button type="reset" class="btn btn-primary">Borrar</button>
          </div>   
        </div>    
      </form>
    </div>
  </div>
</template>

<script>

var TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkNjY2ZjlkYS0yNjgxLTQ3NDYtYTIyZi0zY2U4ODY2OGY2YjAiLCJpYXQiOjE2NjU1OTI2NDksImV4cCI6MTY2NTY3OTA0OX0.9PlyrD7VPhlF_AsyqByR_M7xXut7VVhlQ9RoYH65rtM"
  export default {
    name: 'app',
    data() {
      return {
        types:[],
        typeSeleccionado: {},
        breeds:[],
      }
    },
    methods: {
      async getTypes() {
      try {
        const respuesta = await fetch("http://localhost:3000/type", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ TOKEN
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
            'Authorization': 'Bearer '+ TOKEN
          },
        });
        this.breeds = await respuesta.json();
        } catch (error) {
        console.log(error);
        }
      },
      async createPet(name, description, image, typeId, breedId) {
      try {
        const respuesta = await fetch("http://localhost:3000/pet", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ TOKEN
          },
          body:{
            "name": name,
            "description": description,
            "image": image,
            "typeId": typeId,
            "breedId": breedId
          }
        });
        this.type = await respuesta.json();
        } catch (error) {
        console.log(error);
        }
      }
    },
    mounted() {
    this.getTypes();
    },
  }
</script>
<style scoped>
.cardForm{
  
}
</style>