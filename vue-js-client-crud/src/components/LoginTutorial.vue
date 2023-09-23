<template>
  <div class="submit-form">

    <div v-if="!islogin">
      <div class="form-group">
        <label for="account">Account</label>
        <input
          type="text"
          class="form-control"
          id="account"
          required
          v-model="login.account"
          name="account"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="login.password"
          name="password"
        />
      </div>

      <button @click="send" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You login successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">OK</button>
     
    </div>
   
  </div>
</template>

<script>
import LoginService from "../services/LoginService";

export default {
  name: "login",
  data() {
    return {
      login: {
        id: null,
        account: "",
        password: "",
        published: false
      },
    };
  },
  methods: {
    send() {
      var data = {
        system: "123",
        acc: this.login.account,
        psd: this.login.password,
        ip: "30455"
        
      };

      LoginService.post(data)
        .then(response => {
           /*this.tutorial.id = response.data.id;*/
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          this.$store.dispatch('isToken');
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.login = {};
      // this.$router.push("/tutorials");
      this.$router.push({path:"/tutorials"}).catch(() => {});
    }
  }
  ,
  computed: {
    islogin () {
      return this.$store.getters.islogin
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>