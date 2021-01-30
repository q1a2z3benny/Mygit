<template>
  <div id="EJtkAiprodbox_root">
    <div class="EJtkAiprodbox" v-bind:key="index" v-for="(Aiprod,index) in prodbox_pt">
      <div class="EJtkAipro">
        <div class="EJtkAiprodtitle">
          <i></i>
          <span>{{Aiprod.hm_name}}</span>
        </div>
      </div>

      <div class="EJtkAiprodcontent">
        <ul>
          <li v-for="(pt,index) in AiprodLego(Aiprod)" :key="index">
            <a v-bind:href="GetPt(pt.HD_OrderNo,Aiprod.hm_sort)" v-on:click="Ga(Aiprod.hm_name,pt.HD_OrderNo)">
              <div class="top-iconbox" v-if="pt.discountPercent!=100 && pt.HMID_ShowDiscount == 1">
                <div class="top-iconinfo">{{GetDiscount(pt.discountPercent)}}折</div>
              </div>
              <img
                v-bind:src="pt.ProductImg"
                height="143"
                width="143"
                border="0"
                onerror="ImgError(this);"
              />
              <div class="tkAihot">{{pt.PROMOTETEXT}}</div>
              <div class="tkAititle">{{pt.productname}}</div>
              <div class="tkAiprice">
                <p v-if="pt.discountPercent != '100'">${{pt.nonmemberprice}}</p>
                <span class="tkAiredtext">${{pt.salePrice}}</span>
                <!-- <span v-else class="tkAiredtext">會員驚喜價</span> -->
                <i></i>
              </div>
            </a>
          </li>
        </ul>

        <div class="clearbox"></div>
        <div
          class="tkAiMorebtn"
          v-if="Aiprod.total>Aiprod.count"
          v-on:click="Aiprod.count += 10 ;GaShow(Aiprod.hm_name)"
        >看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  created: function() {
    this.GetData();
  },
  data: function() {
    return {
      prodbox_pt: []
    };
  },
  methods: {
    GetData: function() {
      let self = this;
      $.ajax({
        url: "api/indexpage/Aiprodbox",
        type: "POST",
        dataType: "json",
        //async:false,
        success: function(data) {
          data.forEach(function(obj) {
            obj.count = 10; //第一次顯示筆數
            obj.total = obj.Lego.length;
          });
          self.prodbox_pt = data;
        }
      });
    },
    GetDiscount: function(num) {
      return num.toString().replace("0", "");
    },
    GetPt: function(pid,sort) {
      let url = "pt.aspx?pid="+pid+"&ec=idx-happygoods"+sort;
      return url;
    },
    AiprodLego: function(data) {
      return data.Lego.filter(function(item, index) {
        if (index < data.count) return item;
      });
    },
      Ga:function(name,orderNo){
          sendGaEvent('首頁_樂高區_'+name+'', 'click', '樂高區_'+name+'_'+orderNo+'');
       },
     GaShow:function(name){
          sendGaEvent('首頁_樂高區_'+name+'', 'click', '樂高區_'+name+'_看更多');
       },
  }
};
</script>