<template>  
<div class="pickcolor">
    <fieldset class="all_color">
      <legend>顏色</legend>
        <ul>
          <li v-for="(color,idx) in this.$props.colors" :key="idx">
            <input @click="chooseColor(idx)" :id="'color'+idx" class="" name="dimensionColor" :data-autom="'dimensioncolorspace_'+color" type="radio" :value="'space_'+color">
            <label>
              <figure><img alt="" src="../images/pickcolor/finish-spacegray-202011.png"></figure>
              <p>{{color}}</p>
            </label>
          </li>
          <!--
          <li>
            <input class="" name="dimensionColor" data-autom="dimensioncolorsilver" type="radio" value="silver">
            <label>
              <figure><img alt="" src="../images/pickcolor/finish-silver-202011.png"></figure>
              <p>銀色</p>
            </label>
          </li>
          <li>
            <input class="" name="dimensionColor" data-autom="dimensioncolorgreen" type="radio" value="green">
            <label>
              <figure><img alt="" src="../images/pickcolor/finish-green-202011.png"></figure>
              <p>綠色</p>
            </label>
          </li>
          <li>
            <input class="" name="dimensionColor" data-autom="dimensioncolorskyblue" type="radio" value="skyblue">
            <label>
              <figure><img alt="" src="../images/pickcolor/finish-skyblue-202011.png"></figure>
              <p>天藍色</p>
            </label>
          </li>
          <li>
            <input class="" name="dimensionColor" data-autom="dimensioncolorpink" type="radio" value="pink">
            <label>
              <figure><img alt="" src="../images/pickcolor/finish-pink-202011.png"></figure>
              <p>粉紅色</p>
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
          colors: []
  },
  created: {
     
  },
  updated:   {
 
  },
  watch:{

    },
  methods: {
    chooseColor: function (index){
            let vm = this;
            vm.$emit("colorindex","two",index);
    }
  }
};
</script>