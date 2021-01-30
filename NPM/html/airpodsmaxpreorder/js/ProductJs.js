function PtProductMobileScript(pid, id, kind) {
    if ($("#" + id).html() == '') {
        $.ajax({
            url: "../ashx/Product/ProductMobile.ashx?kind="+kind+"&pid="+pid,
            type: "POST",
            dataType: 'html',
            success: function (msg) {                
                if (msg != "") {
                    $("#" + id).html(msg);
                }
            },
            error: function (data) {
            }
        });
    }    
}
function PtInstallmentMobileScript(Pid,intSalePrice,intWebPrice,intMemberPrice,strIsInstallment,strMK_NO,strProd_Cate_No,Is_Superised_price ) {
    $.ajax({
        url: "../ashx/Product/InstallmentMobile.ashx",
        type: "POST",
        dataType: 'html',
        data: {
            Pid: Pid,
            intSalePrice: intSalePrice,
            intWebPrice: intWebPrice,
            intMemberPrice: intMemberPrice,
            strIsInstallment: strIsInstallment,
            strMK_NO: strMK_NO,
            strProd_Cate_No: strProd_Cate_No,
            Is_Superised_price: Is_Superised_price
        },
        success: function (msg) {
            if (msg != "") {
                $("#img_tag_2").show();
            }
            $("#PtInstallmentNew").html(msg);
        },
        error: function (data) {
        }
    });  
}
function PtLineMobile(Pid, WebPrice, erp_cost, affiliate, ecid) {
    $.ajax({
        url: "../ashx/Product/LineCheck.ashx",
        type: "POST",
        dataType: 'html',
        data: {
            Pid: Pid,
            WebPrice: WebPrice,
            erp_cost: erp_cost,
            affiliate: affiliate,
            ecid: ecid
        },
        success: function (msg) {
            if (msg == "1") {     
                $("#PnLine").show();
            }
        },
        error: function (data) {
        }
    });
}
function GetPromote(pid) {
    $.ajax({
        url: "../ashx/ProductPromote.ashx?pid=" + pid,
        type: "POST",
        dataType: 'text',
        success: function (msg) {
            if (msg != '') {
                $("#Promote" + pid).html(msg);
            }
        }
    });
}
function PtSuperContentMobileScript(pid, sal_type) {
    $.ajax({
        url: "../ashx/Product/PtSuperContentMobile.ashx?pid=" + pid + "&sal_type=" + sal_type,
        type: "POST",
        dataType: 'text',
        success: function (msg) {
            if (msg != '') {
                $("#PtSuperContent").html(msg);
            }
        }
    });
}
function PtWaterScript(pid) {
    $.ajax({
        url: "../ashx/Product/PTWater.ashx?pid=" + pid,
        type: "POST",
        dataType: 'text',
        success: function (msg) {
            if (msg == 'E') {
                location.href = '/index.aspx';
            }
            if (msg != 'E' && msg !='') {
                $("#imgWater").attr("src", "/images/Water" + msg + "-Icon.png");
                $("#imgWater").show();
            }
        }
    });
}
function GetPromoteTxt(pid, prod_cate_no) {
    $.ajax({
        url: "../ashx/Product/GetPromoteTxtMobile.ashx?pid=" + pid + "&prod_cate_no=" + prod_cate_no,
        type: "POST",
        dataType: 'text',
        success: function (msg) {
            if (msg != '') {
                $("#PtPromoteTxt").html(msg);
            }
        }
    });
}
function GetPromoteTxt(pid, prod_cate_no) {
    $.ajax({
        url: "../ashx/Product/GetPromoteTxtMobile.ashx?pid=" + pid + "&prod_cate_no=" + prod_cate_no,
        type: "POST",
        dataType: 'text',
        success: function (msg) {
            if (msg != '') {
                $("#PtPromoteTxt").html(msg);
            }
        }
    });
}