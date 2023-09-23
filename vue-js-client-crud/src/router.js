import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      /*alias: "/tutorials",*/
      /*name: "tutorials",*/
      name: "App",
      /*component: () => import("./components/TutorialsList")*/
      component: () => import("./components/LoginTutorial")
    },
    {
      path: "/login",
      alias: "/login",
      /*alias: "/tutorials",*/
      /*name: "tutorials",*/
      name: "login",
      /*component: () => import("./components/TutorialsList")*/
      component: () => import("./components/LoginTutorial")
    },
    {
      path: "/tutorials",
      alias: "/tutorials",
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
    {
      path: "/emplist",
      name: "emplist",
      component: () => import("./components/EmpList")
    }
  ]
});
