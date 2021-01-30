<template>  
        <div class="pickspec">
          <fieldset class="all_spec">
            <legend>規格</legend>
              <ul>
                <li v-for="(specification,idx) in this.$props.specifications" :key="idx">
                  <input @click="chooseSpec(idx)" :id="'spec'+idx" class="" name="dimensionspec" :data-autom="'dimensionspec'+specification" type="radio" :value="specification">
                  <label>
                    <b>{{specification}}</b>
                    <p><em>$</em>999,999</p>
                  </label>
                </li>
                  <!--
                <li>
                  <input class="" name="dimensionspec" data-autom="dimensionspec128G" type="radio" value="128G">
                  <label>
                    <b>128G</b>
                    <p><em>$</em>999,999</p>
                  </label>
                </li>
                <li>
                  <input class="" name="dimensionspec" data-autom="dimensionspec256G" type="radio" value="256G">
                  <label>
                    <b>256G</b>
                    <p><em>$</em>999,999</p>
                  </label>
                </li>
                <li>
                  <input class="" name="dimensionspec" data-autom="dimensionspec512G" type="radio" value="512G">
                  <label>
                    <b>512G</b>
                    <p><em>$</em>999,999</p>
                  </label>
                </li>
                <li>
                  <input class="" name="dimensionspec" data-autom="dimensionspec1T" type="radio" value="1T">
                  <label>
                    <b>1T</b>
                    <p><em>$</em>999,999{{this.$props.specifications}}</p>
                  </label>
                </li>
                -->
              </ul>
          </fieldset>
        </div>
</template>
<script>
module.exports = {
  props: {
          specifications: []
  },
  created: {
     
  },
  updated:{
 
  },
  watch:{

    },
  methods: {
     chooseSpec: function (index){
            let vm = this;
            vm.$emit("specidx","three",index);
    }
  }
};
</script>