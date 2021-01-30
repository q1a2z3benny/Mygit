//import { debug } from "util";

/* 呼叫加購品專區 */
function addSystem(intDatakind, blnIsInit) {  
   showLoadingMessage();    
   $("#hf_kind").val(intDatakind);
   $("#hf_changePage").val(1);
   var key = $("#hidCar_Key").val();
   var page = $("#hf_changePage").val();
    $.ajax({
        url: "../ashx/tkecCar/AddSystemProcess.ashx",
        data: { _kind: intDatakind, _key_vaue: key, _page: page },
        type: "POST",
        success: function (data) {
            $("#divProductList").html(data);
            $('#ul_addSystem li').each(function () {
                $(".tkecCar_onbtn").removeClass("tkecCar_onbtn");
            });
            $("#li_addSystem_" + intDatakind).addClass("tkecCar_onbtn");

            if (blnIsInit === 0) {
                $("html,body").scrollTop($("#divProductList").offset().top);
            }
            hideLoadingMessage();
        }
    });
}
/* 加購品換頁 */
function addSystemChange() {
    showLoadingMessage();
    var intDatakind = $("#hf_kind").val();
    var key = $("#hidCar_Key").val();
    var page = parseInt($("#hf_changePage").val());

    var blnIsInit = 0;
    if (isNaN(page) ===false) {
        page += 1;
    }
    $.ajax({
        url: "../ashx/tkecCar/AddSystemProcess.ashx",
        data: { _kind: intDatakind, _key_vaue: key, _page: page },
        type: "POST",
        success: function (data) {
            $("#divProductList").html(data);
            $('#ul_addSystem li').each(function () {
                $(".tkecCar_onbtn").removeClass("tkecCar_onbtn");
            });
            $("#li_addSystem_" + intDatakind).addClass("tkecCar_onbtn");

            if (blnIsInit === 0) {
                $("html,body").scrollTop($("#divProductList").offset().top);
            }
            hideLoadingMessage();
        }
    });
}
/*購物金*/
function UseBuyGold(CarStoreNo) {
    var key = $("#hidCar_Key").val();
    $.ajax({
        url: "../api/TkecCar/UseBuyGold",
        data: { CarJsonString: key, CarStoreNo: CarStoreNo },
        type: "POST",
        success: function (data) {
            $("#hidCar_Key").val(data.key_value);
            ResetShopCar(true);
        }
    });
}
/*折價卷*/
function UseCoupon(CarStoreNo, CouponNo, objCoupon) {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    $.ajax({
        url: "../api/TkecCar/UseCoupon",
        data: { CarJsonString: key, CarStoreNo: CarStoreNo, CouponNo: CouponNo },
        type: "POST",
        success: function (data) {
            $("#hidCar_Key").val(data.key_value);
            ResetShopCar(false);
            if (data.errMsg)
                alert(data.errMsg);
            else {
                setTimeout(function () {
                    location.reload(true);
                }, 500);
                //objCoupon.show();
            }
        }
    });
}

/*現金卷*/
function UseCashCoupon(CarStoreNo, CashCouponNo, objCashCoupon, TotalAmt) {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    $.ajax({
        url: "../api/TkecCar/UseCashCoupon",
        data: { CarJsonString: key, CarStoreNo: CarStoreNo, CouponNo: CashCouponNo, payTotal: TotalAmt },
        type: "POST",
        success: function (data) {
            $("#hidCar_Key").val(data.key_value);
            ResetShopCar(false);
            if (data.errMsg)
                alert(data.errMsg);
            else {
                setTimeout(function () {
                    location.reload(true);
                }, 500);                
                //objCashCoupon.show();
            }
        }
    });
}

/* 2019.03.06 跳加跳減數量 */
function setQty_Change(CarStoreNo, Qty) {
    Qty = document.getElementById("selectID-" + CarStoreNo).value;
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    setQty(CarStoreNo, "2", key, Qty)
}

/* 增加數量 */
function setQty_Add(CarStoreNo) {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    setQty(CarStoreNo, "1", key, 0)
}
/* 減少數量 */
function setQty_Minus(CarStoreNo) {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    setQty(CarStoreNo, "0", key, 0)
}
/* 商品數量計算 */
function setQty(CarStoreNo, type, key, Qty) {
    $.ajax({
        url: "../ashx/tkecCar/SetOrderCntProcess.ashx",
        data: { _carStoreNo: CarStoreNo, _type: type, _key: key, _qty: Qty},
        type: "POST",
        success: function (data) {
            if (data === "") {
                location.reload();
            } else {
                alert("Error");
            }
            hideLoadingMessage();
        }
    });
}
/* 商品全部勾選 */
function CheckAllCar() {
    showLoadingMessage();
    var delCheck = "A";
    if (document.getElementById('selectAll').checked) {
        delCheck = "A";        
    } else {
        delCheck = "C";        
    }
    if ($("#selectAll").checked !== true) {
        var CarStoreNo = "";
        var key = $("#hidCar_Key").val();
         $.ajax({
            url: "../ashx/tkecCar/SetStatistics.ashx",
            data: { _carStoreNo: CarStoreNo, _key: key, _checkType: delCheck },
            type: "POST",
            success: function (data) {
                if (data === "") {
                    location.reload();
                } else {
                    alert("Error");
                }
                hideLoadingMessage();
            }
        });
    }
}
/* 購物車統計 */
function SetOrderChceck(CarStoreNo) {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    var delCheck = "0";
    var checkbox = document.getElementById(CarStoreNo);
    if (checkbox.checked !== true) {
        delCheck = "1";
    }
    else {
        delCheck = "0";
    }
    $.ajax({
        url: "../ashx/tkecCar/SetStatistics.ashx",
        data: { _carStoreNo: CarStoreNo, _key: key, _checkType: delCheck },
        type: "POST",
        success: function (data) {
            if (data === "") {
                location.reload();
            } else {
                alert("Error");
            }
            hideLoadingMessage();
        }
    });
}
/* 系統加購品*/
function SetAddSystemProduct(strProductid) {
    showLoadingMessage();
    var intDatakind = $("#hf_kind").val();
    var key = $("#hidCar_Key").val();
    var userAgent = $("#hid_userAgent").val();
    $.ajax({
        url: "../ashx/tkecCar/SetAddSystemProcess.ashx",
        data: { _productid: strProductid, _key: key, _userAgent: userAgent, _kind: intDatakind},
        type: "POST",
        success: function (data) {
            if (data === "") {
                location.reload();
            } else {
                alert(data);
            }
            hideLoadingMessage();
        }
    });
}
/* 刪除加購品*/
function DelAddProdcut(CarStoreNo, Pid) {
    var key = $("#hidCar_Key").val();
    $('#hidDelCarNo').val(CarStoreNo);
    showAlertPopupBox(Pid);
   //DelCarStore(CarStoreNo, Pid,key)
}
/* 刪除賣場-開啟Confirm視窗 */
function DelAddStore(CarStoreNo) {
    $('#hidDelCarNo').val(CarStoreNo);
    showAlertPopupBox("");
}
/* 刪除賣場確認 */
function DelAddStoreConfirm() {
    var CarStoreNo = $('#hidDelCarNo').val();
    hideAlertPopupBox();
    var key = $("#hidCar_Key").val();
    var Pid = $('#hiddDelPid').val();
    DelCarStore(CarStoreNo, Pid, key);
}
/* 刪除 */
function DelCarStore(CarStoreNo,Pid,Key) {
    $.ajax({
        url: "../ashx/tkecCar/DelCarStore.ashx",
        data: { _carStoreNo: CarStoreNo, _key: Key, _Product: Pid },
        type: "POST",
        success: function (data) {
            if (data === "") {
                location.reload();
            } else {
                alert("Error");
            }
            hideLoadingMessage();
        }
    });
}
/* loading*/
function showLoadingMessage() {
    $('.tkecCar_loadingMessage').show();
    //$('body').addClass('overflow-hidden');
}
/* 解除loading*/
function hideLoadingMessage() {
    $('.tkecCar_loadingMessage').hide();
}
/* form sumit */
function carSubmit() {
    showLoadingMessage();
    $("#shopCarForm").submit();
}

function carSubmitForCheck() {
    showLoadingMessage();
    var uid = $('#txtIdentityID').val();
    if (uid.length !== 10) {
        alert("請填寫有效身分證字號");
        $('#txtIdentityID').val("");
        hideLoadingMessage();
        return false;
    }
    else {
        var key = $("#hidCar_Key").val();
        $.ajax({
            url: "../api/TkecCar/CheckIdentity",
            data: { CarJsonString: key, OrdID: uid },
            type: "POST",
            success: function (data) {
                hideLoadingMessage();
                $("#hidCar_Key").val(data.key_value);
                if (data.errMsg) {
                    $('#txtIdentityID').val("");
                    alert(data.errMsg);
                    return false;
                }
                else {
                    $("#shopCarForm").submit();
                }
            },
            error: function (error) {
                hideLoadingMessage();
                $('#txtIdentityID').val("");
                alert('檢核有誤，請重新結帳');
                return false;
            }
        });
    }
}

/* 送出確認 */
function CheckSubmit() {
    showLoadingMessage();
    var checkbox = document.getElementById("agreeOrder")
    if (checkbox.checked !== true) {
        alert("請勾選退貨辦理同意條款，繼續購物");
        hideLoadingMessage();
    }
    else {
        $("#shopCarForm").submit();
    }    
}

/* 送出結帳 */
function CheckPaySubmit() {
    showLoadingMessage();
    var checkbox = document.getElementById("agreeCheck")
    if (checkbox.checked !== true) {
        alert("請勾選電子交易條款 ");
        hideLoadingMessage();
    }
    else {
        $("#shopCarForm").submit();
    }
}

/* 取回可用折價卷 */
function getProductCoupon(objBtn, ID) {
    var memberId = ID;
    var productId = objBtn[0].id.replace('coupon_', '');
    $.ajax({
        url: "../api/TkecCar/GetProductCoupon",
        data: { MemberId: memberId, ProductID: productId },
        type: "POST",
        success: function (data) {
            var szCouponHtml = "";
            szCouponHtml += '<div class="tkecCar_couponItem tkecCar_popupPageCtl-item tkecCar_saleActBox tkecCar_borderShadow">';
            szCouponHtml += '<div class="tkecCar_saleActBox-actInfo">';
            szCouponHtml += '<div class="tkecCar_invoiceInfoBox-formContral">';
            szCouponHtml += '<label for="invoicePhone">輸入折價券號碼</label>';
            szCouponHtml += '<input type="text" id="invoicePhone" placeholder="請輸入折價券號碼">';
            szCouponHtml += '</div>';
            szCouponHtml += '</div>';
            szCouponHtml += '<div class="tkecCar_saleActBox-actCheck">';
            szCouponHtml += '<input type="radio" name="acttype" value="" onchange="actTypeChange();">';
            szCouponHtml += '</div>';
            szCouponHtml += '</div>';
            for (var i = 0; i < data.length; i++) {
                szCouponHtml += '<div class="tkecCar_couponItem tkecCar_popupPageCtl-item tkecCar_saleActBox tkecCar_borderShadow">';
                szCouponHtml += '<div class="tkecCar_saleActBox-actInfo">';
                szCouponHtml += '<div class="tkecCar_saleActBox-actName">折價券代號：<span>' + data[i].CouponNo + '</span></div>';
                szCouponHtml += '<div class="tkecCar_saleActBox-salePrice">折價金額：<span>$' + data[i].CouponPrice + '</span></div>';
                szCouponHtml += '</div>';
                szCouponHtml += '<div class="tkecCar_saleActBox-actCheck"><input type="radio" name="acttype" value="' + data[i].CouponNo + '" onchange="actTypeChange();"></div>';
                szCouponHtml += '</div>';
            };
            $('#divCouponContent')[0].innerHTML = szCouponHtml;

            if ($("#hidCouponSelectedNo_" + productId).val())
                $("input[name=acttype][value=" + $("#hidCouponSelectedNo_" + productId).val() + "]").attr('checked', 'checked');
        }
    });
}

function getProductCashCoupon(objBtn,orderTotal,ID) {
    var memberId = ID;
    var productId = objBtn[0].id.replace('cashcoupon_', '');
    $.ajax({
        url: "../api/TkecCar/GetProductCashCoupon",
        data: { MemberId: memberId, OrderTotal: orderTotal, ProductId: productId},
        type: "POST",
        success: function (data) {
            var szCouponHtml = "";
            szCouponHtml += '<div class="tkecCar_couponItem tkecCar_popupPageCtl-item tkecCar_saleActBox tkecCar_borderShadow">';
            szCouponHtml += '<div class="tkecCar_saleActBox-actInfo">';
            szCouponHtml += '<div class="tkecCar_invoiceInfoBox-formContral">';
            szCouponHtml += '<label for="invoicePhone1">輸入現金抵用券號碼</label>';
            szCouponHtml += '<input type="text" id="invoicePhone1" placeholder="請輸入現金抵用券號碼">';
            szCouponHtml += '</div>';
            szCouponHtml += '</div>';
            szCouponHtml += '<div class="tkecCar_saleActBox-actCheck">';
            szCouponHtml += '<input type="radio" name="acttype" value="" onchange="actTypeChange();">';
            szCouponHtml += '</div>';
            szCouponHtml += '</div>';
            for (var i = 0; i < data.length; i++) {
                szCouponHtml += '<div class="tkecCar_couponItem tkecCar_popupPageCtl-item tkecCar_saleActBox tkecCar_borderShadow">';
                szCouponHtml += '<div class="tkecCar_saleActBox-actInfo">';
                szCouponHtml += '<div class="tkecCar_saleActBox-actName">現金抵用券代號：<span>' + data[i].CashCouponNo + '</span></div>';
                szCouponHtml += '<div class="tkecCar_saleActBox-salePrice">現金抵用券金額：<span>$' + data[i].CashCouponPrice + '</span></div>';
                szCouponHtml += '</div>';
                szCouponHtml += '<div class="tkecCar_saleActBox-actCheck"><input type="radio" name="acttype" value="' + data[i].CashCouponNo + '" onchange="actTypeChange();"></div>';
                szCouponHtml += '</div>';
            };
            $('#divCashCouponContent')[0].innerHTML = szCouponHtml;

            if ($("#hidCashCouponSelectedNo_" + productId).val())
                $("input[name=acttype][value=" + $("#hidCashCouponSelectedNo_" + productId).val() + "]").attr('checked', 'checked');
        }
    });
}

function funEditBuyerInfo() {
    $('body').addClass('overflow-hidden');
    $("#buyerInfo").toggleClass('is-visible');
    
    if ($('#Name').val())
        $('#Name')[0].disabled = true;
}
function funEditReceInfo() {
    $('body').addClass('overflow-hidden');
    $("#memberInfo").toggleClass('is-visible');
}
function funEditInvo() {
    $('body').addClass('overflow-hidden');
    $("#divInvoiceType").toggleClass('is-visible');
}

function funEditBuyStore() {
    $('body').addClass('overflow-hidden');
    $("#tkecStore").toggleClass('is-visible');
}
function classPopup(id) {
    $('#' + id).removeClass('is-visible');
    $('body').removeClass('overflow-hidden');
}
function PopupCheck() {
    showLoadingMessage();
    if ($("#buyerInfo").attr('class').indexOf('is-visible') >= 0) {
        var checkBuyer = checkBuyerInfo();
        if (checkBuyer) {
            alert("您的資料未完整填寫，請重新確認並填寫以下欄位：\n" + checkBuyer);
            hideLoadingMessage();
            return;
        }
    }
    if ($("#memberInfo").attr('class').indexOf('is-visible') >= 0) {
        var checkRecipient = checkRecipientInfo();
        if (checkRecipient) {
            alert("您的資料未完整填寫，請重新確認並填寫以下欄位：\n" + checkRecipient);
            hideLoadingMessage();
            return;
        }
    }
    if ($("#divInvoiceType").attr('class').indexOf('is-visible') >= 0) {
        var checkInvoice = checkInvoiceInfo();
        if (checkInvoice) {
            alert("您的資料未完整填寫，請重新確認並填寫以下欄位：\n" + checkInvoice);
            hideLoadingMessage();
            return;
        }
    }
    if ($("#tkecStore").attr('class').indexOf('is-visible') >= 0) {
        var checkStore = checkStoreInfo();
        if (checkStore) {
            alert("您的資料未完整填寫，請重新確認並填寫以下欄位：\n" + checkStore);
            hideLoadingMessage();
            return;
        }
    }

    setTimeout("$('#btnCheck').click();", 300);
    //showLoadingMessage();

    //setTimeout("location.reload();", 500);

}
// 顯示提示訊息的跳窗
function showAlertPopupBox(Pid) {
    $('#alertPopup').show();
    $('#hiddDelPid').val(Pid);
    $('body').addClass('overflow-hidden');
}
// 關閉提示訊息的跳窗
function hideAlertPopupBox() {
    $('#hidDelCarNo').val('');
    $('#alertPopup').hide();
    $('body').removeClass('overflow-hidden');
}
//折價券radio selectedchanged
function actTypeChange() {
    if ($("input:radio[name='acttype']:checked").val()) {
        $('#invoicePhone').val('');
        $('#invoicePhone1').val('');
    }
}
//折價券&購物金&現金抵用券 radio selectedchanged
function discountChange(CarStoreNo,MainProductId) {
    var objId;
    if (MainProductId) {
        if ($("input:radio[name='discount_" + MainProductId + "']:checked").val()) {
            objId = $("input:radio[name='discount_" + MainProductId + "']:checked").val().replace("radCoupon_", "").replace("radDiscount_", "").replace("radCash_","");
            if ($("input:radio[name='discount_" + MainProductId + "']:checked").val().indexOf("Coupon") >= 0) {
                if (!$('#hidCouponCarNo').val())
                    UseCoupon(CarStoreNo, "ChangedBuyGold", $("#coupon_" + objId));
                //$("#coupon_" + objId).show();
                $("#cashcoupon_" + objId).hide();
            }
            else if ($("input:radio[name='discount_" + MainProductId + "']:checked").val().indexOf("Cash") >= 0) {
                if (!$('#hidCashCouponCarNo').val()) {
                    payToTal = $("#orderTotalAmt_" + MainProductId).text();
                    UseCashCoupon(CarStoreNo, "ChangedCash", $("#cashcoupon_" + objId), payToTal)
                }
                console.log("選了現金抵用券")
                $("#coupon_" + objId).hide();
            }
            else {
                $("#coupon_" + objId).hide();
                $("#cashcoupon_" + objId).hide();
            }
        }
    }
}
function showPageCommon(sender) {
    var selfHref = sender.attr('href');
    if (selfHref == "#") return;
    $('body').addClass('overflow-hidden');
    $(selfHref).toggleClass('is-visible');
}
//開啟折價券區塊
function showCouponPage(sender,ID) {
    showPageCommon(sender);
    getProductCoupon(sender,ID);
}

function showCashCouponPage(sender,OrderTotal,ID) {
    showPageCommon(sender);
    getProductCashCoupon(sender, OrderTotal,ID);
}

//開啟還元金區塊
function showBracdCardAmountPage(sender) {
    if ($('.tkecCar_cardNumber')[0].className.indexOf('d-none') >= 0) {
        if (!$('#chkSaleUse')[0].checked)
            $('#chkSaleUse').click();
    }
    showPageCommon(sender);
}
function popupBank(id) {
    $('body').toggleClass('overflow-hidden');
    $("#"+id).toggle();
}
function closeBankPopup(id) {
    $('body').removeClass('overflow-hidden');
    $("#"+id).hide();
}
/* 還元金身分證末4碼驗證 */
function CheckCarBracdMemberSid() {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    var sid = $("#txtSid4").val();
    $.ajax({
        url: "../api/TkecCar/CheckCarBracdMemberSid",
        data: { CarJsonString: key, Sid: sid },
        type: "POST",
        success: function (data) {
            hideLoadingMessage();
            $("#hidCar_Key").val(data.key_value);
            ResetShopCar(false);
            if (data.errMsg) {
                alert(data.errMsg);
                return false;
            }
            else
                location.reload();
        }
    });

    return false;
}

/* 還元金取消使用 */
function cancelBracdCardAmount() {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    $.ajax({
        url: "../api/TkecCar/CancelCarBracdUsed",
        data: { CarJsonString: key },
        type: "POST",
        success: function (data) {
            hideLoadingMessage();
            $("#hidCar_Key").val(data.key_value);
            ResetShopCar(true);
            if (data.errMsg) {
                alert(data.errMsg);
                return false;
            }
            else
                location.reload();
        }
    });

    return false;
}

/* 重整ShopCar Session */
function ResetShopCar(isReload) {
    var key = $("#hidCar_Key").val();
    $.ajax({
        url: "../ashx/tkecCar/ResetShopCar.ashx",
        data: { key_value: key },
        type: "POST",
        success: function (data) {
                if (isReload)
                    location.reload();
        }
    });
}

function changeUserIdentityID() {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    var odID = $("#txtIdentityID").val();
    $.ajax({
        url: "../api/TkecCar/SetIdentity",
        data: { CarJsonString: key, OrdID: odID },
        type: "POST",
        success: function (data) {
            hideLoadingMessage();
            $("#hidCar_Key").val(data.key_value);
            // ResetShopCar(true);
            if (data.errMsg) {
                alert(data.errMsg);
                return false;
            }
            else {
                ResetShopCar(true);
            }

        }
    });

    return false;
}

function changeOD10OrdUser() {
    showLoadingMessage();
    var key = $("#hidCar_Key").val();
    var odUser = $("#txtTk3cNo").val();
    $.ajax({
        url: "../api/TkecCar/SetStoreUser",
        data: { CarJsonString: key, OrdUser: odUser },
        type: "POST",
        success: function (data) {
            hideLoadingMessage();
            $("#hidCar_Key").val(data.key_value);
           // ResetShopCar(true);
            if (data.errMsg) {
                alert(data.errMsg);
                return false;
            }
            else {
                ResetShopCar(true);
            }
                
        }
    });

    return false;
}
/* 檢核訂購資訊 */
function checkOrderInfo() {
    var retMsg = "";
    //檢核訂購人資訊
    retMsg += checkBuyerInfo();
    switch ($('#litPay').text()) {
        case "C": //信用卡付款
        case "L": //LinePay
            //檢核收件人資訊
            retMsg += checkRecipientInfo();
            //檢核發票資訊
            retMsg += checkInvoiceInfo();
            break;
        case "S": //燦坤門市取貨
            if ($('#ddl_ONLINEPay').val() == "X")
                retMsg += "[付款方式]  不可為空\n";
            else {
                if ($('#ddl_ONLINEPay').val() != "3") {
                    //檢核收件人資訊
                    retMsg += checkRecipientInfo();
                    //檢核發票資訊
                    retMsg += checkInvoiceInfo();
                }
            }
            retMsg += checkStoreInfo();
            break;
    }
    
    hideLoadingMessage();
    if (retMsg) {
        alert("您的資料未完整填寫，請重新確認並填寫以下欄位：\n" + retMsg);
        return false;
    }
    else
        return true;
}
/* 檢核訂購人資訊 */
function checkBuyerInfo() {
    var retMsg = "";
    if (!$('#Name').val())
        retMsg += "[訂購人姓名，不可為空]\n";
    if ($('#BuyerTelNumber').val() || $('#BuyerTelAreaCode').val()) {
        var code = $('#BuyerTelAreaCode').val(),
            tel = $('#BuyerTelNumber').val(),
            ext = $('#BuyerTelExt').val();
        if (isNaN(code + tel))
            retMsg += "[訂購人電話(含區碼)，須為數字\n";
        else if ((code.length + tel.length) < 9)
            retMsg += "[訂購人電話(含區碼)，至少9碼]\n";
        else if ((code.length + tel.length) > 10)
            retMsg += "[訂購人電話(含區碼)，超過10碼]\n";
        if (ext && isNaN(ext))
            retMsg += "[訂購人電話分機須為數字]\n";
    }
    if (!$('#BuyerMobile').val())
        retMsg += "[訂購人手機，不可為空]\n";
    else {
        if ($('#BuyerMobile').val().length != 10 || isNaN($('#BuyerMobile').val()))
            retMsg += "[訂購人手機需為10碼數字]\n";
    }
    if (!($('#UCAddrZipCode1_ddlCity').val() && $('#UCAddrZipCode1_ddlTown').val() && $('#UCAddrZipCode1_ddlROAD').val() && $('#UCAddrZipCode1_txtAddr').val()))
        retMsg += "[訂購人聯絡地址，不可為空]\n";
    return retMsg;
}
/* 檢核收件人資訊 */
function checkRecipientInfo() {
    var retMsg = "";
    if (!$('#ReceiveName').val())
        retMsg += "[聯絡人姓名，不可為空]\n";
    if (!$('#ReceiveName').val().length > 15 )
        retMsg += "[聯絡人姓名，長度不可超過15]\n";
    if ($('#ReceiveTelNumber').val() || $('#ReceiveTelAreaCode').val()) {
        var code = $('#ReceiveTelAreaCode').val(),
            tel = $('#ReceiveTelNumber').val(),
            ext = $('#ReceiveTelExt').val();
        if (isNaN(code + tel))
            retMsg += "[聯絡人電話(含區碼)，須為數字\n";
        else if ((code.length + tel.length) < 9)
            retMsg += "[聯絡人電話(含區碼)，至少9碼]\n";
        else if ((code.length + tel.length) > 10)
            retMsg += "[聯絡人電話(含區碼)，超過10碼]\n";
        if (ext && isNaN(ext))
            retMsg += "[聯絡人電話分機須為數字]\n";
    }
    if (!$('#RecevieMobile').val())
        retMsg += "[聯絡人手機，不可為空]\n";
    else {
        if ($('#RecevieMobile').val().length != 10 || isNaN($('#RecevieMobile').val()))
            retMsg += "[聯絡人手機需10碼數字]\n";
    }
    if (!($('#UCAddrZipCode2_ddlCity').val() && $('#UCAddrZipCode2_ddlTown').val() && $('#UCAddrZipCode2_ddlROAD').val() && $('#UCAddrZipCode2_txtAddr').val()))
        retMsg += "[聯絡人連絡地址，不可為空]\n";
    return retMsg;
}

function isInvoice(string) {
    var regexp = /^\/{1}[0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-.]{7}$/;
    return regexp.test(string);
}

/* 檢核發票資訊 */
function checkInvoiceInfo() {
    var retMsg = "";
    //判斷是否為雲端發票
    if ($('#UCCarInvoice_ddl_invoCloud').length > 0) {
        //手機載具條碼
        if ($('#UCCarInvoice_ddl_invoCloud').val() == "phoneCode") {
            if (!$('#UCCarInvoice_txbPhoneCode').val())
                retMsg += "[手機載具條碼，不可為空]\n";
            else {
                //if (!($('#UCCarInvoice_txbPhoneCode').val().length == 8 && !$('#UCCarInvoice_txbPhoneCode').val().match(/[^a-z^A-Z^0-9]/g)))
                if (!($('#UCCarInvoice_txbPhoneCode').val().length == 8))
                    retMsg += "[手機載具條碼為8個英文字或數字，請重新輸入]\n";
                var strPhoneCode = $('#UCCarInvoice_txbPhoneCode').val();                
                if (!(strPhoneCode.substring(0, 1) == "/"))
                {
                    retMsg += "[手機載具條碼首碼需為'/'，請重新輸入]\n";
                }
                if (!isInvoice(strPhoneCode))
                {
                    retMsg += "[手機載具條碼格式錯誤，請重新輸入]\n";
                }               

            }

            if (!$('#UCCarInvoice_txbPhoneCode2').val())
                retMsg += "[確認手機載具條碼，不可為空]\n";
            else {
                //if (!($('#UCCarInvoice_txbPhoneCode2').val().length == 8 && !$('#UCCarInvoice_txbPhoneCode2').val().match(/[^a-z^A-Z^0-9]/g)))
                if (!($('#UCCarInvoice_txbPhoneCode2').val().length == 8))
                    retMsg += "[確認手機載具條碼為8個英文字或數字，請重新輸入]\n";
                var strPhoneCode2 = $('#UCCarInvoice_txbPhoneCode2').val();
                if (!(strPhoneCode2.substring(0, 1) == "/")) {
                    retMsg += "[手機載具條碼首碼需為'/'，請重新輸入]\n";
                }
                if (!isInvoice(strPhoneCode2)) {
                    retMsg += "[手機載具條碼格式錯誤，請重新輸入]\n";
                }      

                if ($('#UCCarInvoice_txbPhoneCode2').val() != $('#UCCarInvoice_txbPhoneCode').val())
                    retMsg += "[您輸入的手機載具條碼不一致，請確認]";
            }
        }
        //自然人憑證條碼
        if ($('#UCCarInvoice_ddl_invoCloud').val() == "personCode") {
            if (!$('#UCCarInvoice_txbPersonCode').val())
                retMsg += "[自然人憑證條碼，不可為空]\n";
            else {
                if (!($('#UCCarInvoice_txbPersonCode').val().length == 16 && !$('#UCCarInvoice_txbPersonCode').val().match(/[^a-z^A-Z^0-9]/g)))
                    retMsg += "[自然人憑證條碼為16個英文字或數字，請重新輸入]\n";
            }

            if (!$('#UCCarInvoice_txbPersonCode2').val())
                retMsg += "[確認自然人憑證條碼，不可為空]\n";
            else {
                if (!($('#UCCarInvoice_txbPersonCode2').val().length == 16 && !$('#UCCarInvoice_txbPersonCode2').val().match(/[^a-z^A-Z^0-9]/g)))
                    retMsg += "[確認自然人憑證條碼為16個英文字或數字，請重新輸入]\n";
                if ($('#UCCarInvoice_txbPersonCode2').val() != $('#UCCarInvoice_txbPersonCode').val())
                    retMsg += "[您輸入的自然人憑證條碼不一致，請確認]";
            }
        }
    }
    //判斷是否為發票捐贈
    if ($('#UCCarInvoice_ddlLoveCode').length > 0) {
        if ($('#UCCarInvoice_ddlLoveCode').val() == "X" && !$('#UCCarInvoice_txbDonation').val())
            retMsg += "[捐贈碼，不可為空]\n";
        else {
            if (isNaN($('#RecevieMobile').val()))
                retMsg += "[捐贈碼須為數字]\n";
        }
    }
    //判斷是否為索取紙本發票
    if ($('#UCCarInvoice_ddl_Paper').length > 0) {
        if ($('#UCCarInvoice_ddl_Paper').val() == "paper_3") {
            if (!$('#UCCarInvoice_txbUniNo').val())
                retMsg += "[統一編號，不可為空]\n";
            else {
                if (!isValidCompanyNo($('#UCCarInvoice_txbUniNo').val()))
                    retMsg += "[請輸入正確統一編號]\n";
            }
        }

        if ($('#UCCarInvoice_ddl_invoReceive').val() == "E") {
            if (!$('#UCCarInvoice_txbInvoName').val())
                retMsg += "[發票收件人，不可為空]\n";
            if (!($('#UCCarInvoice_UCCarZipCode3_ddlCity').val() && $('#UCCarInvoice_UCCarZipCode3_ddlTown').val() && $('#UCCarInvoice_UCCarZipCode3_ddlROAD').val() && $('#UCCarInvoice_UCCarZipCode3_txtAddr').val()))
                retMsg += "[發票地址，不可為空]\n";
        } 
            
    }
    
    return retMsg;
}
/* 檢核統一編號 */
function isValidCompanyNo(taxId) {
    var invalidList = "00000000,11111111";
    if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
        return false;
    }
    var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
        sum = 0,
        calculate = function (product) { // 個位數 + 十位數
            var ones = product % 10,
                tens = (product - ones) / 10;
            return ones + tens;
        };
    for (var i = 0; i < validateOperator.length; i++) {
        sum += calculate(taxId[i] * validateOperator[i]);
    }

    return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
}
function checkStoreInfo() {
    var retMsg = "";
    if (!($('#ulStoreInfo').children()[0].textContent.replace('店名：', '') && $('#ulStoreInfo').children()[1].textContent.replace('地址：', '') && $('#ulStoreInfo').children()[2].textContent.replace('電話：', '')))
        retMsg += "[取貨門市]  不可為空\n";          
    return retMsg;
}

function showErr(msg, url) {
    if (url !== "") {
        alert(msg);
    } else {
        alert(msg);
        location.href = url;
    }
}

$(document).ready(function (e) {

    // 0101add start
    //function changeContentH() {
    //    var windowH = $(window).height();
    //    var navH = $('.tkecCar_navBar').height();
    //    var orderInfoH = $('.tkecCar_orderInfoBox').height();

    //    $('.tkecCar_content').height(windowH - navH - orderInfoH - 40);
    //}

    //$(window).on('resize', function () {
    //    changeContentH();
    //});

    //changeContentH();
    // 0101add end

    // comfrim 跳窗的確認按鈕
    $('#btnCouponConfirm').click(function (e) {
        e.stopPropagation();
        if ($("input:radio[name='acttype']:checked").length == 0) {
            alert('請選擇折價券');
        }
        else {
            var key = $("#hidCar_Key").val();
            var szCouponNo = "";
            if ($("input:radio[name='acttype']:checked").val())
                szCouponNo = $("input:radio[name='acttype']:checked").val();
            else {
                if ($('#invoicePhone').val())
                    szCouponNo = $('#invoicePhone').val();
                else {
                    alert("請輸入折價券號碼");
                    return false;
                }
            }

            $.ajax({
                url: "../api/TkecCar/UseCoupon",
                data: { CarJsonString: key, CarStoreNo: $('#hidCouponCarNo').val(), CouponNo: szCouponNo },
                type: "POST",
                success: function (data) {
                    $("#hidCar_Key").val(data.key_value);
                    ResetShopCar(false);
                    if (data.errMsg)
                        alert(data.errMsg);
                    else {
                        classPopup("saleAct");
                        setTimeout(function () {
                            location.reload(true);
                        }, 500);
                    }
                }
            });
        }
        return false;
    });

    $('#btnCashCouponConfirm').click(function (e) {
        e.stopPropagation();
        if ($("input:radio[name='acttype']:checked").length == 0) {
            alert('請選擇現金抵用券');
        }
        else {
            var key = $('#hidCar_Key').val();
            var szCouponNo = "";
            if ($("input:radio[name='acttype']:checked").val())
                szCouponNo = $("input:radio[name='acttype']:checked").val();
            else {
                if ($('#invoicePhone1').val())
                    szCouponNo = $('#invoicePhone1').val();
                else {
                    alert("請輸入現金抵用券號碼");
                    return false;
                }
            }

            $.ajax({
                url: "../api/TkecCar/UseCashCoupon",
                data: { CarJsonString: key, CarStoreNo: $('#hidCashCouponCarNo').val(), CouponNo: szCouponNo },
                type: "POST",
                success: function (data) {
                    $("#hidCar_Key").val(data.key_value);
                    ResetShopCar(false);
                    if (data.errMsg)
                        alert(data.errMsg);
                    else {
                        classPopup("saleCashCoupon");
                        setTimeout(function () {
                            location.reload(true);
                        }, 500);
                        
                    }
                }
            });
        }
        return false;
    });

    //測試展開效果 
    $('.tkecCar_deliveryBox-typeItem').click(function (e) {
        if (!$(e.target).is('.showPageBtn2')) return;
        $(this).next().toggle().siblings('.tkecCar_deliveryBoxSlider').hide();
    });
    //還元金開關
    $('#chkSaleUse').click(function (e) {
        $('.tkecCar_cardNumber').toggle();
        $('.tkecCar-cardNumberCheckBox').toggle();
    });

    $('.tkecOrder_dropDownBox').click(function (e) {
        e.preventDefault();
        if (e.target.nodeName == "BUTTON") {
            $('.tkecOrder_dropDownBox').toggleClass('open');
        } else {
            $('.tkecOrder_dropDownBox').removeClass('open');
            $('.tkecOrder_dropDownBox-button').text(e.target.textContent);
        }
    });

    $('.tkecOrder_itemDropDownBox-showBtn').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().find('.tkecOrder_dropDownBox-menu').toggleClass('open');
    });

    $('body').click(function (e) {
        if ($(e.target).is('i.tkecOrder_itemDropDownBox-showBtn.fas.fa-ellipsis-v') || $(e.target).is('.tkecOrder_dropDownBox-button')) return;
        $('.tkecOrder_dropDownBox-menu , .tkecOrder_dropDownBox').removeClass('open');
    });

    $('.gotoptone').click(function (e) {
        e.preventDefault();
        $('.tkecCar_content').animate({
            scrollTop: 0
        }, 500);
    });

});