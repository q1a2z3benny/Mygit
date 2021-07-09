<template>
  <div class="edit-form">
    <h4>Signin below </h4>
    <form>
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
      @click="postSignIn"
    >
      login
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService";

export default {
  name: "signin",
  data() {
    return {
      signdata: {
        username: "",
        password: ""
      },
      message: ''
    };
  },
  methods: {

    //登入
    postSignIn() {
        let vm = this;
        AuthDataService.signIn(vm.signdata)
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