<template>
    <div>
        <h4><br /><span>{{ csg.NAME }}</span></h4>
        <csan-group-csp v-for="(csp, cspIdx) in csg.CSP" :key="csp.ID2" :csp="csp" :csp-idx="cspIdx" :is-limit="isLimit"></csan-group-csp>
    </div>
</template>
<script>
    module.exports = {
        props: {
            csg: Object,
            csgIdx: Number,
        },
        inject: ['setRootSelected'],
        components: {
            'csan-group-csp': httpVueLoader('/js/vue_components/BuyMore/CsanGroupCsp.vue'),
        },
        computed: {
            cspSelectCnt: function () {
                let cspSelectCnt = 0;
                for (let i = 0, csp; csp = this.csg.CSP[i]; i++) {
                    if (csp.Uisselect) cspSelectCnt++;
                }
                return cspSelectCnt;
            },
            isLimit: function () {
                return this.csg.LimitBuy == this.cspSelectCnt;
            },
        },
        watch: {
            isLimit: function (isLimit) {
                this.csg.Uisselect = isLimit;
            },
            'csg.Uisselect': function () {
                this.setRootSelected();
            },
        },
    };
</script>