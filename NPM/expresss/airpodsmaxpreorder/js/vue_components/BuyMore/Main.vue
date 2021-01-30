<template>
    <div class="buymore" v-if="csgArr || csanArr">
        <div class="header"><b>加價購</b></div>
        <ul>
            <csg-main  v-for="(csg, csgIdx) in csgArr"  :key="csg.ID"  :csg="csg"   :csg-idx="csgIdx" :col-num="colNum" :start-order="0"></csg-main>
            <csan-main v-for="(casn, anIdx) in csanArr" :key="casn.ID" :csan="casn" :csan-idx="anIdx" :col-num="colNum" :start-order="csgLen"></csan-main>
        </ul>
    </div>
</template>
<script>
    module.exports = {
        props: {
            pid: String,
            mainPrice: String,
        },
        components: {
            'csg-main': httpVueLoader('/js/vue_components/BuyMore/CsgMain.vue'),
            'csan-main': httpVueLoader('/js/vue_components/BuyMore/CsanMain.vue'),
        },
        inject: ['addBuyList'],
        provide: function () {
            return {
                chkBill: this.chkBill,
                handleFunc: this.handleFunc,
                closeAllBlock: this.closeAllBlock,
                imgProcess: this.imgProcess,
                genCspCountText: this.genCspCountText,
                mainPrice: this.mainPrice,
            }
        },
        data: function () {
            return {
                csgArr: null,
                csanArr: null,
                colNum: 2,
                handleFunc: {
                    chkBillError: null,
                },
            }
        },
        created: function () {
            if (this.pid) {
                this.getData();
                this.getCsanData();
            }
        },
        computed: {
            csgLen: function () {
                return (this.csgArr) ? this.csgArr.length : 0;
            },
            csanLen: function () {
                return (this.csanArr) ? this.csanArr.length : 0;
            },
            userAddBuyList: function () {
                let userAddBuyList = [];
                
                if (this.csgArr) {
                    for (let i = 0, CSG; CSG = this.csgArr[i]; i++) {
                        if (CSG.Uisselect) {
                            for (let j = 0, CSP; CSP = CSG.CSP[j]; j++) {
                                if (CSP.Uisselect) {
                                    let ID = CSP.ID2.split('_');
                                    let TP = ID[0];
                                    let ggtdList = [];
                                    if (CSP.CSGGID > 0) {
                                        for (let m = 0, GGT; GGT = CSP.GGT[m]; m++) {
                                            for (let p = 0, GGTD; GGTD = GGT.GGTD[p]; p++) {
                                                if (GGTD.Uisselect) {
                                                    ggtdList.push({ GGTDCOMBOID: GGT.ID + '_' + GGTD.ID });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        ggtdList.push({ GGTDCOMBOID: '0' });
                                    }

                                    //出貨品項若是N件N折，則帶NN字樣
                                    if (CSP.CSPDNNCount > 0) TP = "NN" + TP;

                                    userAddBuyList.push({
                                        TP: TP,
                                        CSG: parseInt(ID[1]),
                                        CSS: CSG.CSSID,
                                        CSGD: parseInt(ID[2]),
                                        CSP: parseInt(ID[3]),
                                        CSPUbuycount: parseInt(CSP.Ubuycount),
                                        CSGG: parseInt(CSP.CSGGID),
                                        GGTDCOMBOID: ggtdList,
                                    });
                                }
                            }
                        }
                    }
                }

                if (this.csanArr) {
                    for (let i = 0, CSAN; CSAN = this.csanArr[i]; i++) {
                        if (CSAN.Uisselect) {
                            let csanBuyData = [];
                            for (let j = 0, CSG; CSG = CSAN.CSG[j]; j++) {
                                for (let k = 0, CSP; CSP = CSG.CSP[k]; k++) {
                                    if (CSP.Uisselect) {
                                        let CSPID2 = CSP.ID2.split('_');
                                        csanBuyData.push({
                                            CSG: parseInt(CSPID2[2]),
                                            CSGD: parseInt(CSPID2[3]),
                                            CSP: parseInt(CSPID2[4]),
                                            CSPUbuycount: parseInt(CSP.Ubuycount),
                                        });
                                    }
                                }
                            }

                            let ggtdList = [];
                            if (CSAN.CSGGID > 0) {
                                for (let j = 0, GGT; GGT = CSAN.GGT[j]; j++) {
                                    for (let k = 0, GGTD; GGTD = GGT.GGTD[k]; k++) {
                                        if (GGTD.Uisselect) {
                                            ggtdList.push({ GGTDCOMBOID: GGT.ID + '_' + GGTD.ID });
                                        }
                                    }
                                }
                            }
                            else {
                                ggtdList.push({ GGTDCOMBOID: '0' });
                            }

                            userAddBuyList.push({
                                TP: "AN",
                                CSAN: parseInt(CSAN.ID),
                                CSANBuyData: csanBuyData,
                                CSGG: parseInt(CSAN.CSGGID),
                                GGTDCOMBOID: ggtdList
                            });
                        }
                    }
                }
                
                return userAddBuyList;
            },
        },
        watch: {
            userAddBuyList: function (userAddBuyList) {
                this.addBuyList.json = userAddBuyList;
                this.addBuyList.str = JSON.stringify(userAddBuyList);
            },
        },
        methods: {
            // 取得加購群(CSG)資訊
            getData: function () {
                let vm = this;
                vm.csgArr = null;

                console.time('getData');
                $.ajax({
                    url: '/api/ptpage/combosale?ProductID=' + this.pid,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        console.timeEnd('getData');
                        if (!data || !data.length || !data[0].CSG) return;
                        
                        vm.csgArr = data[0].CSG.map(function (CSG) {
                            CSG.Uname = CSG.NAME;
                            CSG.Umpsp = 0;
                            CSG.Uprice = 0;
                            CSG.Upromotext = '';
                            CSG.Uimgpath = vm.imgProcess(CSG);
                            vm.$set(CSG, "Uisselect", false);
                            vm.setCsgNnData(CSG);

                            CSG.CSP = CSG.CSP.map(function (CSP) {
                                CSP.Ubuycount = 0;
                                CSP.Upromotext = '';
                                CSP.Uimgpath = vm.imgProcess(CSP);
                                vm.$set(CSP, "Uisselect", false);
                                vm.setGift(CSP);
                                vm.setCspDnnData(CSP);

                                return CSP;
                            });

                            if (CSG.CSP.length === 1) {
                                let CSP = CSG.CSP[0];
                                CSG.Upromotext = CSP.Upromotext;
                                if (CSP.MPSP > 0) CSG.Umpsp = CSP.MPSP;
                                if (CSP.CSPDNNCount < 1) CSG.Uprice = CSP.AddPrice;
                                if (CSP.CSGGID > 0) CSG.Upromotext = '加購本商品，再享優惠';
                            }

                            vm.$set(CSG, 'expandBlock', {
                                multi: false,
                                gift: false,
                            });
                            
                            return CSG;
                        });
                    },
                    error: function () {
                        console.error('getData: eXception!!');
                    }
                });
            },
            // 取得加購A+N(CSAN)資訊
            getCsanData: function () {
                let vm = this;
                vm.csanArr = null;

                console.time('getCsanData');
                $.ajax({
                    url: '/api/ptpage/csan?ProductID=' + this.pid,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        console.timeEnd('getCsanData');
                        if (!data || !data.length || !data[0].CSAN) return;

                        vm.csanArr = data[0].CSAN.map(function (CSAN) {
                            CSAN.Uprice = 0;
                            CSAN.Uimgpath = vm.imgProcess(CSAN);
                            vm.$set(CSAN, "Uisselect", false);
                            vm.setGift(CSAN);

                            CSAN.CSG = CSAN.CSG.map(function (CSG) {
                                CSG.Uname = CSG.NAME;
                                CSG.LimitBuy = 1;
                                CSG.Ubuycount = 1;  //購買數量固定先帶1
                                CSG.Uimgpath = vm.imgProcess(CSG);
                                vm.$set(CSG, "Uisselect", false);

                                CSG.CSP = CSG.CSP.map(function (CSP) {
                                    CSP.Ubuycount = 1;  //購買數量固定先帶1
                                    CSP.Uimgpath = vm.imgProcess(CSP);
                                    vm.$set(CSP, "Uisselect", false);

                                    return CSP;
                                });

                                return CSG;
                            });

                            vm.$set(CSAN, 'expandBlock', {
                                group: false,
                            });

                            return CSAN
                        });
                    },
                    error: function () {
                        console.error('getCsanData: eXception!!');
                    }
                });
            },
            // 設定 加購群(CSG) N件N折資訊
            setCsgNnData: function (CSG) {
                if (CSG.QueryType !== 'G') return;

                CSG.GNN = null;

                console.time('setCsgNnData');
                $.ajax({
                    url: '/api/ptpage/csgnn?ProductID=' + this.pid + '&CSG_ID=' + CSG.ID.replace('G_', ''),
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        console.timeEnd('setCsgNnData');
                        if (!data || !data.length) return;

                        CSG.GNN = data;
                    },
                    error: function () {
                        console.error("setCsgNnData: eXception!!");
                    }
                });
            },
            // 設定贈品
            setGift: function (node) {
                if (!node.CSGGID) return;

                let vm = this;
                node.GG = null;
                node.GGT = null;
                
                $.ajax({
                    url: '/api/ptpage/combosalegift?ProductID=' + this.pid + '&CSGGID=' + node.CSGGID,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        if (!data || !data.length || !data[0].GGT) { node.CSGGID = 0; return; }

                        node.GGT = data[0].GGT.map(function (GGT) {
                            GGT.GGTD = GGT.GGTD.map(function (GGTD) {
                                GGTD.Uimgpath = vm.imgProcess(GGTD);
                                vm.$set(GGTD, "Uisselect", false);
                                return GGTD;
                            });

                            return GGT;
                        });
                    },
                    error: function () {
                        console.error("setGift() : eXception!!!");
                        node.CSGGID = 0;
                    }
                });
            },
            // 設定加購品(CSP) 多件折扣 資訊
            setCspDnnData: function (CSP) {
                if (!CSP.CSPDNNCount) return;

                CSP.NN = null;
                
                console.time('setCspDnnData');
                $.ajax({
                    url: '/api/ptpage/cspdnn?ProductID=' + this.pid + '&CSP_ID=' + CSP.CSPID,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        console.timeEnd('setCspDnnData');
                        if (!data || !data.length) { CSP.CSPDNNCount = 0;; return; }

                        CSP.NN = data;
                        CSP.CSPDNNCount = data.length;
                        CSP.Upromotext = '多件折扣';
                    },
                    error: function () {
                        console.error('setCspDnnData(): eXception');
                        CSP.CSPDNNCount = 0;
                    }
                });
            },
            // 結帳試算
            chkBill: function () {
                let handleFunc = this.handleFunc.chkBillError;
                $.ajax({
                    url: '/api/ptpage/chkShipBill?ProductID=' + this.pid + '&strUserAddBuyList=' + this.addBuyList.str,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        if (data.split(',')[0] == 'False') {
                            if (handleFunc) handleFunc();

                            alert('此商品目前無法加購');
                        }
                    },
                    error: function (e) {
                        console.error('chkBill() : eXception!!!');
                    }
                });
            },
            // 圖片處理
            imgProcess: function (obj) {
                if (!obj) return null;

                let imgPath;
                if (obj.IMGPATH == null) {
                    imgPath = 'http://www.cdn-tkec.tw' + obj.PRODIMG;
                }
                else {
                    // 未提供圖片HTTP路徑，加上prefix。
                    if (obj.IMGPATH.indexOf('://') === -1) {
                        //obj.IMGPATH = '/img/img_ComboSale/' + obj.IMGPATH;
                        obj.IMGPATH = 'http://www.cdn-tkec.tw' + obj.IMGPATH;
                    }
                    imgPath = obj.IMGPATH;
                }
                return imgPath;
            },
            genCspCountText: function (CSP, count) {
                if (CSP.CSPDNNCount > 0) {
                    let NN = CSP.NN[count - 1];
                    let showText = (NN.PRICETYPE == 1)
                        ? "$" + NN.ADDPRICE // 固定金額
                        : NN.OGIADDPRICE / 10 + "折";

                    return "第" + NN.BUYCOUNTNUM + "件" + showText;
                }
                return count;
            },
            // 關閉所有展開區塊
            closeAllBlock: function () {
                if (this.csgArr && this.csgArr.length) {
                    for (let i = 0, csg; csg = this.csgArr[i]; i++) {
                        csg.expandBlock.multi = false;
                        csg.expandBlock.gift = false;
                    }
                }
                if (this.csanArr && this.csanArr.length) {
                    for (let i = 0, csan; csan = this.csanArr[i]; i++) {
                        csan.expandBlock.group = false;
                    }
                }
            },
        }
    };
</script>