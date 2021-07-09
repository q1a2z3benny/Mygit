import Vue from "vue";
import Router from "vue-router";
//移動至組件位置，配合App.vue
Vue.use(Router);

export default new Router({
    
  mode: "history",
  routes: [
    /* 
    {
      path: "/",
      alias: "/tutorials", //路徑別名
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    */
    {
      path:"/signup",
      alias:"/",
      name:"signup",
      component: () => import("./components/UserSignup")
    },
    
    {
       path:"/signin",
       name:"signin",
       component: () => import("./components/UserSignin")
    }
    
  ]
});