<template>
    <div>
        <h4>
            <template v-if="showLimitText">
                配件金說明：加購總額<span class='discount'>折抵上限{{ CSSLimitText }}</span><span class='discount-type'>元</span>以內配件不需額外加價
                <br />
            </template>
            加購配件
            <template v-if="csg.GNN && csg.GNN.length > 0">
                <template v-for="(data, idx) in csg.GNN" v-if="data.ADDPRICE < 100 && data.ADDPRICE > 0">
                    {{ data.BUYCOUNTNUM }}件享
                    <span>{{ data.ADDPRICE/10 }}</span>折{{ idx < csg.GNN.length -1 ? ', ' : '' }}
                </template>
            </template>
        </h4>
        <div :style="{minHeight: minHeight + 'px'}">
            <div ref="list">
                <transition name="fade" mode="out-in" v-on:enter="enter">
                    <ul :key="pageNum">
                        <li v-for="(csp, cspIdx) in showCSP" :key="csp.ID">
                            <multi-csp :csp="csp" :csp-idx="cspIdx + (rowsPerPage * (pageNum-1))"></multi-csp>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div style="text-align:center" v-if="totalPageCount > 1">
            <pagination @update-page-num="updatePageNum"
                        :page-num="pageNum"
                        :total-page-count="totalPageCount">
            </pagination>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: {
            csg: Object,
            csgIdx: Number,
        },
        components: {
            'multi-csp': httpVueLoader('/js/vue_components/BuyMore/CsgMultiCsp.vue'),
            'pagination': httpVueLoader('/js/vue_components/Pagination.vue'),
        },
        inject: ['mainPrice'],
        data: function () {
            return {
                rowsPerPage: 10, // 單一頁面資料列總數
                pageNum: 1, // Pagination 現在指向的分頁頁數
                minHeight: null,
            }
        },
        computed: {
            showLimitText: function () {
                return this.csg.CSSLimitType !== '';
            },
            CSSLimitText: function () {
                return (this.csg.CSSLimitType === '1')
                    ? this.csg.CSSLimit
                    : this.mainPrice * this.csg.CSSLimit;
            },
            totalPageCount: function () {
                return Math.ceil(this.csg.CSP.length / this.rowsPerPage);
            },
            showCSP: function () {
                return this.csg.CSP.slice(this.rowsPerPage * (this.pageNum - 1), this.rowsPerPage * this.pageNum);
            },
        },
        methods: {
            updatePageNum: function (num) {
                this.pageNum = num;
            },
            enter: function () {
                this.minHeight = this.$refs['list'].offsetHeight;
            },
        }
    };
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>