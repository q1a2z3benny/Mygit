<template>
    <div>
        <paginate :page-count="totalPageCount"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="changePage"
                  :prev-text="'上一頁'"
                  :next-text="'下一頁'"
                  :container-class="'pagination'">
        </paginate>
    </div>
</template>
<script>
    module.exports = {
        props: {
            pageNum: {
                type: Number,
                default: 1,
            },
            totalPageCount: {
                type: Number,
            }
        },
        //emits: ['update-page-num'],
        //components: { Paginate /*vuejs-paginate*/ },
        data: function () {
            return {
                currentPageNum: this.pageNum,
            }
        },
        updated: function () {
            console.log('pagination')
        },
        methods: {
            changePage: function (num) {
                this.currentPageNum = num;
                this.$emit('update-page-num', num);
            }
        }
    };
</script>

<style lang="css">
    .pagination {
        display: inline-block !important;
        margin: 20px auto;
        border-radius: 4px;
    }

        .pagination > li {
            display: inline;
            border: none !important;
        }

            .pagination > li > a,
            .pagination > li > span {
                position: relative;
                float: left;
                padding: 6px 12px;
                margin-left: -1px;
                line-height: 1.42857143;
                color: #ff9900 ;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #ddd;
            }

            .pagination > li:first-child > a,
            .pagination > li:first-child > span {
                margin-left: 0;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            .pagination > li:last-child > a,
            .pagination > li:last-child > span {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }

            .pagination > li > a:hover,
            .pagination > li > span:hover,
            .pagination > li > a:focus,
            .pagination > li > span:focus {
                z-index: 3;
                color: #23527c;
                background-color: #eee;
                border-color: #ddd;
            }

        .pagination > .active > a,
        .pagination > .active > span,
        .pagination > .active > a:hover,
        .pagination > .active > span:hover,
        .pagination > .active > a:focus,
        .pagination > .active > span:focus {
            z-index: 2;
            color: #fff;
            cursor: default;
            background-color: #ff9900 ;
            border-color: #ff9900 ;
        }

        .pagination > .disabled > span,
        .pagination > .disabled > span:hover,
        .pagination > .disabled > span:focus,
        .pagination > .disabled > a,
        .pagination > .disabled > a:hover,
        .pagination > .disabled > a:focus {
            color: #777;
            cursor: not-allowed;
            background-color: #fff;
            border-color: #ddd;
        }
</style>