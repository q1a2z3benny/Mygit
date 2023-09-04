<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="account">Account</label>
        <input
          type="text"
          class="form-control"
          id="account"
          required
          v-model="tutorial.account"
          name="account"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="tutorial.password"
          name="password"
        />
      </div>

      <button @click="send" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/LoginService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        account: "",
        password: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    send() {
      var data = {
        system: "123",
        acc: this.tutorial.account,
        psd: this.tutorial.password,
        ip: "30455"
        
      };

      TutorialDataService.post(data)
        .then(response => {
           /*this.tutorial.id = response.data.id;*/
          console.log(response.data);
          /*this.submitted = true;*/
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
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