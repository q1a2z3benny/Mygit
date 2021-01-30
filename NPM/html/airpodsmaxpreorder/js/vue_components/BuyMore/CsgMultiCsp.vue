<template>
    <label class="x-check-btn">
        <!--<input type="checkbox" v-model="csp.Uisselect" @click="cspMultiIsSelectedOnClick($event, cspIdx)" autocomplete="off" />-->
        <!--<span class="fa fa-2x fa-check-circle add-button more-choices"></span>-->
        <div class="gift-info" :class="{'check': csp.Uisselect}">
            <div style="width: 5%; padding: 0.5em; text-align: center;">
            </div>
            <div style="padding: 2em;">
                <img v-choose-img="csp.Uimgpath" style="width:100%;" :alt="csp.NAME" :title="csp.NAME"/>
            </div>
            <div class="info-product">
                <p>{{ csp.NAME }}</p>
                <span>${{ csp.AddPrice }}</span>
                <select class="product-number-option" v-model="csp.Ubuycount">
                    <option :value="0" selected="selected">數量</option>
                    <option :value="count" v-for="count in csp.LimitBuy" :key="count">
                        {{ genCspCountText(csp, count) }}
                    </option>
                </select>
            </div>
        </div>
    </label>
</template>
<script>
    module.exports = {
        props: {
            csp: Object,
            cspIdx: Number,
        },
        inject: ['setRootSelected', 'handleFunc', 'genCspCountText'],
        computed: {
            // 加購群 - 有贈品
            hasGift: function () {
                return this.csp.CSGGID > 0;
            },
        },
        watch: {
            'csp.Ubuycount': function (newCount, oldCount) {
                // 自動勾
                this.csp.Uisselect = newCount > 0;

                // 贈品自動勾
                if (this.hasGift && newCount) {
                    for (let i = 0, GGT; GGT = this.csp.GGT[i]; i++) {
                        if (GGT.GGTD.length === 1) {
                            GGT.GGTD[0].Uisselect = true;
                        }
                    }
                }

                // 設定處理函式 - 無法加購
                this.handleFunc.chkBillError = this.previousCspSelect.bind(this, this.csp, oldCount);
                
                // 設定加購群勾選
                this.setRootSelected();
            },
        },
        methods: {
            previousCspSelect: function (CSP, oldCount) {
                CSP.Ubuycount = oldCount;
            },
        }
    };
</script>