<template>
  <div class="picbannerbox" v-if = "imgurl!=''">    
      <a target="_blank" :href="GetUrl(href)" v-on:click="Ga(hm_name)">
        <img :src="imgurl" width="1144"/>
      </a>    
  </div>
</template>
<script>
module.exports = {
  props: ["sort","index"],
  created: function() {
    this.GetData();
  },
  data: function() {
    return {
      imgurl:"",
      href: "",
      hm_name:''
    };
  },
  methods: {
    GetData: function() {
      let self = this;      
      $.ajax({
        url: "api/ad/banner",
        type: "POST",
        dataType: "json",
        data:{"index":self._props.index},
        //async: false,
        success: function(data) {          
          self.imgurl = data.img;
            self.href = data.url;
            self.hm_name = data.hm_name;
        }
      });
      },
      Ga: function (name) {
          let index
          switch (this._props.index) {
              case '4':
                  index = "1";
                  break;
              case '5':
                  index = "2";
                  break;
          }
          sendGaEvent('首頁_腰帶' + index, 'click', '腰帶_' + name);
      },
      GetUrl: function (href) {

          let index
          switch (this._props.index) {
              case '4':
                  index = "1";
                  break;
              case '5':
                  index = "2";
                  break;            
          }

          let url
          //錨點問題解決
          if (href == "") href = "#";
          var myURL = new URL(href);
          if (href.indexOf('?') > -1) {
              url = href.replace(myURL.hash, '') + "&ec=idx-belt" + index + myURL.hash;
          }
          else {
              url = href.replace(myURL.hash, '') + "?ec=idx-belt-" + index + myURL.hash;
          }

          return url;
      },
  }
};
</script>