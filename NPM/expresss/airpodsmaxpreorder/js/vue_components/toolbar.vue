<template>
    <div class="EJtoolBarbox">
        <div class="EJtoolBar">
            <div class="EJtoolBarleft">
                <ul>
                    <li v-if="userinfo.showMapGroup == undefined || userinfo.showMapGroup === true" class="EJmapGroup">
                        <a href="#">
                            <span>{{ area_name }}</span>
                            <img class="icon2"
                                 src="/images/icons/map-12.svg" />
                        </a>
                        <div id="EJmapGroupbox" class="EJmapGroupbox">
                            <div class="mapGrouptitle">
                                <p>
                                    當前門市
                                </p>
                            </div>
                            <div class="mapGroupinfo">
                                <div class="map1">
                                    <select v-model="sel_area" v-on:change="onAreaChange();GetStoreList($event.target.value)" onfocus="this.size=5;" onblur="this.size=1;" onchange="this.size=1;">
                                        <option value="">請選擇區域</option>
                                        <option v-for="(area,idx) in area_lists" v-bind:value="area.value" :key="idx">
                                            {{ area.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="map2">
                                    <select v-model="sel_store" onfocus="this.size=5;" onblur="this.size=1;" onchange="this.size=1;">
                                        <option value="">請選擇門市</option>
                                        <option v-for="(store,idx) in store_list" v-bind:value="store.Stroe_ID" :key="idx">
                                            {{ store.STORE_Info }}
                                        </option>
                                    </select>
                                </div>
                                <div class="map2" v-if="this.$props.userinfo.login">
                                    <p style="font-size:14px">
                                        <input ID="chkSaveFav" type="checkbox" checked="checked" />
                                        設為最愛門市
                                    </p>
                                </div>
                                <div class="map4">
                                    <div class="map4Btnbox">
                                        <input type="button" value="確定" class="map4Btnbox_yellow" v-on:click="SetMyFavStore();" />
                                        <input type="button" value="使用我的最愛門市" class="map4Btnbox_yellow Mgnleft" v-on:click="LoadMyFavStore();" v-if="this.$props.userinfo.login" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-if="userinfo.showMapGroup == undefined || userinfo.showMapGroup === true" class="EJmapGroup2">
                        <div class="toolBaricon2"></div>
                        <p>{{ store_name }}</p>
                    </li>
                </ul>
            </div>
            <div class="EJtoolBarright">
                <ul>
                    <li class="car">
                        <a :href="ShopCartConts.href">
                            <span v-if="userinfo.login === true">{{ShopCartConts.name}}</span>
                            <!-- <span>(87)</span> -->
                        </a>
                    </li>
                    <li class="center">
                        <a>
                            <span>會員中心</span>
                            <div class="toolBaricon4"></div>
                        </a>
                        <div class="EJtoolBarlistbox-center">
                            <ul>
                                <li>
                                    <a href="/member/maintain_memberdata.aspx?ec=idx-membermaintain" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_資料維護');">資料維護</a>
                                </li>
                                <li>
                                    <a href="https://events.tk3c.com/events_net/events_net/201506_backhome/index1.html?ec=idx-memberback" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_會員回娘家');">會員回娘家</a>
                                </li>
                                <li>
                                    <a href="/member/official_card_member_add.aspx?ec=idx-membercard" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_會員開卡');">會員開卡</a>
                                </li>
                                <li>
                                    <a href="/edmlist.aspx?ec=idx-memberedm" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_電子報');">電子報</a>
                                </li>
                                <li>
                                    <a href="/service/serviceindex.aspx?ec=idx-memberservice" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_客服中心');">客服中心</a>
                                </li>
                                <li>
                                    <a href="/member/member_center.aspx?ec=idx-memberoverview" onclick="sendGaEvent('首頁_會員中心', 'click', '會員中心_功能總覽');">功能總覽</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="mytk">
                        <a>
                            <span>我的燦坤</span>
                            <div class="toolBaricon3"></div>
                        </a>
                        <div class="EJtoolBarlistbox-myTk">
                            <ul>
                                <li>
                                    <a href="/checkout/order_index_new.aspx?parm=order&ec=idx-mytkorder" onclick="sendGaEvent('首頁_我的燦坤', 'click', '我的燦坤_訂單查詢');">訂單查詢</a>
                                </li>
                                <li>
                                    <a href="/member/BuyGold.aspx?ec=idx-mytkpoint" onclick="sendGaEvent('首頁_我的燦坤', 'click', '我的燦坤_購物金查詢');">購物金查詢</a>
                                </li>
                                <li>
                                    <a href="/member/BrandCard.aspx?ec=idx-mytkcash" onclick="sendGaEvent('首頁_我的燦坤', 'click', '我的燦坤_還元金查詢');">還元金查詢</a>
                                </li>
                                <li>
                                    <a href="/member/member_coupon.aspx?ec=idx-mytkcoupon" onclick="sendGaEvent('首頁_我的燦坤', 'click', '我的燦坤_折價券查詢');">折價券查詢</a>
                                </li>
                                <li>
                                    <a href="/member/member_cashcoupon.aspx?ec=idx-mytkcashcoupon" onclick="sendGaEvent('首頁_我的燦坤', 'click', '我的燦坤_現金折抵券查詢');">現金折抵券查詢</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="login">
                        <a v-if="userinfo.login === false" :href="loginurl" onclick="sendGaEvent('首頁_登入/註冊', 'click', '首頁_登入/註冊');">登入/註冊</a>
                        <a v-if="userinfo.login === true" :href="logouturl">
                            <p>{{username}}</p>
                            <font>您好！/登出</font>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clearbox"></div>
    </div>
</template>
<script>
    module.exports = {
        mounted: function() {
            this.getData();
        },
        props: {
            userinfo: {
                login: Boolean,
                email: String,
                favkey:String,
                favzone: String,
                favarea: String,
                favstore: String
            }
        },
        data: function() {
            return {
                loginurl: "/member/member_login.aspx?ec=idx-login",
                logouturl: "/member/member_logout.aspx",
                username: "",
                ShopCartConts: {
                    name: "",
                    href: "#"
                },
                //------------------------------------------
                sel_area: '',   //區域選單值
                sel_store: '',  //門市選單值
                area_lists: {   //區域列表
                    '20': { value: "20", name: "北市,基隆",data:"" },
                    '22': { value: "22", name: "新北市"   ,data:"" },
                    '30': { value: "30", name: "桃竹苗區" ,data:"" },
                    '40': { value: "40", name: "中彰投區" ,data:"" },
                    '50': { value: "50", name: "雲嘉南區" ,data:"" },
                    '52': { value: "52", name: "高屏區"   ,data:"" },
                    '60': { value: "60", name: "宜花東區" ,data:"" },
                    '98': { value: "98", name: "金門地區" ,data:"" },
                    '99': { value: "99", name: "澎湖地區" ,data:"" }
                },
                store_list: '',   //門市列表
                store_name:'',  //區域名稱
                area_name:'最愛門市',   //門市名稱
                virtual_zone:''        //虛擬區代號
                //------------------------------------------
            };
        },
        methods: {
            getData: function() {
                this.username = this.$props.userinfo.email.split("@")[0];
                if(this.$props.userinfo.showMapGroup == undefined || this.$props.userinfo.showMapGroup === true){
                    this.virtual_zone = this.$props.userinfo.favzone;
                    if (this.$props.userinfo.login) {
                        let self = this;
                        this.virtual_zone = this.$props.userinfo.favzone;
                        this.LoadMyFavStore();
                        axios("/api/indexpage/ShopCartConts", { method: "POST",responseType:'json' })
                        .then(function(response)  {
                            self.ShopCartConts = response.data;
                        })
                        .catch(function(err) {
                            alert(err);
                        });
                    }
                }
            }

            //門市選單
            , GetStoreList: function(value) {
                let self = this;
                this.area_name=this.area_lists[this.sel_area].name;
                if(self.area_lists[value].data === "")   //該區門市列表未曾讀取過
                    axios("/api/indexpage/storelist?area="+value, { method: "POST",responseType:'json' })
                    .then(function(res)  {
                        self.store_list = res.data;
                        self.area_lists[value].data = res.data;   //自後端取得門市列表後，儲存於前端
                    })
                    .finally(function(){
                        self.getStoreName();
                    })
                else   //該區門市列表已經讀取過，由前端直接取出即可
                {
                    self.store_list = self.area_lists[value].data;
                    self.getStoreName();
                }
            }

            //變更區域之後，reset門市選單和虛擬區代號
            , onAreaChange: function() {
                // reset!
                if(this.sel_area==="")
                {
                    this.area_name = '最愛門市'; //最愛區域
                    this.store_list = '';
                }
                this.sel_store = '';
                this.store_name = ''; //最愛門市
                this.virtual_zone = '';
            }

            //取得門市資料＆變更門市排行區塊資料
            ,getStoreName: function() {
                let self = this;
                for (var i = 0; i < self.store_list.length; i++){
                    if(self.sel_store===self.store_list[i].Stroe_ID)
                    {
                        self.store_name=self.store_list[i].STORE_Name;
                        self.virtual_zone=self.store_list[i].virtual_Zone;
                        self.$emit('area', self.virtual_zone);  //變更門市排行區塊資料
                    }
                }
            }

            //儲存最愛門市
            , SetMyFavStore: function() {
                document.getElementById("EJmapGroupbox").style.display="none"; //關閉最愛門市區塊(強制不顯示)
                let self=this;
                self.getStoreName();
                if(document.getElementById("chkSaveFav") != null)   //「設為最愛門市」有存在
                {
                    if(document.getElementById("chkSaveFav").checked)   //勾選「設為最愛門市」CheckBox
                    {
                        if(this.sel_store=="")
                        {
                            alert("未設定最愛門市");
                        }
                        else
                        {
                            axios( "/api/indexpage/SetFavStore?favkey="+this.$props.userinfo.favkey+"&FavStore="+this.sel_store,
                                { method: "POST",responseType:'text' })
                            .then(function(res)  {                                
                                if (res.data == "ok")
                                    {
                                        alert("最愛門市設定成功");
                                        self.$props.userinfo.favzone=self.virtual_zone;
                                        self.$props.userinfo.favarea=self.sel_area;
                                        self.$props.userinfo.favstore=self.sel_store;
                                    }
                                    else
                                    {
                                        alert("最愛門市設定失敗，請嘗試由會員資料中設定");
                                    }
                            })
                            .catch(function(e){
                                console.log(e);
                                alert("最愛門市設定失敗，請嘗試由會員資料中設定");
                            })
                        }
                    }
                }
                setTimeout(()=>  {document.getElementById("EJmapGroupbox").style.display="";} , 100); //恢復最愛門市區塊預設顯示模式
            }

            //使用我的最愛門市
            , LoadMyFavStore: function() {
                document.getElementById("EJmapGroupbox").style.display="none"; //關閉最愛門市區塊(強制不顯示)
                if(this.$props.userinfo.login)    //是否有登入
                {
                    var myFavArea=this.$props.userinfo.favarea;
                    var myFavStore=this.$props.userinfo.favstore;

                    //重設區域值會執行GetStoreList，該程序執行完成之後，就會執行getStoreName，所以門市代號早於區域設定較合理

                    //門市不同
                    if(myFavStore !== this.sel_store)
                    {
                        this.sel_store = myFavStore;
                        let self=this;
                        self.getStoreName();
                    }

                    //區域不同reload StoreList
                    if(myFavArea !== this.sel_area)
                    {
                        this.sel_area = myFavArea;
                        this.GetStoreList(myFavArea);
                    }
                }
                setTimeout(()=>  {document.getElementById("EJmapGroupbox").style.display="";} , 100); //恢復最愛門市區塊預設顯示模式
            }
        }
    };

</script>