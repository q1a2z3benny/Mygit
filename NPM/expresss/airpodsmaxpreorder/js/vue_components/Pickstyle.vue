<template>
<div class="picktype">
    <fieldset class="all_type">
      <legend>款式</legend>
        <ul>
         <li v-for="(style,idx) in this.$props.airpodmaxinfo.Models" :key="idx" >
            <input @click="chooseModel(idx)" class="" name="dimensiontype" :data-autom="'dimensiontype'+ style" type="radio" :value="style">
            <label>
              <p>{{style}}</p>
            </label>
          </li>
  
        </ul>
    </fieldset>
  </div>
</template>
<script>
module.exports = {
  props: {
          airpodmaxinfo: {
              Models: [],
              Colors: [],
              Specifications:[],
              Productids:[]
          }
  },
  created:  {
     
  },
  updated:  {
 
  },
  watch:{

    },
  methods: {
    chooseModel: function (index){
            let vm = this;
            vm.$emit("modelindex","one",index);
    }
  }
};
</script>