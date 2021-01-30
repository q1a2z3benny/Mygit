<template>
    <label class="x-check-btn">
        <input type="checkbox" v-model="ggtd.Uisselect" @click="ggtdIsSelectOnClick" ref="ggtd" autocomplete="off" />
        <!--<span class="fa fa-2x fa-check-circle add-button more-choices"></span>-->
        <div class="gift-info" :class="{'check':ggtd.Uisselect}" :style="bindStyle">
            <div style="width:25%; padding:0.5em;">
                <img v-choose-img="ggtd.Uimgpath" style="width:100%;" :alt="ggtd.Name" :title="ggtd.Name" />
            </div>
            <div style="width:75%; padding:0.5em;">
                <p>{{ ggtd.Name }}</p>
            </div>
        </div>
    </label>
</template>
<script>
    module.exports = {
        props: {
            ggtd: Object,
            ggtdIdx: Number,
            isLimit: Boolean,
        },
        inject: ['setRootSelected', 'handleFunc'],
        computed: {
            bindStyle: function () {
                return (!this.isLimit || (this.isLimit && this.ggtd.Uisselect)) ? "opacity:1.0" : "opacity:0.4";
            },
        },
        watch: {
            'ggtd.Uisselect': function () {
                this.setRootSelected();
            },
        },
        methods: {
            ggtdIsSelectOnClick: function ($event) {
                if ($event.target.checked && this.isLimit) $event.preventDefault();
                this.handleFunc.chkBillError = this.cancelGGTDSelect.bind(this);
            },
            cancelGGTDSelect: function () {
                this.ggtd.Uisselect = false;
                this.$refs['ggtd'].checked = false
            },
        }
    };
</script>