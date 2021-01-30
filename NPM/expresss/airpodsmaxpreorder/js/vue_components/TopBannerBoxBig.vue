<template>
  <div class="EJnewTopbannerboxbig" v-if="img !=''">
    <div class="EJnewTopbanner" :style="{'--background': background}">
      <a target="_blank" :href="GetUrl(href)">
        <img :src="img" />
      </a>
    </div>
    <a class="EJnewTopbannerbtn-close bigclose" href="#" title="關閉">×</a>
  </div>
</template>
<script>
module.exports = {
  created: function() {
    this.GetData();    
    this.SetBannerExipre();    
  },
  data: function() {
    return {
      img: "",
      href: "",
      background: ""
    };
  },
  methods: {
    GetData: function() {
      let self = this;
      $.ajax({
        url: "api/ad/topbanner",
        type: "POST",
        dataType: "json",
        success: function(data) {
          self.img = data.img2;
          self.href = data.url;
          self.background = data.color;
        }
      });
    },
    SetBannerExipre : function (){      
      let expireTime = new Date();
      expireTime.setDate(expireTime.getDate()+1)
      expireTime.setHours(6)
      expireTime.setMinutes(0)      
      window.localStorage.setItem("bigtopbannerExpire",expireTime)
      },
      GetUrl: function (href) {

          let url
          //錨點問題解決
          if (href == "") href = "#";
          var myURL = new URL(href);          
          if (href != undefined && href.indexOf('?') > -1) {
              url = href.replace(myURL.hash, '') + "&ec=idx-topbn" + myURL.hash;
          }
          else {
              url = href.replace(myURL.hash, '') + "?ec=idx-topbn" + myURL.hash;
          }

          return url;
      },
  }
};
</script>
<style>
.EJnewTopbanner {
  background: var(--background);
}
</style>