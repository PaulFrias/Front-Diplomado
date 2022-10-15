<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <a class="navbar-brand" ><img src="../assets/logoPetShop.png" class="cat"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Inicio</a>
          </li>
          <li v-if="isLoggin" class="nav-item">
            <a class="nav-link" href="/mascotas">Mascotas</a>
          </li>
          <li v-if="isLoggin" class="nav-item">
            <a class="nav-link" href="/clientes">Clientes</a>
          </li>          
        </ul>        
      </div>
      <router-link v-if="isLoggin" to="/login" @click="handleLogout" class="nav-link" >Salir</router-link>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'BarnavHome',
    data(){
      let isLoggin = false
    return {
      isLoggin
    }    
  },
  methods:{
    isLogged(){
      let login = localStorage.getItem("jwt")      
      if(login != null){     
        this.isLoggin = true        
      }
    },
    handleLogout(){
      localStorage.removeItem('jwt');      
    }        
  },
  mounted(){
    this.isLogged()
  }
  }  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  }
  .cat {
  height:100px;
  width: 100px;
  }
a{
  font-size: xx-large;
}
b{
  font-size: xx-large;
}
</style>
