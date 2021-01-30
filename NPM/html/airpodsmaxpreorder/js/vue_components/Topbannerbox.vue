<template>
  <div class="EJnewTopbannerbox" v-if="img !=''">
    <div class="Topbanner" :style="{'--background': background}">
      <a target="_blank" :href="GetUrl(href)" onclick="sendGaEvent('首頁_頂天', 'click', '首頁_頂天');">
        <img :src="img" />
      </a>
    </div>
    <a class="EJnewTopbannerbtn-close" href="#" title="關閉">×</a>
  </div>
</template>
<script>
module.exports = {
  created: function() {
      this.GetData();
  },
  data: function() {
    return {
      img: "",
      href: "",
      background: ""
    };
  },
  updated: function () {
    this.TopBannerMove();
  },
  methods: {
    GetData: function() {
      let self = this;
      $.ajax({
        url: "api/ad/TopBanner",
        type: "POST",
        dataType: "json",
        //async: false,
        success: function(data) {
          self.img = data.img;
          self.href = data.url;
          self.background = data.color;
        }
      });
    },
     GetUrl: function(href) {

        let url
         //錨點問題解決
          if (href == "") href = "#";
           var myURL = new URL(href);
           if(href.indexOf('?')>-1)
           {
               url= href.replace(myURL.hash,'')+"&ec=idx-topbn"+myURL.hash;
           }
           else
           {
               url= href.replace(myURL.hash,'')+"?ec=idx-topbn"+myURL.hash;
           }

            return url;
          },
    TopBannerMove: function() {
      let now = new Date();
      let topbannerExpire = new Date(
        window.localStorage.getItem("bigtopbannerExpire")
      );
      var timeoutID = setTimeout(function() {
        // 這邊下你要觸發的東西
        $(".EJnewTopbannerboxbig")
          .delay(500)
          .slideDown(1500)
          .delay(4000)
          .slideUp(1500);
        if (now < topbannerExpire) $(".EJnewTopbannerbox").show(0);
        else
          $(".EJnewTopbannerbox")
            .delay(7000)
            .show(0);

        // 下方這行一定要加 清除計時器
        window.clearTimeout(timeoutID);
      }, 0);

      $(".bigclose").click(function(event) {
        $(".EJnewTopbannerboxbig").hide();
        $(".EJnewTopbannerbox").show(0);
      });

      $(".EJnewTopbannerbtn-close").click(function(event) {
        $(".EJnewTopbannerbox").hide();
      });
    }
  }
};
</script>
<style>
.Topbanner {
  background: var(--background);
}
.Topbanner a img {
  display: block;
  margin: auto;
}
</style>