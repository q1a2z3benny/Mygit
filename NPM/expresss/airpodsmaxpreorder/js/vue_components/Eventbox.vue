<template>
    <div class="EJnewEventbox">
        <div class="EJnewEventEvent">
            <div class="EJnewEventEventleft">
                <div class="eventtitle eventLefttitle ">
                    <a>燦坤服務+</a>

                    <div class="eventrightMorebtn">
                        <a href="https://events.tk3c.com/events_net/repair/index.html?ec=idx-servicemore" onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_看更多');">more</a>
                    </div>
                </div>

                <div class="EJtkServicebox">
                    <ul>
                        <li>
                            <a href="/mobile/mob_appointment_page.aspx?BookType=type1&ec=idx-airclean"
                               onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_冷氣清潔');">
                                <img src="images/icons/clearhome.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">冷氣清潔</div>
                            </a>
                        </li>

                        <li>
                            <a href="https://events.tk3c.com/events_net/corporate/index.html?ec=idx-Redemption" onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_提貨券');">
                                <img src="images/icons/coupon-45.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />
                                <div class="tkServicettitle">企業客戶</div>
                              <!--href="/mobile/mob_appointment_page.aspx?BookType=type3&ec=idx-airfix" onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_冷氣維修');"-->
                                <!--src="images/icons/airmaintain.png"-->
                                <!--<div class="tkServicettitle">冷氣維修</div>-->
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/mob_appointment_page.aspx?BookType=type2&ec=idx-airservice" onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_空調場勘');">
                                <img src="images/icons/airlook.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">空調場勘</div>
                            </a>
                        </li>
                        <li>
                            <a href="https://events.tk3c.com/events_net/apple_service/reservation.aspx?ec=idx-appleservice"
                               onclick="sendGaEvent('首頁_燦坤服務', 'click', '燦坤服務_蘋果維修');">
                                <img src="images/icons/iosmaintain.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">蘋果維修</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="clearbox"></div>

                <div class="eventtitle ">
                    <a>燦坤開箱</a>
                </div>
                <div class="EJtkServicebox1">
                    <ul>
                        <li>
                            <a href="https://events.tk3c.com/events_net/kuai3tv/index.aspx?ec=idx-video"
                               onclick="sendGaEvent('首頁_燦坤開箱', 'click', '燦坤開箱_影音頻道');">
                                <img src="images/icons/video.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">影音頻道</div>
                            </a>
                        </li>

                        <li>
                            <a href="http://blog.tkec.com.tw?ec=idx-blog" onclick="sendGaEvent('首頁_燦坤開箱', 'click', '燦坤開箱_開箱文');">
                                <img src="images/icons/open.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">開箱文</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="EJnewEventcontent">
                <div class="EJnewEventcontentlistbox">
                    <div class="EJnewEventcontentlist">
                        <ul>
                            <li v-for="(Event,index) in EJnewEventcontent" :key="index">
                                <a v-bind:data-name="TabName(index+1)" :class="{ active: index==0 }">{{Event.title}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="EJnewEventcontentprodbox">
                        <div v-bind:id="TabNameID(index+1)"
                             v-bind:class="{ selected: index==0 , EJnewEventcontentprodnight: Event.img2 !==null, EJnewEventcontentprod: Event.img2 ===null}"
                             v-for="(Event,index) in EJnewEventcontent"
                             :key="index">
                            <ul v-if="Event.img2 ===null">
                                <li v-for="(product,index2) in Event.product" :key="index">
                                    <a v-bind:href="GetTopUrl(product.href,index+1,Event.Rranking,Event.HMID_Name)" v-on:click="Ga(Event.title,product.id,Event.Rranking,Event.HMID_Name)">
                                        <div class="card-iconboxEven">
                                            <div class="card-iconinfo">
                                                <i></i>
                                            </div>
                                            <div class="card-iconinfoEven-num">{{index2+1}}</div>
                                        </div>

                                        <img v-bind:src="product.prodImg"
                                             height="143"
                                             width="143"
                                             border="0"
                                             onerror="ImgError(this);" />
                                        <div class="newEventhot">{{product.promote}}</div>
                                        <div class="newEventtitle">{{product.productName}}</div>
                                        <div class="hotEventprice">
                                            <span class="newEventredPricetext">${{product.realprice}}</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <a v-bind:href="GetCatUrl(Event.product[0].href)"
                               v-on:click="Cat(Event.title)"
                               v-if="Event.img2 !==null &&  CheckTime =='true' ">
                                <img v-bind:src="Event.img2" />
                            </a>
                            <img v-bind:src="Event.img" v-if="Event.img !==null &&  CheckTime =='false' " />
                        </div>
                    </div>
                </div>
            </div>

            <div class="EJnewEventEventright">
                <div class="eventtitle eventRighttitle">
                    <a>銀行活動</a>

                    <div class="eventrightMorebtn">
                        <a v-bind:href="GetBankUrl(BankEvent.urlmore)" onclick="sendGaEvent('首頁_銀行活動', 'click', '銀行活動');">more</a>
                    
                    </div>
                </div>
                <div class="eventrightContent">
                    <a v-bind:href="GetBankUrl(BankEvent.url)" onclick="sendGaEvent('首頁_銀行活動', 'click', '銀行活動');">
                        <img v-bind:src="BankEvent.img" />
                    </a>
                </div>

                <div class="eventtitle ">
                    <a>網路會員</a>
                </div>
                <div class="eventrightContent3">
                    <a v-bind:href="GetUrl(MemberEvent.url)" onclick="sendGaEvent('首頁_網路會員', 'click', '網路會員_入會限定');">
                        <img v-bind:src="MemberEvent.img" />
                    </a>
                </div>
                <div class="eventeECmember">
                    <ul>
                        <li>
                            <a href="/member/member_coupon.aspx?ec=idx-coupon" onclick="sendGaEvent('首頁_網路會員', 'click', '網路會員_折價券');">
                                <img src="images/icons/coupon.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />

                                <div class="tkServicettitle">折價券</div>
                            </a>
                        </li>

                        <li>
                            <a href="http://www.tk3c.com/publishindex.aspx?CID=201&ec=idx-storeinfo" onclick="sendGaEvent('首頁_網路會員', 'click', '網路會員_新手攻略');">
                                <!--https://events.tk3c.com/events_net/2019raiderspage/index.aspx?ec=idx-guide-->
                                <img src="https://www.tk3c.com/images/icons/PC_Icon_10.png"
                                     height="143"
                                     width="143"
                                     border="0"
                                     onerror="ImgError(this);" />
                                <!--src="https://www.tk3c.com/images/icons/pc-newhand.png"-->
                                <div class="tkServicettitle">門市快訊</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
Vue.prototype.jquery = function(id) {
  return document.getElementById(id);
};
module.exports = {
    props: {
    sort:"",
    area: "",
    userinfo: {
      login: Boolean,
      email: String,
      favkey: String,
      favzone: String,
      favarea: String,
      favstore: String
    }
  },
  created: function() {
    this.GetData("");
    this.ChkTime();
    this.GetMemberData();
    this.GetBankData();
  },
  updated: function ()  {
    this.Tabselect();
  },
    watch:{
    area:function(val){
    this.GetData(val);
    }
    },
  methods: {
     Ga:function(name,orderno,Rranking,HMID_Name){
    if(Rranking==='否')
    {
      sendGaEvent('首頁_主題強品_'+name, 'click', '主題強品_'+name+'_'+ orderno);
    }
    else
    {
     sendGaEvent('首頁_主題強品_'+name+'-'+HMID_Name, 'click', '主題強品_'+name+'-'+HMID_Name+'_'+ orderno);
    }

    },
    Cat:function(name){
      sendGaEvent('首頁_主題強品_'+name+'', 'click', '主題強品_'+name+'');
    },
     GetUrl: function(href) {
            let url = href+"?ec=idx-ecmember";
            return url;
          },
     GetCatUrl: function(href) {
       let url
           if(href != undefined && href.indexOf('?')>-1)
           {
               url= href+"&ec=idx-night";
           }
           else
           {
               url= href+"?ec=idx-night";
           }

          return url;
       },
     GetTopUrl: function(href,sort,Rranking,HMID_Name) {
           let url
             if(Rranking==='否')
             {
                if(href != undefined && href.indexOf('?')>-1)
                  {
                      url= href+"&ec=idx-top"+sort+"-gooods";
                  }
                  else
                  {
                      url= href+"?ec=idx-top"+sort+"-gooods";
                  }
             }
             else
             {
                 let num;
                 switch (HMID_Name) {
                   case '北':
                       num = "1";
                       break;
                   case '中':
                       num = "2";
                       break;
                   case '南':
                       num = "3";
                       break;
                 }

              if(href != undefined && href.indexOf('?')>-1)
                  {
                      url= href+"&ec=idx-top"+sort+"-gooods-s"+num;
                  }
                  else
                  {
                      url= href+"?ec=idx-top"+sort+"-gooods-s"+num;
                  }
             }
          return url;
       },
      GetBankUrl: function(href) {
          let url
           if(href != undefined && href.indexOf('?')>-1)
           {
               url= href+"&ec=idx-bankevents";
           }
           else
           {
               url= href+"?ec=idx-bankevents";
           }
          return url;
       },
    TabName: function(index) {
      var result = "";
      result = "#tab0" + index;
      return result;
    },
    TabNameID: function(index) {
      var result = "";
      result = "tab0" + index;
      return result;
    },
    GetData: function(val) {
        let self = this;
        if(val==="")
            val=this.$props.userinfo.favzone;
        $.ajax({
            url: "api/indexpage/eventbox?area="+val,
            type: "POST",
            dataType: "json",
            //async: false,
            success: function(data) {
                for ( i=0;i<data.length;i++)
                {
                    if (data[i].title=="門市排行")
                    {
                        console.log("block " + i + " img");
                        data[i].img=null;
                    }
                }
            self.EJnewEventcontent = data;
            }
        });
    },
    GetMemberData: function() {
      let self = this;
      $.ajax({
        url: "api/ad/banner",
        type: "POST",
        data: { index: 6 },
        dataType: "json",
        //async: false,
        success: function(data) {
          self.MemberEvent = data;
        }
      });
    },
    GetBankData: function() {
      let self = this;
      $.ajax({
        url: "api/ad/BankBanner",
        type: "POST",
        //data: { index: 6 },
        dataType: "json",
        //async: false,
        success: function(data) {
          self.BankEvent = data;
        }
      });
    },
    ChkTime: function() {
      var myDate = new Date();

      var chkStartTime= new Date();
      chkStartTime.setHours(7);
      chkStartTime.setMinutes(0);
      chkStartTime.setSeconds(0);

      var chkEndTime= new Date();
      chkEndTime.setHours(22);
      chkEndTime.setMinutes(0);
      chkEndTime.setSeconds(0);

      //myDate.setHours(6);
      //myDate.setMinutes(59);

      console.log("n -> " + myDate);
      console.log("s -> " + chkStartTime);
      console.log("s-n -> " + (chkStartTime-myDate));
      console.log("e -> " + chkEndTime);
      console.log("e-n -> " + (myDate-chkEndTime));
      console.log((chkStartTime-myDate) > 0 || (myDate-chkEndTime) > 0);

      if ((chkStartTime-myDate) > 0 || (myDate-chkEndTime) > 0) {
        this.CheckTime = "true";
        console.log("open");
        } else {
          this.CheckTime = "false";
          console.log("close");
      }
  },
    Tabselect: function() {

        $(".EJnewEventcontentlist a").hover(function(event) {
          event.preventDefault();
          console.log(event.target.dataset.name);
          $(this)
            .addClass("active")
            .parent()
            .siblings()
            .find("a")
            .removeClass("active");
          $(event.target.dataset.name)
            .addClass("selected")
            .siblings()
            .removeClass("selected");
        });

    }
  },

  data: function() {
    return {
      EJnewEventcontent: [],
      CheckTime: "",
      MemberEvent: [],
      BankEvent:[]
    };
  },

};
</script>