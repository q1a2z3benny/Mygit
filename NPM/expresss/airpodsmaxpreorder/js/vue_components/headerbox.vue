<template>
    <div class="EJnewHeaderbox">
        <div class="EJnewHeader">
            <div class="EJnewHeaderleft">
                <a href="/index.aspx" v-on:click="GaLogo()">
                    <img v-if="Logo !=''"
                         id="tophead1_LogoUC1_Img"
                         onerror="ImgError(this);"
                         :src="Logo"
                         style="height:82px;width:199px;border-width:0px;" />
                </a>
            </div>
            <div class="EJnewHeadercenter">
                <div class="EJnewSearchbox">
                    <div class="EJnewSearchtoolbox">
                        <!-- <i class="EJnewSearchicon"></i> -->

                        <div class="EJnewSearchtool">
                            <autocomplete :search="search"
                                          :get-result-value="getResultValue"
                                          v-bind:placeholder="placeholder"
                                          v-bind:aria-label="placeholder"
                                          @submit="handleSubmit">
                                <template v-slot:result="{ result, props }">
                                    <li v-bind="props" class="autocomplete-result">
                                        <span>{{ result.title }}</span>
                                        <span class="snippet" v-html="result.snippet" />
                                    </li>
                                </template>
                            </autocomplete>
                        </div>
                        <input type="submit" value="搜尋" class="EJnewSearchbtn" v-on:click="search_submit()" />
                        <div class="EJnewSearchhotwords">
                            <a style="cursor: pointer;" v-for="(item,idx) in items"
                               :key="idx"
                               v-on:click="!item.href?search_submit(item.name):null"
                               :href="!!item.href?item.href:null">{{item.name}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="EJnewHeaderright">
                <a :title="AlternateText" :href="NavigateUrl">
                    <img :src="ImageUrl" :alt="ToolTip" />
                </a>
            </div>
        </div>
    </div>
</template>
<script>
Vue.use(Autocomplete);
const axios = require('axios');
module.exports = {
  created: function() {
    this.GetData();
  },
  data: function() {
    return {
      items: [],
      placeholder: "",
      searchkeyword: "",
      AlternateText: "",
      NavigateUrl: "",
      ImageUrl: "",
      ToolTip: "",
      Logo: "http://www.cdn-tkec.tw/image/UserFiles/img_ad/Prod/NewAD_1910310936408079.png"//靜態檔不須經過Redis
    };
  },
  methods: {
    GetData: function() {
      let self = this;
      $.ajax({
        url: "api/indexpage/popularSearches",
        type: "POST",
        dataType: "json",
        //async: false,
        success: function(data) {
          if (data && data.length){
            for (let i = 0; i < data.length; i++) {
              if (i == 0) {
                self.placeholder = data[i].name;
              } else if (i <= 9) {
                self.items.push(data[i]);
              }
            }
          }
        }
      });
      $.ajax({
        url: "api/indexpage/AD9",
        type: "POST",
        //async: false,
        dataType: "json",
        success: function(data) {
          self.AlternateText = data.AlternateText;
          self.NavigateUrl = data.NavigateUrl;
          self.ImageUrl = data.ImageUrl;
          self.ToolTip = data.ToolTip;
        }
      });
         //$.ajax({
        //url: "api/indexpage/ShowLogo",
        //type: "POST",
        //async: false,
        //dataType: "json",
        //success: function(data) {
          //self.Logo ="http://www.cdn-tkec.tw/image/UserFiles/img_ad/Prod/NewAD_1910310936408079.png";//靜態檔不須經過Redis

        //}
      //});
    },
    search_submit: function(name) {

      let url = "";
      if (name != undefined) {
         url = `/search.aspx?q=${name}&ec=idx-searchhot`;
         sendGaEvent('首頁_搜尋', 'click', '搜尋_熱門關鍵字_'+name);
      } else {


     if (this.searchkeyword != "")
     {
        url = `/search.aspx?q=${this.searchkeyword}&ec=idx-search`;
        sendGaEvent('首頁_搜尋', 'click', '搜尋_搜尋鍵_'+this.searchkeyword);
     }
     else
     {
          url = `/search.aspx?q=${this.placeholder}&ec=idx-search`;
          sendGaEvent('首頁_搜尋', 'click', '搜尋_搜尋鍵_'+this.placeholder);}
     }
      window.location.href = url;
    },
    search: function(input) {
      this.searchkeyword = input;

      //過濾注音
      let filter = false;
      for (var i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 0x3129 && input.charCodeAt(i) >= 0x3105) {
          filter = true;
          break;
        }
      }
      if (input.length < 1 || filter) {
        return [];
      }
     //搜尋結果優化 2019.11
     // return new Promise(resolve => {
     //   const _url = `/ashx/SearchAutoComplete.ashx?q=${encodeURI(
     //     input
     //   )}&limit=10`;
     //
     //   if (input.length < 1) {
     //     return resolve([]);
     //   }
     //   axios(_url, { method: "POST",responseType:'text' })
     //     .then(res => {
     //       let result = [];
     //       if (res.data != "") {
     //         let _data = res.data.split("\n");
     //         _data.forEach(row => {
     //           let _row = row.split("|");
     //           result.push({
     //             title: _row[0],
     //             snippet: `約${_row[1]}結果`
     //           });
     //         });
     //       }
     //       resolve(result);
     //     })
     //     .catch(function(err) {
     //       alert(err);
     //     });
     // });
     return [];
    },
    getResultValue: function(result) {
      return result.title;
    },
     GaLogo:function(){
          sendGaEvent('全站_LOGO', 'click', '全站LOGO');
       },
     handleSubmit:function(result){
      if (result != undefined)
      {
      this.searchkeyword = result.title;
      this.search_submit();
      }
        else
        {
           this.search_submit();
        }
    }
  }
};
</script>
<style>
    .snippet {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.54);
        float: right;
    }
</style>