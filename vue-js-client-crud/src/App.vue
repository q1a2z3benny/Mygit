<template>
  <div id="app">
        <router-view>
   
   <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">

       <router-link to="/add" class="navbar-brand">login</router-link> 
      <div class="navbar-nav mr-auto" v-if="islogin">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        
       <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>  
      </div> 
    </nav> -->
    <!-- <login-tutorial></login-tutorial>
    <tutorials-list ></tutorials-list> -->
    <!-- <add-tutorial></add-tutorial> -->
    <!-- <div class="container mt-3">
      <router-view />
    </div>
    -->
   
   </router-view>
  </div>
  
</template>

<script>
// import LoginService from "../src/services/LoginService";
// import LoginTutorial from "./components/LoginTutorial";
// import TutorialsList from "./components/TutorialsList";
// import AddTutorial from "./components/AddTutorial";
// import AddTutorial from "./components/AddTutorial.vue";
export default {
  name: "app",
  components:{
    //  LoginTutorial,
    // TutorialsList,
    // AddTutorial
     
  },
  data() {
    return {
      // islogin: false
    };
  },
  methods: {
    // isToken() {
    //   LoginService.get()
    //     .then(response => {
    //       console.log(response.status);
    //       this.islogin = true;
    //        this.$router.push("/tutorials");
    //     })
    //     .catch(e => {
    //       this.islogin = false;
    //       this.$router.push("/login");
    //       console.log(e);
    //     });
    // }
  },
  mounted() {
    // this.isToken();
    this.$store.dispatch('isToken');
  },
  computed: {
    islogin () {
      return this.$store.getters.islogin
    }
  }
};
</script>