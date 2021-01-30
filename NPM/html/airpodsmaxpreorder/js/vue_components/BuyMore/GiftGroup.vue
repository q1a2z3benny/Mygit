<template>
    <div>
        <h4>加購品額外優惠<br /><span>{{ promotext }}</span></h4>
        <gift-item v-for="(ggtd, ggtdIdx) in ggt.GGTD" :key="ggtd.ID" :ggtd="ggtd" :ggtd-idx="ggtdIdx" :is-limit="isLimit"></gift-item>
    </div>
</template>
<script>
    module.exports = {
        props: {
            ggt: Object,
            ggtIdx: Number,
        },
        components: {
            'gift-item': httpVueLoader('/js/vue_components/BuyMore/GiftItem.vue'),
        },
        computed: {
            giftSelectCnt: function () {
                let giftSelectCnt = 0;
                for (let i = 0, ggtd; ggtd = this.ggt.GGTD[i]; i++) {
                    if (ggtd.Uisselect) giftSelectCnt++;
                }
                return giftSelectCnt;
            },
            isLimit: function () {
                return this.ggt.LimitBuy == this.giftSelectCnt;
            },
            promotext: function () {
                return (!this.ggt.LimitBuy || this.ggt.LimitBuy !== this.ggt.GGTD.length)
                    ? this.ggt.Name + ' ' + this.ggt.GGTD.length + ' 選 ' + this.ggt.LimitBuy
                    : this.ggt.Name;
            },
        },
    };
</script>