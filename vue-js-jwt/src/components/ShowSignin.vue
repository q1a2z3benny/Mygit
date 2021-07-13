<template>
  <div class="edit-form">
    <h4></h4>
    <form>
      <div class="form-group">
        <label for="role">Role</label>
        <p></p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <p></p>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <p></p>
      </div>
    </form>
  </div>
</template>

<script>
import TestDataService from "../services/TestDataService";

export default {
  name: "show",
  data() {
    return {
      acesstoken:""
    };
  },
  methods: {
    getAcessToken() {
      
        //let test = JSON.parse(this.$props.route.query.data)
      //  console.log(test);
        let token = document.cookie.replace("Token=","");
        TestDataService.roleuser(token)
        .then(response => {
            console.log(response.data);
          })
        .catch(e => {
            console.log(e);
        });      
    },
  },
  mounted() {
      this.getAcessToken();
  }
};
</script>


<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>