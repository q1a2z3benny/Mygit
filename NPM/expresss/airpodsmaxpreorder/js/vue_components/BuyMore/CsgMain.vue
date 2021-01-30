<template>
    <div v-fragment>
        <li :style="{order: mainOrder}">
            <div class="flex-container">
                <div class="flex-item">
                    <label class="x-check-btn">
                        <input type="checkbox" v-model="csg.Uisselect" @click="csgIsSelectedOnClick" autocomplete="off" />
                        <span class="fa fa-2x fa-check-circle add-button more-choices"></span>
                    </label>
                </div>
                <div class="flex-item img-area">
                    <img v-choose-img="csg.Uimgpath" :alt="csg.Uname" :title="csg.Uname" />
                </div>
                <div class="flex-item flex-grow-item">
                    <div class="infobox">
                        <div class="product-name-area">
                            <a href="javascript:void(0)" style="width: 100%;">{{ csg.Uname }}</a>
                        </div>
                        <div>
                            <p v-show="csg.Umpsp > 0">{{ '加購本商品，主品再現折$' + csg.Umpsp }}</p>
                            <p v-show="csg.Upromotext">{{ csg.Upromotext }}</p>
                            <!-- 加購群[可選多個]-->
                            <div v-if="isMultiple">
                                <a @click="openMulti"><span class="fa fa-angle-double-down" style="padding-right: 0.2em;"></span>展開</a>
                            </div>
                            <!-- 加購群[只能擇一] -->
                            <div v-else>
                                <!-- 非唯一，選擇綁定加購品 -->
                                <select class="product-name-option" v-model="bindCSPIdx" v-if="!isOnlyOne">
                                    <option :value="-1" selected="selected">請選擇</option>
                                    <option :value="cspIdx" v-for="(csp, cspIdx) in csg.CSP" :key="csp.ID2">{{ csp.NAME }}</option>
                                </select>
                                <!-- 綁定加購品，選擇數量 -->
                                <select class="product-number-option" v-model="bindCSP.Ubuycount" v-if="bindCSP">
                                    <option :value="0" selected="selected">數量</option>
                                    <option :value="count" v-for="count in bindCSP.LimitBuy" :key="count">
                                        {{genCspCountText(bindCSP, count)}}
                                    </option>
                                </select>

                                <!-- 綁定加購品，附贈品 -->
                                <div class="open-gift" v-if="hasGift">
                                    <a @click="openGift"><span class="fa fa-angle-double-down" style="padding-right: 0.2em;"></span>展開</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-item price-area">
                    <span v-show="csg.Uprice > 0">{{ '$' + csg.Uprice }}</span>
                </div>
            </div>
        </li>
        <!-- 加購群[可選多個] 加購品區塊 -->
        <template v-if="isMultiple">
            <div class="GiftArea" :style="{order: otherOrder}" v-show="isOpen.multi">
                <csg-multi :csg="csg" :csg-idx="csgIdx"></csg-multi>
            </div>
        </template>
        <!-- 加購群[只能擇一] 贈品區塊 -->
        <template v-else-if="hasGift" >
            <div class="GiftArea" :style="{order: otherOrder}" v-show="isOpen.gift">
                <ul>
                    <li v-for="(ggt, ggtIdx) in bindCSP.GGT" :key="ggt.ID">
                        <gift-group :ggt="ggt" :ggt-idx="ggtIdx"></gift-group>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script>
    module.exports = {
        props: {
            csg: Object,
            csgIdx: Number,
            colNum: Number,
            startOrder: Number,
        },
        inject: ['chkBill', 'closeAllBlock', 'genCspCountText', 'imgProcess', 'handleFunc'],
        provide: function () {
            return {
                setRootSelected: this.setCsgSelected,
            }
        },
        components: {
            'csg-multi': httpVueLoader('/js/vue_components/BuyMore/CsgMulti.vue'),
            'gift-group': httpVueLoader('/js/vue_components/BuyMore/GiftGroup.vue'),
        },
        data: function () {
            return {
                bindCSPIdx: null,
                isForceInitMode: false,
            }
        },
        created: function () {
            this.initBindCSPIdx();
        },
        computed: {
            // 起始排序Idx
            defaultOrderIdx: function () {
                return this.startOrder + this.csgIdx;
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
                return this.csg.expandBlock;
            },
            // 加購群 - 是否可選多個加購品
            isMultiple: function () {
                return this.csg.MULTIPLE === 1;
            },
            // 加購群 - 只有一個加購品
            isOnlyOne: function () {
                return this.csg.CSP.length === 1;
            },
            // 加購群 - 綁定的加購品
            bindCSP: function () {
                return (this.isMultiple) ? null : this.csg.CSP[this.bindCSPIdx];
            },
            // 加購群 - 有贈品
            hasGift: function () {
                return this.bindCSP && this.bindCSP.CSGGID > 0;
            },
        },
        watch: {
            'csg.Uisselect': function (isSelect) {
                // 加購群選取驗證
                this.validateCsgSelect(isSelect);
            },
            bindCSPIdx: function () {                
                // 重置加購群顯示
                this.resetCsgDisplay();
                
                this.csg.Uisselect = false; // v-model => [watch] csg.Uisselect
            },
            'bindCSP.Ubuycount': function (newCount, oldCount) {
                if (!this.bindCSP || oldCount === undefined) return;
            
                // 自動勾
                this.bindCSP.Uisselect = newCount > 0;

                // 贈品自動勾
                if (this.hasGift && newCount) {
                    for (let i = 0, GGT; GGT = this.bindCSP.GGT[i]; i++) {
                        if (GGT.GGTD.length === 1) {
                            GGT.GGTD[0].Uisselect = true;
                        }
                    }
                }

                // 設定處理函式 - 無法加購
                this.handleFunc.chkBillError = this.previousCspSelect.bind(this, this.bindCSP, oldCount);
                
                // 重置加購群顯示
                this.resetCsgDisplay();

                // 如果新數量為0，且為綁定的是唯一加購品，則設定強制初始。
                this.isForceInitMode = (this.isOnlyOne && !newCount);

                // 設定加購群勾選
                this.setCsgSelected();
            },
        },
        methods: {
            // 初始綁定的加購品Idx
            initBindCSPIdx: function () {
                // 只有一個加購品 且不可選多個，直接設定Idx為0
                this.bindCSPIdx = (this.isOnlyOne && !this.isMultiple) ? 0 : -1;
            },
            // 加購群勾選框點擊事件
            csgIsSelectedOnClick: function ($event) {
                // 阻止勾選，使用自己的邏輯
                if ($event.target.checked) $event.preventDefault();

                // 是否強制初始
                this.isForceInitMode = true;

                // else v-model => [watch] csg.Uisselect
            },
            // 設定加購群勾選
            setCsgSelected: function () {
                let errorCnt = 0;
                let selectCnt = 0;

                forEachCSP:
                for (let cspIdx = 0, CSP; CSP = this.csg.CSP[cspIdx]; cspIdx++) {
                    // 有選有數量
                    if (CSP.Uisselect && CSP.Ubuycount) {
                        selectCnt++;

                        // 是否有贈品
                        if (CSP.CSGGID > 0) {
                            for (let i = 0, GGT; GGT = CSP.GGT[i]; i++) {
                                let giftBuyCnt = 0;
                                for (let j = 0, GGTD; GGTD = GGT.GGTD[j]; j++) {
                                    if (GGTD.Uisselect) giftBuyCnt++;
                                }

                                if (giftBuyCnt !== GGT.LimitBuy) {
                                    errorCnt++;
                                    break forEachCSP;
                                }
                            }
                        }
                    }
                }

                // 是否需要勾選
                var needSelected = !!(!errorCnt && selectCnt);

                if (this.csg.Uisselect != needSelected) {
                    // 觸發wathch
                    this.csg.Uisselect = needSelected;
                }
                else {
                    // 未改變(觸發)，則強制執行
                    this.validateCsgSelect(needSelected);
                }
            },
            // 重置加購群顯示
            resetCsgDisplay: function () {
                let CSG = this.csg;
                CSG.Uname = CSG.NAME;
                CSG.Uimgpath = this.imgProcess(CSG);
                CSG.Umpsp = 0;
                CSG.Uprice = 0;
                CSG.Upromotext = '';

                if (this.bindCSP && !this.isMultiple) {
                    let CSP = this.bindCSP;

                    CSG.Uname = (this.isOnlyOne) ? CSP.NAME : CSG.NAME + ' : ' + CSP.NAME;
                    CSG.Uprice = (CSP.Ubuycount) ? CSP.AddPrice * CSP.Ubuycount : CSP.AddPrice;
                    CSG.Upromotext = CSP.Upromotext;
                    CSG.Uimgpath = this.imgProcess(CSP);
                    if (CSP.CSGGID > 0) CSG.Upromotext = '加購本商品，再享優惠';
                    if (CSP.MPSP > 0) CSG.Umpsp = CSP.MPSP;
                    if (CSP.CSPDNNCount > 0) {
                        CSG.Uprice = 0;
                        for (let n = 0, NN; NN = CSP.NN[n]; n++) {
                            if (NN.BUYCOUNTNUM == CSP.Ubuycount) {
                                CSG.Uprice = NN.SUMUPPRICE;
                                break;
                            }
                        }
                    }
                }
            },
            initCSP: function (CSP) {
                CSP.Uisselect = false;
                CSP.Ubuycount = 0;
                
                if (CSP.CSGGID > 0) {
                    for (let i = 0, GGT; GGT = CSP.GGT[i]; i++) {
                        for (let j = 0, GGTD; GGTD = GGT.GGTD[j]; j++) {
                            GGTD.Uisselect = false;
                            //GGTD.Ubuycount = 0;
                        }
                    }
                }
            },
            previousCspSelect: function (CSP, oldCount) {
                CSP.Ubuycount = oldCount;
            },
            // 加購群選取驗證
            validateCsgSelect: function (isSelect) {
                if (isSelect) {
                    // 多選多，重置不符合之加購品
                    if (this.isMultiple) {
                        for (let cspIdx = 0, csp; csp = this.csg.CSP[cspIdx]; cspIdx++) {
                            if (csp.Uisselect && csp.Ubuycount) continue;
                            this.initCSP(csp);
                        }
                    }
                    // 非多選多，重置其他加購品 (只能選一個加購品)
                    else if (!this.isOnlyOne) {
                        for (let cspIdx = 0, csp; csp = this.csg.CSP[cspIdx]; cspIdx++) {
                            if (cspIdx === this.bindCSPIdx) continue;
                            this.initCSP(csp);
                        }
                    }

                    this.chkBill();
                }
                // 是否強制初始加購群 (目前只有 手動取消勾選 或 只有一個加購品(OnlyOne) 會觸發)
                else if (this.isForceInitMode) {
                    this.isForceInitMode = false;

                    this.initBindCSPIdx();

                    // (連動)取消勾選所有加購品
                    for (let cspIdx = 0, CSP; CSP = this.csg.CSP[cspIdx]; cspIdx++) {
                        this.initCSP(CSP);
                    }
                }
            },
            openGift: function () {
                this.isOpen.gift = !this.isOpen.gift;
                if (this.isOpen.gift) {
                    this.closeAllBlock();
                    this.isOpen.gift = true;
                }
            },
            openMulti: function () {
                this.isOpen.multi = !this.isOpen.multi;
                if (this.isOpen.multi) {
                    this.closeAllBlock();
                    this.isOpen.multi = true;
                }
            },
        }
    };
</script>