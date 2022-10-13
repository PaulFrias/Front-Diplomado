<template>
  <div class="login">    
      <div class="container">  
        <div class="row gx-1 justify-content-center">
          <div class="abs-center">
            <div class="container">
              <div class="text-center">
                <img
                  src="../assets/logoPetShop.png"
                  class="img-fluid"
                  style="width: 50%"
                />
              </div>
            </div>
            <div class="container">
              <form class="border p-3 form" @submit.prevent="login(user)">
              <div class="form-group">
                <label for="username">Usuario</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="form-control"
                  v-model="user.username"
                />
              </div>
              <br />
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <br />
              <div class="container">
                <div class="row">
                  <div class="col text-center">
                    <button class="btn btn-primary">Ingresar</button>
                  </div>
                </div>
              </div>
            </form>
            </div>            
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {  
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login(user){
      try {
        const data = await axios.post("http://localhost:3000/login",user)        
        this.saveDataLocalStorage(data.data)
        this.$router.push('/home')
      } catch (error) {
        if(error.code == "ERR_NETWORK"){
          alert("Ocurrio un Error Con el Sistema. Intente Nuevamente")
        }
        else{
          alert(error.response.data.error.message)        
        }        
      }        
    },
    async saveDataLocalStorage(data){      
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.attributes))
    }
  },

}
</script>

<style scoped>
.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 92vh;
}

.form {
  width: 450px;
}
</style>