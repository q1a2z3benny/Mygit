<template>
    <label class="x-check-btn">
        <input type="checkbox" v-model="csp.Uisselect" @click="anCSPIsSelectOnClick" ref="csp" autocomplete="off" />
        <!--<span class="fa fa-2x fa-check-circle add-button more-choices"></span>-->
        <div class="gift-info" :class="{'check': csp.Uisselect}" :style="bindStyle">
            <div style="width:25%; padding:0.5em;">
                <img v-choose-img="csp.Uimgpath" style="width:100%;" :alt="csp.NAME" :title="csp.NAME" />
            </div>
            <div style="width:75%; padding:0.5em;">
                <p>{{ csp.NAME }}<br /></p>
              <span class="other-price">{{ '$' + csp.AddPrice }}</span>
            </div>
        </div>
    </label>
</template>
<script>
    module.exports = {
        props: {
            csp: Object,
            cspIdx: Number,
            isLimit: Boolean,
        },
        inject: ['handleFunc'],
        computed: {
            bindStyle: function () {
                return (!this.isLimit || (this.isLimit && this.csp.Uisselect)) ? "opacity:1.0" : "opacity:0.4";
            },
        },
        methods: {
            anCSPIsSelectOnClick: function ($event) {
                if ($event.target.checked && this.isLimit) $event.preventDefault();
                this.handleFunc.chkBillError = this.cancelCSPSelect.bind(this);
            },
            cancelCSPSelect: function () {
                this.csp.Uisselect = false;
                this.$refs['csp'].checked = false
            },
        }
    };
</script>