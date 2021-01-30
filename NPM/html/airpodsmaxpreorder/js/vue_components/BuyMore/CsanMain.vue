<template>
    <div v-fragment>
        <li :style="{order: mainOrder}">
            <div class="flex-container">
                <div class="flex-item">
                    <label class="x-check-btn">
                        <input type="checkbox" v-model="csan.Uisselect" @click="csanIsSelectedOnClick" autocomplete="off" />
                        <span class="fa fa-2x fa-check-circle add-button more-choices"></span>
                    </label>
                </div>
                <div class="flex-item img-area">
                    <img v-choose-img="csan.Uimgpath" :alt="csan.NAME" :title="csan.NAME" />
                </div>
                <div class="flex-item flex-grow-item">
                    <div class="infobox">
                        <div class="product-name-area">
                            <a href="javascript:void(0)" style="width: 100%;">{{ csan.NAME }}</a>
                        </div>
                        <div>
                            <p v-show="csan.MPSP > 0">{{ '加購本商品，主品再現折$' + csan.MPSP }}</p>
                            <p v-show="csan.Upromotext">{{ csan.Upromotext }}</p>
                            <!-- 加購A+N -->
                            <div class="open-gift">
                                <a @click="openGroup"><span class="fa fa-angle-double-down" style="padding-right: 0.2em;"></span>展開</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-item price-area">
                    <span v-show="csan.Uprice > 0">${{ csan.Uprice }}</span>
                </div>
            </div>
        </li>
        <!-- 加購A+N 區塊 -->
        <div class="GiftArea giftOther" :style="{order: otherOrder}" v-show="isOpen.group">
            <csan-group :csan="csan" :csan-idx="csanIdx"></csan-group>
        </div>
</template>
<script>
    module.exports = {
        props: {
            csan: Object,
            csanIdx: Number,
            colNum: Number,
            startOrder: Number,
        },
        inject: ['chkBill', 'closeAllBlock'],
        provide: function () {
            return {
                setRootSelected: this.setCsanSelected,
            }
        },
        components: {
            'csan-group': httpVueLoader('/js/vue_components/BuyMore/CsanGroup.vue'),
        },
        data: function () {
            return {
                isForceInitMode: false,
            }
        },
        computed: {
            // 起始排序Idx
            defaultOrderIdx: function () {
                return this.startOrder + this.csanIdx;
            },
            // 主區塊排序Idx
            mainOrder: function () {
                return (this.defaultOrderIdx + 1) + Math.floor(this.defaultOrderIdx / this.colNum);
            },
            // 其他區塊排序Idx
            otherOrder: function () {
                return this.mainOrder + this.colNum - (this.defaultOrderIdx % this.colNum);
            },
            // 展開區塊控制
            isOpen: function () {
                return this.csan.expandBlock;
            },
            // 有贈品
            hasGift: function () {
                return this.csan.CSGGID > 0;
            },
        },
        watch: {
            'csan.Uisselect': function (isSelect) {
                // 加購A+N選取驗證
                this.validateCsanSelect(isSelect);
            },
        },
        methods: {
            // 加購A-N勾選框點擊事件
            csanIsSelectedOnClick: function ($event) {
                // 阻止勾選，使用自己的邏輯
                if ($event.target.checked) $event.preventDefault();

                // 是否強制初始
                this.isForceInitMode = true;

                // else v-model => [watch] csan.Uisselect
            },
            // 設定加購A+N勾選
            setCsanSelected: function () {
                let errorCnt = 0;
                
                // A + N 是否都已選擇
                let csgSelectCnt = 0;
                for (let csgIdx = 0, CSG; CSG = this.csan.CSG[csgIdx]; csgIdx++) {
                    if (CSG.Uisselect) csgSelectCnt++;
                }
                if (csgSelectCnt !== this.csan.CSG.length) errorCnt++;

                // 是否選擇贈品
                if (!errorCnt && this.hasGift) {
                    let ggtSelectCnt = 0;
                    for (let i = 0, GGT; GGT = this.csan.GGT[i]; i++) {
                        let giftBuyCnt = 0;
                        for (let j = 0, GGTD; GGTD = GGT.GGTD[j]; j++) {
                            if (GGTD.Uisselect) giftBuyCnt++;
                        }
                        if (giftBuyCnt == GGT.LimitBuy) ggtSelectCnt++;
                    }
                    if (ggtSelectCnt !== this.csan.GGT.length) errorCnt++;
                }
                
                // 是否需要勾選
                var needSelected = !!(!errorCnt && csgSelectCnt);

                if (this.csan.Uisselect != needSelected) {
                    // 觸發wathch
                    this.csan.Uisselect = needSelected;
                }
                else {
                    // 未改變(觸發)，則強制執行
                    this.validateCsanSelect(needSelected);
                }
            },
            // 驗證加購A+N選取動作
            validateCsanSelect: function (isSelect) {
                this.csan.Uprice = 0;
                for (let csgIdx = 0, CSG; CSG = this.csan.CSG[csgIdx]; csgIdx++) {
                    for (let cspIdx = 0, CSP; CSP = CSG.CSP[cspIdx]; cspIdx++) {
                        if (CSP.Uisselect) this.csan.Uprice += CSP.AddPrice;
                    }
                }
                
                if (isSelect) {
                    this.chkBill();
                }
                // 是否強制初始加購A+N
                else if (this.isForceInitMode) {
                    this.isForceInitMode = false;

                    // (連動)取消勾選所有加購品              
                    for (let csgIdx = 0, CSG; CSG = this.csan.CSG[csgIdx]; csgIdx++) {
                        for (let cspIdx = 0, CSP; CSP = CSG.CSP[cspIdx]; cspIdx++) {
                            CSP.Uisselect = false;
                        }
                    }

                    // (連動)取消勾選所有贈品
                    if (this.hasGift) {
                        for (let i = 0, GGT; GGT = this.csan.GGT[i]; i++) {
                            for (let j = 0, GGTD; GGTD = GGT.GGTD[j]; j++) {
                                GGTD.Uisselect = false;
                            }
                        }
                    }
                }
            },
            openGroup: function () {
                this.isOpen.group = !this.isOpen.group;
                if (this.isOpen.group) {
                    this.closeAllBlock();
                    this.isOpen.group = true;
                }
            },
        }
    };
</script>