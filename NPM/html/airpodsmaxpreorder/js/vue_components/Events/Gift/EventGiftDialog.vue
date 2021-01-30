<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content" v-for="(EventMain,indexI) in eventGiftData" :key="indexI">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{EventMain.EventName}}
            <br />
            <small>你目前累積消費金額為：{{UserData.MaxPoint}}</small>
            <br />
            <small>剩餘兌換金額為：{{UserData.RemainingPoint}}</small>
            <div v-if="RegisteredList.length > 0" class="badge-area">
              已為您登記：
              <br class="d-md-none" />
              <p v-for="(list,idx) in RegisteredList" :key="idx" class="gift-number mb-1 mr-1">
                {{list.Name}}
                <span class="badge badge-light">{{list.Amount}}</span>
              </p>
            </div>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="accordion-gift">
          <select
            class="form-control mb-4 date-select"
            v-if="EventMain.CalcType == 0"
            @change="DateSelectChg"
            v-model="orderdate"
          >
            <option value>查看各日累計消費金額</option>
            <option
              v-for="indexDate in EventMain.DateList"
              :key="indexDate"
              :label="indexDate"
              :value="indexDate"
            ></option>
          </select>
          <div v-for="(EventGroup,indexJ) in EventMain.EventGroupList" :key="indexJ">
            <a
              id="collapse-btn-one"
              :class="indexJ==0?'btn btn-light collapse-btn mb-4 text-left':'btn btn-light collapse-btn mb-4 text-left collapsed'"
              data-toggle="collapse"
              :data-target="'#collapse'+indexJ"
              aria-expanded="false"
              :aria-controls="'collapse'+indexJ"
            >
              <span class="fa fa-plus float-right" style="line-height: 1.5em"></span>
              <b class="fa fa-minus float-right"></b>
              {{EventGroup.GroupName}}
            </a>
            <div
              :id="'collapse' + indexJ"
              :class="indexJ==0? 'row collapse show':'row collapse'"
              data-parent="#accordion-gift"
            >
              <div
                class="col-lg-4 col-md-6 col-xs-12 col-sm-6 mb-4"
                v-for="(GiftList,indexK) in EventGroup.GiftList"
                :key="indexK"
              >
                <div class="card h-100">
                  <img
                    v-bind:src="'https://www.cdn-tkec.tw/'+GiftList.IMG"
                    class="card-img-top"
                    v-bind:alt="GiftList.Pname"
                  />
                  <div class="card-body h-100">
                    <h5 v-html="GiftList.Pname"></h5>
                    <h5 v-html="GiftList.Description"></h5>
                  </div>
                  <div class="card-body pt-1 pb-1">
                    <h6>商品兌換點數：{{EventGroup.MinConsumption}}</h6>
                    <h6 v-if="GiftList.Remainingamount>0">剩餘兌換數量{{GiftList.Remainingamount}}</h6>
                    <h6 v-if="GiftList.Remainingamount<0">剩餘兌換數量0</h6>
                  </div>
                  <div class="card-footer">
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">請選擇您要的數量</label>
                      <select
                        class="form-control form-control-sm"
                        :id="GiftList.PID"
                        :point="EventGroup.MinConsumption"
                        :groupid="EventGroup.GroupID"
                        :reserve="GiftList.Remainingamount"
                        @change="selectChg"
                      >
                        <option
                          :key="indexL"
                          v-for="indexL in GiftList.MaxRedeem+1"
                          :value="indexL-1"
                          :selected="PreSelect(EventGroup.GroupID,GiftList.PID,indexL-1)"
                        >{{indexL-1}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alert alert-danger text-center" role="alert" v-if="NotEnough==true">金額未達門檻</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" v-on:click="Submit()">登記</button>
        </div>
      </div>
    </div>
    <!-- loading -->
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>
<script>
module.exports = {
  components: {
    loading: httpVueLoader("../../Loading/index.vue")
  },
  inject: ["eventHub"],
  props: {
    userinfo: {
      login: Boolean,
      email: String,
      member: String,
      uuid: String,
      token: String
    }
  },
  created: function() {},
  data: function() {
    return {
      eventGiftData: {
        EventID: Number,
        EventName: String,
        CalcType: Number,
        SDate: String,
        EDate: String,
        DateList: [],
        MinConsumption: null,
        EventGroupList: [
          {
            GroupID: Number,
            GroupName: String,
            MaxConsumption: Number,
            MinConsumption: Number,
            GiftList: [
              {
                GroupID: Number,
                PID: String,
                Pname: String,
                Totalamount: Number,
                Remainingamount: Number,
                MaxRedeem: Number,
                Description: String
              }
            ]
          }
        ]
      },
      UserData: {
        Member: String,
        MaxPoint: 0,
        RemainingPoint: 0,
        EventID: Number,
        GiftList: []
      },
      NotEnough: false,
      orderdate: "",
      isLoading: true,
      RegisteredList: []
    };
  },
  mounted() {
    this.GetData();
  },
  methods: {
    GetData: function() {
      this.eventHub.$on("eventid", eventid => {
        this.RegisteredList = [];
        this.UserData = {};
        this.UserData.EventID = eventid;
        let promise = new Promise((resolve, reject) => {
          this.GetEventGiftList(eventid)
            .then(res => {
              this.orderdate = "";
              this.eventGiftData = res.data;
              let checkMember = this.CheckMemberType();
              if (checkMember.status == false) {
                alert(checkMember.msg);
                return;
              }
              //找出最低額度
              this.eventGiftData[0].MinConsumption = null;
              this.eventGiftData[0].EventGroupList.forEach(element => {
                if (
                  this.eventGiftData[0].MinConsumption == null ||
                  this.eventGiftData[0].MinConsumption > element.MinConsumption
                ) {
                  this.eventGiftData[0].MinConsumption = element.MinConsumption;
                }
              });
              resolve(res);
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              $("#myModal").on("shown.bs.modal", function() {
                $("#myInput").trigger("focus");
              });

              $("#accordion-gift").on("shown.bs.collapse", function() {
                $(".collapse-btn").not(".collapsed")[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
              });
              this.isLoading = false;
            });
        });
        promise.then(res => {
          //單日兌換如果超過計算日會return
          if (res.data[0].CalcType == 0) {
            let today = new Date();
            let endDate = new Date(res.data[0].ENDCALCDATE.split(" ")[0]);
            let startDate = new Date(res.data[0].STARTCALCDATE.split(" ")[0]);
            if (today > endDate) {
              this.orderdate = "";
              return;
            } else if (today < startDate) {
              this.orderdate = "";
            } else {
              this.orderdate = today
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");
            }
          } else this.orderdate = "";

          this.GetEventGiftSubmitData(eventid, this.orderdate)
            .then(res => {
              this.UserData = res.data;
              if (
                this.UserData.RemainingPoint <
                this.eventGiftData[0].MinConsumption
              ) {
                this.NotEnough = true;
              } else {
                this.NotEnough = false;
              }
              this.RegisteredList = this.GetRegisteredList(
                this.UserData.GiftList
              );
              return;
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    },
    selectChg: function(e) {
      //剩餘點數判斷
      let _selectGift = this.UserData.GiftList.filter(function(item) {
        return (
          item.PID.toString() + item.GroupID.toString() ==
          e.currentTarget.id.toString() +
            e.target.getAttribute("groupid").toString()
        );
      });
      //檢查存量
      let diff = e.target.options.selectedIndex;
      if (
        _selectGift.length > 0 &&
        _selectGift[0].Amount < e.target.options.selectedIndex
      ) {
        diff = Math.abs(e.target.options.selectedIndex - _selectGift[0].Amount);
      }
      if (e.target.getAttribute("reserve") < diff) {
        alert("剩餘兌換數量不足");
        if (_selectGift[0] == undefined) {
          e.target.options.selectedIndex = 0;
        } else {
          e.target.options.selectedIndex = _selectGift[0].Amount;
        }
        return;
      }

      //數量往上增加才執行
      if (
        _selectGift.length == 0 ||
        _selectGift[0].Amount < e.target.options.selectedIndex
      ) {
        let add = e.target.options.selectedIndex;
        if (_selectGift[0] != undefined) {
          add = Math.abs(
            e.target.options.selectedIndex - _selectGift[0].Amount
          );
        }
        if (
          this.UserData.RemainingPoint <
          e.target.getAttribute("point") * add
        ) {
          alert("剩餘兌換金額不足");
          if (_selectGift[0] == undefined) {
            e.target.options.selectedIndex = 0;
          } else {
            e.target.options.selectedIndex = _selectGift[0].Amount;
          }
          return;
        }
      }

      if (this.UserData != null) {
        //remove已存在gift
        let _giftlist = this.UserData.GiftList.filter(function(item) {
          return (
            item.PID.toString() + item.GroupID.toString() !=
            e.currentTarget.id.toString() +
              e.target.getAttribute("groupid").toString()
          );
        });
        this.UserData.GiftList = _giftlist;
        //add gift
        if (e.target.options.selectedIndex * 1 != 0) {
          this.UserData.GiftList.push({
            GroupID: e.target.getAttribute("groupid") * 1,
            PID: e.currentTarget.id,
            Point: e.target.getAttribute("point") * 1,
            Amount: e.target.options.selectedIndex * 1
          });
        }
        let total = 0;
        this.UserData.GiftList.forEach(element => {
          total += element.Point * element.Amount;
        });
        this.UserData.RemainingPoint = this.UserData.MaxPoint - total;
      }
    },
    DateSelectChg: function(e) {
      this.orderdate = e.currentTarget.value;
      if(this.eventGiftData[0].CalcType==0){
        if(this.orderdate==""){
          if(this.UserData != null)
          this.UserData.MaxPoint = 0;
          this.UserData.RemainingPoint = 0;
          return;
          }
      }
      let promise = new Promise((resolve, reject) => {
        this.GetEventGiftSubmitData(this.UserData.EventID, this.orderdate)
          .then(res => {
            this.UserData = res.data;
            this.RegisteredList = this.GetRegisteredList(
              this.UserData.GiftList
            );            
            if (
              this.UserData.RemainingPoint <
              this.eventGiftData[0].MinConsumption
            ) {
              this.NotEnough = true;
            } else {
              this.NotEnough = false;
            }
            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    Submit: function() {
      if (this.UserData.MaxPoint < this.eventGiftData[0].MinConsumption) {
        alert("累積消費金額未達最低門檻");
        return;
      }
      let checkMember = this.CheckMemberType();
      if (checkMember.status == false) {
        alert(checkMember.msg);
        return;
      }
      let self = this;
      let _UserData = {
        UserData: this.UserData,
        OrderDate: this.orderdate
      };
      axios("/api/eventgift/SubmitUserData", {
        method: "POST",
        responseType: "json",
        data: _UserData,
        headers: {
          UUID: this._props.userinfo.uuid,
          Token: this._props.userinfo.token
        }
      })
        .then(function(res) {
          if (res.data.Msg != null) {
            alert("登錄失敗");
            console.log(res.data.Msg);
          } else {
            alert("登錄成功");
            //refresh eventGiftData
            let data = JSON.parse(res.config.data);
            self.RefreshGiftReserve(data.UserData.EventID);
            self.RegisteredList = self.GetRegisteredList(
              self.UserData.GiftList
            );
          }
        })
        .catch(function(err) {
          alert("登錄失敗");
          console.log(err);
        });
    },
    GetEventGiftList: function(eventid) {
      return axios("/api/eventgift/GetEventGiftList", {
        method: "POST",
        responseType: "json",
        data: {
          eventid: eventid
        }
      });
    },
    GetEventGiftSubmitData: function(eventid, orderdate) {
      let data = {
        eventid: eventid,
        memberid: this._props.userinfo.member,
        orderdate: orderdate
      };
      return axios("/api/eventgift/GetEventGiftSubmitData", {
        method: "POST",
        responseType: "json",
        data: data,
        headers: {
          UUID: this._props.userinfo.uuid,
          Token: this._props.userinfo.token
        }
      });
    },
    PreSelect: function(groupid, pid, val) {
      try {
        let _selectGift = this.UserData.GiftList.filter(function(item) {
          return (
            item.PID.toString() + item.GroupID.toString() ==
            pid.toString() + groupid.toString()
          );
        });
        if (_selectGift.length > 0 && _selectGift[0].Amount == val) return true;
        else return false;
      } catch (e) {
        return false;
      }
    },
    RefreshGiftReserve: function(eventid) {
      let self = this;
      try {
        axios.all([self.GetEventGiftList(eventid)]).then(
          axios.spread(function(giftlist) {
            self.eventGiftData = giftlist.data;
          })
        );
      } catch (e) {
        alert(e);
      }
    },
    CheckMemberType: function() {
      let result = {
        status: false,
        msg: ""
      };
      if (this._props.userinfo.member == "") {
        result.status = false;
        result.msg = "您尚未登入";
        return result;
      }
      if (
        this.eventGiftData[0].MemberType.indexOf(
          this._props.userinfo.membertype
        ) == -1
      ) {
        let mtype = this.eventGiftData[0].MemberType.split(",");
        mtype.forEach(element => {
          if (result.msg != "") msg += ",";
          switch (element) {
            case "0":
              result.msg += "一般網路會員";
              break;
            case "1":
              result.msg += "已綁定燦坤會員卡之會員";
              break;
            case "2":
              result.msg += "已綁定燦坤聯名卡之會員";
              break;
          }
        });
        result.msg = `此活動限${result.msg}`;
        result.status = false;
      } else {
        result.status = true;
      }
      return result;
    },
    GetRegisteredList: function(ary) {
      let RegisteredList = {};
      let result = [];
      ary.forEach(
        function(item) {
          if (RegisteredList[item.Point] == undefined) {
            RegisteredList[item.Point] = {};
            RegisteredList[item.Point].Amount = item.Amount;
            RegisteredList[item.Point].Name = "";
            let filter = this.eventGiftData[0].EventGroupList.filter(function(
              obj
            ) {
              return obj.MinConsumption == this;
            },
            item.Point);
            if (filter.length > 0) {
              RegisteredList[item.Point].Name = filter[0].GroupName;
            }
          } else {
            RegisteredList[item.Point].Amount += item.Amount;
          }
        }.bind(this)
      );
      Object.keys(RegisteredList).forEach(function(key) {
        result.push(RegisteredList[key]);
      });
      return result;
    }
  }
};
</script>