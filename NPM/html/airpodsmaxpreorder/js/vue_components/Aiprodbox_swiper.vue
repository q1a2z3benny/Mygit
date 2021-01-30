<template>
  <div class="EJtkAiprodbox" v-if = "swiperCount!=[]">
    <div class="EJtkAipro">
      <div class="EJtkAiprodtitle">
        <i></i>
        <span>精選品牌</span>
      </div>
    </div>

    <div class="EJnewBrandcontentbox">
      <div class="EJnewbrandcontent">
        <!-- Swiper START -->
        <div class="swiper-container brand">
          <!-- メイン表示部分 -->
          <swiper class="swiper-wrapper" ref="swiperOption" :options="swiperOption">
            <!-- 各スライド -->
            <swiper-slide  v-for="swiper_idx in swiperCount" :key="swiper_idx">
              <div class="swiper-slide">
                <ul>
                  <li v-for="(swiperBanners,index) in GetProdbox(prodbox_sw_pt,swiper_idx)" :key="index">
                    <a v-bind:href="GetUrl(swiperBanners.website,swiperBanners.brand)" v-on:click="Ga(swiperBanners.brand)">
                      <img v-bind:src="swiperBanners.imgurl"   onerror="ImgError(this);" />

                      <div class="brandInfobox">
                          <div class="brandInfohot">{{swiperBanners.brand}}</div>
                          <div class="brabdInfotitle">{{swiperBanners.content}}</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </swiper-slide>            
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <!-- Swiper END -->
      </div>
      <div class="clearbox"></div>
    </div>
  </div>
</template>
<script>
Vue.use(VueAwesomeSwiper);
module.exports = {
  created: function() {
    this.GetData();
  },
  data: function() {
    return {
      prodbox_sw_pt: [],
      swiperOption: {
        autoHeight: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        }
      },
      swiperCount:0
    };
  },
  methods: {
    GetData: function() {
      let self = this;
      $.ajax({
        url: "api/indexpage/AiprodboxSwiper",
        type: "POST",
        dataType: "json",
        success: function(data) {
          self.prodbox_sw_pt = data;
          self.swiperCount = Math.ceil((data.length/10))
        }
      });
    },
    GetProdbox: function(data, swiper_idx) {
      let datacountemp = (swiper_idx-1)*10
      let result = data.filter(function(item, index) {
        if (datacountemp <= index & index < swiper_idx*10) return item;
      });
      return result;
    },
      Ga:function(name){
          sendGaEvent('首頁_精選品牌', 'click', '精選品牌_'+name+'');
       },
      GetUrl: function(href,name) {


       let url
    //錨點問題解決
          if (href == "") href = "#";
           var myURL = new URL(href);
           if(href.indexOf('?')>-1)
           {
               url= href.replace(myURL.hash, '')+"&ec=idx-brand-"+name+ myURL.hash;
           }
           else
           {
               url= href.replace(myURL.hash, '')+"?ec=idx-brand-"+name+ myURL.hash;
           }

          return url;
       },

  }
};
</script>