<template>
  <div class="edit-form">
    <h4>Signup below </h4>
    <form>
      <div class="form-group">
        <label for="email">Enter Email</label>
        <input type="text" class="form-control" id="email"
          v-model="signdata.email"
        />
      </div>
      <div class="form-group">
        <label for="username">Enter Username</label>
        <input type="text" class="form-control" id="uaername"
          v-model="signdata.username"
        />
      </div>
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input type="text" class="form-control" id="password"
          v-model="signdata.password"
        />
      </div>
    </form>
    <button type="submit" class="badge badge-success"
      @click="postSignUp"
    >
      Registered
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService";

export default {
  name: "signup",
  data() {
    return {
      signdata: {
        email: "",
        username: "",
        password: ""
      },
      issuccess:false,
      message: ''
    };
  },
  methods: {

    //註冊
    postSignUp() {
        let vm = this;
        AuthDataService.signUp(vm.signdata)
        .then(response => {
            vm.message = response.data.message;
            
        })
        .catch(e => {
            console.log(e);
        });
    },
  },
  mounted() {
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>