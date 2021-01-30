<template>
    <div class="EJnewWrapperbox">

        <div class="EJnewWrapper1">

            <div class="EJnewWrapperlistbox">

                <ul class="listbox">

                    <li style class="EJnewAllmenu">

                        <a>

                            <i></i>全站分類

                        </a>

                    </li>

                    <li content="menu1">

                        <a>暢銷品牌 限時優惠</a>

                    </li>

                    <li content="menu2">

                        <a>筆記型電腦.APPLE</a>

                    </li>

                    <li content="menu3">

                        <a>主機.螢幕.零組件</a>

                    </li>

                    <li content="menu4">

                        <a>電腦週邊.辦公設備</a>

                    </li>

                    <li content="menu5">

                        <a>行動通訊.穿戴裝置</a>

                    </li>

                    <li content="menu6">

                        <a>休閒.攝影.車用</a>

                    </li>

                    <li content="menu7">

                        <a>電視.音響.遊戲</a>

                    </li>

                    <li content="menu8">

                        <a>大型家電.季節專區</a>

                    </li>

                    <li content="menu9">

                        <a>廚房.生活家電</a>

                    </li>

                    <li content="menu10">

                        <a>主題旗艦館</a>

                    </li>

                </ul>



            </div>

            <div v-for="(LeftMenus,index) in LeftMenu" v-html="LeftMenus.Htmlcode" :key="index"></div>

            <div class="EJnewWrapperbannerbox">

                <!-- 大B上文字廣告 -->
                <div class="bannertopbtngroup">
                    <ul v-if="SwiperADTopLink && SwiperADTopLink.length">
                        <li v-for="(item, idx) in SwiperADTopLink">
                            <a :href="item.href | addTrackCode('idx-nav' + (idx+1))" target="_blank">{{ item.text }}</a>
                        </li>
                    </ul>
                </div>

                <!-- Swiper START -->
                <div class="swiper-container swiper1">

                    <swiper v-if="BigBanner.length>0" class="swiper-wrapper" ref="swiperOption" :options="swiperOption">

                        <!-- メイン表示部分 -->
                        <!-- 各スライド -->

                        <swiper-slide v-bind:key="index" v-for="(swiperBanners,index) in BigBanner">

                            <div class="swiper-slide">

                                <a v-bind:href="GetBigBUrl(swiperBanners.website,index+1)" v-on:click="GaBigB(index+1)">

                                    <img v-bind:src="swiperBanners.imgurl" />

                                </a>

                            </div>

                        </swiper-slide>



                        <div class="swiper-button-prev" slot="button-prev"></div>

                        <div class="swiper-button-next" slot="button-next"></div>

                        <div class="swiper-pagination" slot="pagination"></div>

                    </swiper>

                </div>

                <!-- Swiper END -->

            </div>



            <div class="EJnewWrapperdayhotbox">

                <div class="EJnewWrapperdayhottitle">

                    <a>今日最強檔</a>

                </div>

                <div class="EJnewWrapperdayhottime">

                    <p>

                        剩餘時間

                        <span class="timebgbox">
                            <countdown :time="time" :interval="1000" :counting="true">
                                <template v-slot="props">
                                    <span class="timebg">{{ Chktime(props.hours) }}</span>:
                                    <span class="timebg">{{ Chktime(props.minutes) }}</span>:
                                    <span class="timebg">{{ Chktime(props.seconds) }}</span>
                                </template>

                            </countdown>
                        </span>

                    </p>

                </div>



                <div class="EJnewWrapperdayhotprod" v-for="(TodayHots,index) in TodayHot" :key="index">

                    <a v-bind:href="GetUrl(TodayHots.href)" v-on:click="Ga(TodayHots.id)">

                        <div v-if="TodayHots.discountPercent !='100'" class="top-iconbox">

                            <div class="top-iconinfo">{{TodayHots.discountPercent}}折</div>

                        </div>

                        <div class="top-iconbox2">

                            <div class="top-iconinfo2">剩{{TodayHots.Quantity}}組</div>

                        </div>



                        <img v-bind:src="TodayHots.prodImg" height="143" width="143" border="0" onerror="ImgError(this);" />

                        <div class="dayhothot">

                            <span>{{TodayHots.promote}}</span>

                        </div>

                        <div class="dayhottitle">

                            <p>{{TodayHots.productName}}</p>

                        </div>

                        <div class="dayhotprice">

                            <p v-if="TodayHots.discountPercent !='100'">${{TodayHots.price}}</p>

                            <span class="dayhotredtext">${{TodayHots.realprice}}</span>



                        </div>

                    </a>

                </div>

            </div>

        </div>

    </div>
</template>
<script>
Vue.use(VueAwesomeSwiper);
Vue.component(VueCountdown.name, VueCountdown);
module.exports = {
    created: function () {
        this.GetData();
        this.GetSwiperADTopLinkData();
        this.GetMenuData();
        this.GetTodayHotData();

    },
    mounted: function () {

    },
    data: function() {
        var now = new Date();
        var newDate = new Date(now.getFullYear() , now.getFullYear(), now.getDate() + 1);
        return {
            BigBanner: [],
            SwiperADTopLink:[],
            LeftMenu: [],
            TodayHot: [],
            swiperOption: {
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: true,
                    disableOnInteraction: false,
                    reverseDirection: false
                },
                loop:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            counting: true,
            time: newDate - now,
        };
    },
    filters: {
        addTrackCode: function (val, trackCode) {
            if (!val || !trackCode) return val;
            return val + (val.indexOf('?') >= 0 ? '&' : '?') + 'ec=' + trackCode;
        }
    },
    methods: {
        GetData: function () {
            let self = this;
            $.ajax({
                url: "api/AD/SwiperAD",
                type: "POST",
                dataType: "json",
                success: function(data) {
                    self.BigBanner = data;
                }
            });
        },
        GetSwiperADTopLinkData: function () {
            let self = this;
            $.ajax({
                url: "api/AD/SwiperADTopLink",
                type: "POST",
                dataType: "json",
                success: function(data) {
                    if (!data || !data.length) return;

                    self.SwiperADTopLink = data.sort(function(a,b){
                        return a.sort < b.sort ? -1 : 0;
                    }).slice(0,5);
                }
            });
        },
        GetMenuData: function () {
            let self = this;
            $.ajax({
                url: "api/indexpage/LeftMenu",
                type: "POST",
                dataType: "json",
                success: function(data) {
                    self.LeftMenu = data;
                        const s = document.createElement('script');
                        s.type = 'text/javascript';
                        s.src = 'js/main_new.js';
                        document.body.appendChild(s);
                }
            });
        },
        GetTodayHotData: function () {
            let self = this;
            $.ajax({
                url: "api/indexpage/TodayHot",
                type: "POST",
                dataType: "json",
                success: function(data) {
                    self.TodayHot = data;
                }
            });
        },
           GetUrl: function(href) {
            let url = href+"&ec=idx-top1";
            return url;
          },
        GetBigBUrl: function(href,item) {
          let url

           //錨點問題解決
          if (href == "") href = "#";
           var myURL = new URL(href);
           if(href != undefined && href.indexOf('?')>-1)
           {
               url= href.replace(myURL.hash,'')+"&ec=idx-b"+item+myURL.hash;
           }
           else
           {
               url= href.replace(myURL.hash,'')+"?ec=idx-b"+item+myURL.hash;
           }

            return url;
          },

          Chktime: function (number) {
          var result=number.toString();

          if (result.length<2)
                result="0"+result.toString();

           return result;
        },
         Ga:function(orderNo){
          sendGaEvent('首頁_今日最強檔', 'click', '今日最強檔_'+orderNo+'');
       },
         GaBigB:function(index){
          sendGaEvent('首頁_大B', 'click', '首頁_大B'+index);
        },

    }

};
</script>


