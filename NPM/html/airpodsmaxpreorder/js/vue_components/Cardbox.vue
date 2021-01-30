<template>
  <div class="EJnewCardbox">
    <div class="EJnewWrapper" v-for="(Cardboxs,index) in Cardbox" :key="index">
      <div class="EJnewCardlistbox">
        <ul class="cardlistbox">
          <li style="background:#555559; border-top-left-radius: 5px;" class="EJnewCardmenu">
            <div class="EJnewCardmenutitle">
              <i></i>
              {{Cardboxs.title}}
            </div>
          </li>
          <li v-for="(menu,index) in Cardboxs.menu" :key="index">
              <a v-bind:href="GetClassUrl(menu.href,index+1)" v-on:click="GaClass(Cardboxs.title,index+1,menu.title)">
                  <div class="Cardlistbtn1" v-if="menu.icon ==1"><img src="images/icons/cardsaleeicon-04.png" /></div>
                  <div class="Cardlistbtn2" v-if="menu.icon ==2"><img src="images/icons/cardsaleeicon-03.png" /></div>
                  <div class="Cardlistbtn3" v-if="menu.icon ==3"><img src="images/icons/cardsaleeicon-05.png" /></div>
                  {{menu.title}}
              </a>
          </li>
        </ul>
      </div>

      <div class="EJnewpcCardbannerbox">
        <a target="_blank" :href="GetBnUrl(href)" v-on:click="GaBn(Cardboxs.title,hm_name)">
          <img :src="img" />
        </a>
      </div>

      <div class="EJnewpcCardprodbox">
        <ul>
          <li v-for="(pt,index) in Cardboxs.product" :key="index">
            <a v-bind:href="GetcardUrl(pt.href)" v-on:click="Gacard(Cardboxs.title,pt.id,pt.productName)">
              <div v-if="pt.discountPercent !== '100' && pt.HMID_ShowDiscount == 1" class="card-iconbox">
                <div class="card-iconinfo">{{pt.discountPercent}}</div>
                <div class="card-iconinfo-num">折</div>
              </div>

              <img
                v-bind:src="pt.prodImg"
                height="143"
                width="143"
                border="0"
                onerror="ImgError(this);"
              />
              <div class="newEventhot">{{pt.promote}}</div>
              <div class="newCardttitle">{{pt.productName}}</div>
              <div class="pcCardprice">
                <span  class="newEventredPricetext">${{pt.realprice}}</span>

              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: ["index","banner"],
  created: function () {
    this.GetData();
  },
  data: function() {
    return {
      Cardbox: [],
      img:"",
      href:"",
      bannerdata:"",
      hm_name:''
    };
  },
  methods: {
     GetBnUrl: function (href) {
           let index

        switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          let url
    //錨點問題解決
          if (href == "") href = "#";
          var myURL = new URL(href);
          if (href != undefined && href.indexOf('?') > -1) {
              url = href.replace(myURL.hash, '') + "&ec=idx-card"+index+"-bn1"+ myURL.hash;
          }
          else {
              url = href.replace(myURL.hash, '') + "?ec=idx-card"+index+"-bn1"+ myURL.hash;
          }
          return url;
      },
     GetClassUrl: function (href,sort) {
           let index

        switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          let url
    //錨點問題解決
          if (href == "") href = "#";
          var myURL = new URL(href);
          if (href != undefined && href.indexOf('?') > -1) {
              url = href.replace(myURL.hash, '') + "&ec=idx-card"+index+"-class"+sort+ myURL.hash;
          }
          else {
              url = href.replace(myURL.hash, '') + "?ec=idx-card"+index+"-class"+sort+ myURL.hash;
          }
          return url;
      },
     GetcardUrl: function (href) {
           let index

        switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          let url
          if (href != undefined && href.indexOf('?') > -1) {
              url = href + "&ec=idx-card"+ index +"-goods";
          }
          else {
              url = href + "?ec=idx-card"+ index +"-goods";
          }
          return url;
      },

      GaClass:function(name,classno,classname){
        let index

        switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          sendGaEvent('首頁_卡片'+index+'_'+name+'', 'click', '卡片'+index+'_熱門分類'+classno+'_'+classname+'');
       },
      GaBn:function(name,bnname){
        let index
          switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          sendGaEvent('首頁_卡片'+index+'_'+name+'', 'click', '卡片'+index+'_卡片BN'+index+'_'+bnname+'');
       },
     Gacard:function(name,orderno,text){
        let index
          switch (this._props.index) {
         case '10':
             index = "1";
             break;
         case '11':
             index = "2";
              break;
         case '12':
             index = "3";
              break;
         case '13':
             index = "4";
              break;

         }
          sendGaEvent('首頁_卡片'+index+'_'+name+'', 'click', '卡片'+index+'_商品'+orderno+'_'+text+'');
       },

    GetData: function () {
      let self = this;
      $.ajax({
        url: "api/indexpage/cardbox",
        type: "POST",
        dataType: "json",
        data:{"index":self._props.index},
        //async:false,
        success: function(data) {
          self.Cardbox = data;
        }
      });
      $.ajax({
        url: "api/ad/banner",
        type: "POST",
        dataType: "json",
        data:{"index":self._props.banner},
        //async: false,
        success: function(data) {
          self.bannerdata = data;
          self.img = data.img;
          self.href = data.url;
          self.hm_name=data.hm_name;
        }
      });
    }
  }
};

</script>