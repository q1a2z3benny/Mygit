<template>
    <ul>
        <li v-for="(csg, csgIdx) in csan.CSG">
            <csan-group-csg :csan="csan" :csg="csg" :csg-idx="csgIdx"></csan-group-csg>
        </li>
        <template v-if="hasGift && toggleGift">
            <li v-for="(ggt, ggtIdx) in csan.GGT" :key="ggt.ID" class="gift-selected" style="min-height:135px">
                <gift-group :ggt="ggt" :ggt-idx="ggtIdx"></gift-group>
            </li>
        </template>
    </ul>
</template>
<script>
    module.exports = {
        props: {
            csan: Object,
            csanIdx: Number,
        },
        components: {
            'csan-group-csg': httpVueLoader('/js/vue_components/BuyMore/CsanGroupCsg.vue'),
            'gift-group': httpVueLoader('/js/vue_components/BuyMore/GiftGroup.vue'),
        },
        computed: {
            csgSelectCnt: function () {
                let csgSelectCnt = 0;
                for (let csgIdx = 0, CSG; CSG = this.csan.CSG[csgIdx]; csgIdx++) {
                    if (CSG.Uisselect) csgSelectCnt++;
                }
                return csgSelectCnt;
            },
            // ¦³ÃØ«~
            hasGift: function () {
                return this.csan.CSGGID > 0;
            },
            toggleGift: function () {
                return this.csgSelectCnt == this.csan.CSG.length;
            },
        },
        watch: {
            toggleGift: function (show) {
                if (show && this.hasGift) {
                    for (let i = 0, GGT; GGT = this.csan.GGT[i]; i++) {
                        if (GGT.GGTD.length === 1) {
                            GGT.GGTD[0].Uisselect = true;
                        }
                    }
                }
            },
        },
    };
</script>