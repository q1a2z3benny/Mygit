<template>
  <section id="product_area">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-4" v-bind:key="index" v-for="(eventdata,index) in eventlist">
          <div class="card h-100">
            <img v-bind:src="eventdata.Img" class="card-img-top" :alt="eventdata.EventName" />
            <div class="card-body text-left">
              <h5 class="card-title">
                {{eventdata.EventName}}
                <br />
                <small>寄送日期：{{eventdata.DeliveryDate}}</small>
              </h5>
              <p class="card-text" v-html="eventdata.Description">{{eventdata.Description}}</p>
            </div>
            <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click="SetDialogData(eventdata.EventID)">查看資格</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
module.exports = {
  inject: ["eventHub"],
  props: {
    userinfo: {
      login: Boolean,
      email: String
    }
  },
  created: function() {
    this.GetData();    
  },
  mounted() { 
  },
  data: function() {
    return {
      eventlist: []
    };
  },
  methods: {
    GetData: function() {
      let self = this;
      axios("/api/eventgift/getevent", {
        method: "POST",
        responseType: "json"
      })
        .then(function(response) {
          self.eventlist = response.data;
        })
        .catch(function(err) {
          alert(err);
        });
    },
    SetDialogData:function(eventid){
        this.eventHub.$emit("eventid", eventid);        
    }
  }
};
</script>