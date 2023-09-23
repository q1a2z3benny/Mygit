import Vue from "vue";
import Vuex from "vuex";
import LoginService from "../services/LoginService";
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        islogin: false
    },
    mutations:{
       setislogin(state,bool){
        state.islogin = bool;
       }
    },
    actions:{
        isToken({commit}) {
            LoginService.get()
              .then(response => {
                console.log(response.status);
                commit('setislogin',true);
                
                //  this.$router.push("/tutorials");
              })
              .catch(e => {
                commit('setislogin',false);
                // this.islogin = false;
                // this.$router.push("/login");
                console.log(e);
              });
          }
    },
    modules:{
        
    },
    getters:{
      islogin: state => {
        return state.islogin;
      }
    }
    
})
