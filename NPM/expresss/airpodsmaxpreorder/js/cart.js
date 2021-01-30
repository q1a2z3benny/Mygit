
    var strbr = '<br/>';


    $(document).ready(function () {
        //銀行說明
        $('#cart .table2 .content ul li .bank span').mouseenter(function () {
            $(this).parent().find('.detail').show();
        }).mouseleave(function () {
            $(this).parent().find('.detail').hide();
        });

        //索取紙本發票-寄送人(W)
        $('#optlGetWho_0').on('change', function () {
            if ($(this).is(':checked')) {
                $('#spOptlGetWho').hide();
            }
        });
        $('#optlGetWho_1').on('change', function () {
            if ($(this).is(':checked')) {
                $('#spOptlGetWho').hide();
            }
        });
        $('#optlGetWho_2').on('change', function () {
            if ($(this).is(':checked')) {
                $('#spOptlGetWho').show();
            }
        });

        //索取紙本發票-寄送人(S)
        $('#optlGetWhoS_0').on('change', function () {
            if ($(this).is(':checked')) {
                $('#spOptlGetWho').hide();
            }
        });
        $('#optlGetWhoS_1').on('change', function () {
            if ($(this).is(':checked')) {
                $('#spOptlGetWho').show();
            }
        });
    });



    document.onkeydown = function () {
        /*
        (ctrlKey == true && keyCode == 82)   Ctrl+R   ---刷新
        (keyCode == 116)                     F5       ---刷新
        (ctrlKey == true && keyCode == 116)  Ctrl+F5  ---强制刷新
        */
        //window.alert(event.keyCode);
        var k = event.keyCode;
        if ((event.ctrlKey == true && k == 82) || (k == 116) || (event.ctrlKey == true && k == 116)) {
            //return (window.confirm("关闭?"));
            event.keyCode = 0;
            event.returnValue = false;
            event.cancelBubble = true;
        }
    };

    function ScriptAct(orderno) {
        window.onbeforeunload = function () {
            $.ajax({
                type: "POST",
                url: "../Ashx/OrderHead.ashx",
                data: "OrderNo=" + orderno,
                dataType: "json",
                success:
                function (resultMessage, status) {
                }
            });
        };
    }

    function ScriptEsc() {
        window.onbeforeunload = null;
    }

    $(function () {
        
        //帶入會員資料For btn_MemberData
        $("#btn_MemberData").click(function () {
            $("#txt_CardName").val($("#hf_CardName").val());
            $("#txt_CardSID").val($("#hf_CardSID").val());
            $("#txt_CardBirthday_Year").val($("#hf_CardBirthday_Year").val());
            $("#txt_CardBirthday_Month").val($("#hf_CardBirthday_Month").val());
            $("#txt_CardBirthday_Day").val($("#hf_CardBirthday_Day").val());
        });
        
    });

    function SelectToCartType() {
        document.getElementById('tbx_Card_Number1').value = '';
        document.getElementById('tbx_Card_Number2').value = '';
        document.getElementById('tbx_Card_Number3').value = '';
        document.getElementById('tbx_Card_Number4').value = '';
        var lst = document.getElementById('optlCardType');
        var input = lst.getElementsByTagName('input');
        if (input[0].checked) {
            document.getElementById('tbx_Card_Number4').style.display = "";
            document.getElementById('spanMinus').style.display = "";
            document.getElementById('labelCardDesc').innerHTML = '三';
            document.getElementById('spanCardLength').innerHTML = '6';
            $("#tbx_Card_Number2").animate({ "width": "70px" }, 0);
            $("#tbx_Card_Number3").animate({ "width": "70px" }, 0);
        } else if (input[1].checked) {
            document.getElementById('tbx_Card_Number4').style.display = "None";
            document.getElementById('spanMinus').style.display = "None";
            document.getElementById('labelCardDesc').innerHTML = '四';
            document.getElementById('spanCardLength').innerHTML = '5';
            $("#tbx_Card_Number2").animate({ "width": "105px" }, 0);
            $("#tbx_Card_Number3").animate({ "width": "88px" }, 0);
        }
    }

    function TextBoxFocus(id, id2) {
        var lst = document.getElementById('optlCardType');
        var input = lst.getElementsByTagName('input');
        if (input[0].checked && document.getElementById(id).value.length >= 4) {
            document.getElementById(id).value = document.getElementById(id).value.substring(0, 4);
            document.getElementById(id2).focus();



        } else if (input[1].checked) {
            if (id == 'tbx_Card_Number2' && document.getElementById(id).value.length >= 6) {
                document.getElementById(id2).focus();
            } else if (id == 'tbx_Card_Number3' && document.getElementById(id).value.length >= 5) {
                document.getElementById('ddl_Expiration_Month').focus();
            } else if (document.getElementById(id).value.length >= 4 && id != 'tbx_Card_Number2' && id != 'tbx_Card_Number3') {
                document.getElementById(id2).focus();
            }
        }
    }

    function TextBoxFocus2(id, id2) {
        if (document.getElementById(id).value.length == 2)
            document.getElementById(id2).focus();
    }

    function TextBoxFocus3(id, id2) {
        var lst = document.getElementById('optlCardType');
        var input = lst.getElementsByTagName('input');
        if (input[0].checked && document.getElementById(id).value.length >= 3) {
            document.getElementById(id).value = document.getElementById(id).value.substring(0, 3);
            document.getElementById(id2).focus();
        } else if (input[1].checked && document.getElementById(id).value.length >= 4) {
            document.getElementById(id).value = document.getElementById(id).value.substring(0, 4);
            document.getElementById(id2).focus();
        }
    }

    function OnCheck(obj) {
        if ($(obj).attr('checked', false)) {
            $("#btnSubmit").attr('disabled', true);
            $("#btnSubmit2").attr('disabled', true);
        }
    }

    function RaidoChecked(i, obj) {
        $('input[name="radioBanks"]')[i].checked = true;
        $("li").css("background-color", "");
        $(obj).css("background-color", "#b1d8fa");
    }

    function RaidoCheckedInvoice(i) {
        $('input[name="radInvoice"]')[i].checked = true;
        $(".e_invoice div").hide();
        $("#panInvoice" + i).show();
        $("#iv_no" + i).show();
        if (i == 2) {
            RaidoCheckedInvoice2(2);
        }       
    }

    function RaidoCheckInvoType(i) {
        if (i == 0) {
            $("#iv_no").css("display", "");
        } else{
            $("#iv_no").css("display", "none")
        }
    }

    function RaidoCheckedInvoice2(i) {
        $("#iv_no2").hide();
        $("#iv_no1").hide();
        $("#iv_no" + i).show();
    }

    function RaidoCheckedInvoice3(i) {
        $('input[name="radivno2"]')[i].checked = true;
        
        if (i == 0) {
            $("#divivnos").hide();
        } else if (i == 1) {            
            document.getElementById('label1').innerHTML = '手機載具';
            document.getElementById('label2').innerHTML = '手機載具';
            document.getElementById('SpanCodeA').innerHTML = '7';
            document.getElementById('SpanCodeB').innerHTML = '7';
            document.getElementById('textp2').setAttribute('maxlength', '7');            
            document.getElementById('textm2').setAttribute('maxlength', '7');
            document.getElementById('textp2').value = "";
            document.getElementById('textm2').value = "";

            $("#divivnos").show();
            $("#spanD").show();
        } else if (i == 2) {
            document.getElementById('label1').innerHTML = '自然人憑證';
            document.getElementById('label2').innerHTML = '自然人憑證';
            document.getElementById('SpanCodeA').innerHTML = '16';
            document.getElementById('SpanCodeB').innerHTML = '16';
            document.getElementById('textp2').setAttribute('maxlength','16');
            document.getElementById('textm2').setAttribute('maxlength','16');
            document.getElementById('textp2').value = "";
            document.getElementById('textm2').value = "";

            $("#divivnos").show();            
            $("#spanD").hide();
        }

    }

    function RadioLoveCode(intKind) {
        switch (intKind) {
            case 1:
                $("#txtLoveCode").val('');
                $("#txtLoveCode").attr('disabled', true);

                $("#ddlLoveCode").attr('disabled', false);
                break;
            case 2:
                $("#txtLoveCode").attr('disabled', false);

                $("#ddlLoveCode").val('0');
                $("#ddlLoveCode").attr('disabled', true);                
                break;
        }        
    }

    function checkOrderReturnName()
    {
        var msg = '';
        var strbr = '<br/>';

        msg += checkName('ctl00_ContentPlaceHolder1_OrderItemList1_rpt_OrderItemList_ctl02_tb_ReceiveName', '聯絡人');

        if (msg.trim() != '') {
            var msgTitle = '您的資料未完整填寫/錯誤，請重新確認並填寫以下欄位：';
            BlockUI_Alert(msg, msgTitle);
            return false;
        }
        return true;
    }

    function checkCart() {
        var msg = '';
        var strbr = '<br/>';        
                        
        if ($('#divHY').length > 0 && $("#divHY").is(":visible")) {
            msg += '[該地區並無可取貨之門市]' + strbr;
        }
        msg += checkRaido('rblGetProductStore','1', '指定取貨的門市');
        msg += checkRaido('optlDate', '_0', '請選擇約定時間');
        if (checkRaido('optlDate', '_0', '請選擇約定時間').length == 0) {
            msg += checkRaido('optlTime', '_0', '請選擇約定時間');
        }
        
        msg += checkName('name', '訂購人姓名');
        msg += checkItem('mobile', '訂購人手機');
        if (checkItem('mobile', '訂購人手機').length == 0) {
            msg += checkPhone('mobile', '訂購人手機');
        }
        msg += checkItem('UCAddrZipCode1_ddlCity', '訂購人連絡地址');
        if (checkItem('UCAddrZipCode1_ddlCity', '訂購人連絡地址').length == 0) {
            msg += checkItem('UCAddrZipCode1_ddlTown', '訂購人連絡地址');
        }
        if (checkItem('UCAddrZipCode1_ddlTown', '訂購人連絡地址').length == 0) {
            msg += checkItem('UCAddrZipCode1_txtAddr', '訂購人連絡地址');
        }



        msg += checkName('receive_name', '收件人姓名');
        msg += checkItem('receive_mobile', '收件人手機');
        if (checkItem('receive_mobile', '收件人手機').length == 0) {
            msg += checkPhone('receive_mobile', '收件人手機');
        }

        msg += checkItem('UCAddrZipCode2_ddlCity', '收件人連絡地址');
        if (checkItem('UCAddrZipCode2_ddlCity', '收件人連絡地址').length == 0) {
            msg += checkItem('UCAddrZipCode2_ddlTown', '收件人連絡地址');
        }
        if (checkItem('UCAddrZipCode2_ddlTown', '收件人連絡地址').length == 0) {
            msg += checkItem('UCAddrZipCode2_txtAddr', '收件人連絡地址');
        }


        //信用卡頁
        msg += checkItem('tbx_Card_Number1', '信用卡卡號');
        if (checkItem('tbx_Card_Number1', '信用卡卡號').length == 0) {
            msg += checkItem('tbx_Card_Number2', '信用卡卡號');
        }
        if (checkItem('tbx_Card_Number2', '信用卡卡號').length == 0) {
            msg += checkItem('tbx_Card_Number3', '信用卡卡號');
        }

        if ($("#optlCardType_0").length > 0) {
            if ($('input:radio[name=optlCardType]:checked').val() == 'VISA、MasterCard、JCB') {
                if (checkItem('tbx_Card_Number3', '信用卡卡號').length == 0) {
                    msg += checkItem('tbx_Card_Number4', '信用卡卡號');
                }
                msg += checkItem('tbx_Last_3_Number', '信用卡後3碼');
                if (checkItem('tbx_Last_3_Number', '信用卡後3碼').length == 0) {
                    msg += checkLength('tbx_Last_3_Number',3, '信用卡後碼');
                }
            }else {
                msg += checkItem('tbx_Last_3_Number', '信用卡後4碼');
                if (checkItem('tbx_Last_3_Number', '信用卡後4碼').length == 0) {
                    msg += checkLength('tbx_Last_3_Number', 4, '信用卡後碼');
                }
            }
        }
        //msg += checkItem('txt_CardName', '持卡人姓名');
        //msg += checkID('txt_CardSID', "持卡人身份證字號");
//        if ($("#UCBirthday_ddlYear").length > 0) {
//            msg += checkSelect('UCBirthday_ddlYear', 'UCBirthday_ddlMonth', 'UCBirthday_ddlDay', '持卡人出生年月日');
//        }

        if ($("#radioivo").length > 0) {
            switch ($('input:radio[name=radInvoice]:checked').val()) {
                case '電子發票':
                    var selectc = $('input:radio[name=radivno2]:checked').val();
                    if (selectc == '1') {
                        if (checkItem('textp2', '手機載具條碼').length > 0) {
                            msg += checkItem('textp2', '手機載具條碼');
                        } else {
                            msg += checkItem('textm2', '手機載具條碼');
                        }
                        if ($("#textp2").val() != $("#textm2").val() && checkItem('textm2', '手機載具條碼') == '') {
                            msg += '[請再次確認手機載具條碼]' + strbr;
                        } else if (checkItem('textm2', '手機載具條碼') == '' && checkItem('textm2', '手機載具條碼') == '') {
                            msg += checkPCode('textm2', '手機載具條碼');
                        }
                    } else if (selectc == '2') {
                        if (checkItem('textp2', '自然人憑證條碼').length > 0) {
                            msg += checkItem('textp2', '自然人憑證條碼');
                        } else {
                            msg += checkItem('textm2', '自然人憑證條碼');
                        }
                        if ($("#textp2").val() != $("#textm2").val() && checkItem('textm2', '自然人憑證條碼') == '') {
                            msg += '[請再次確認自然人憑證條碼]' + strbr;
                        } else if (checkItem('textm2', '自然人憑證條碼') == '' && checkItem('textm2', '自然人憑證條碼') == '') {
                            msg += checkICode('textm2', '自然人憑證條碼');
                        }
                    }
                    break;
                case '統一編號':
                    msg += checkItem('iv_no', '統一編號');
                    if (checkItem('iv_no', '統一編號').length == 0) {
                        msg += checkLength('iv_no',8, '統一編號需8碼');
                    }
                    if ($('input:radio[name=radivno]:checked').val() == '2') {
                        if (checkItem('textp', '手機載具條碼').length > 0) {
                            msg += checkItem('textp', '手機載具條碼');
                        } else {
                            msg += checkItem('textm', '手機載具條碼');
                        }
                        if ($("#textp").val() != $("#textm").val() && checkItem('textm', '手機載具條碼') == '') {
                            msg += '[請再次確認手機載具條碼]' + strbr;
                        } else if (checkItem('textm', '手機載具條碼') == '' && checkItem('textm', '手機載具條碼') == '') {
                            msg += checkPCode('textm', '手機載具條碼');
                        }
                    }
                    break;
                case '愛心碼':
                    msg += checkItem('txtLoveCode', '愛心碼');                                      
                    break;
            }
        }

        if ($("#checkboxt").length > 0) {
            if (!$("#checkboxt").prop('checked')) {
                msg += "您未勾選電子交易條款" + strbr;
            }
        }

        if (msg.trim() != '') {
            var msgTitle = '您的資料未完整填寫/錯誤，請重新確認並填寫以下欄位：';
            BlockUI_Alert(msg, msgTitle);
            return false;
        }
        return true;
    }

    function checkItem(name, value) {
        if ($("#" + name).length > 0) {
            var strbr = '<br/>';
            if ($("#" + name).val().trim().replace(value,'') == '') {
                return '[' + value + ']未填寫' + strbr;
            }
        }
        return '';
    }
    
    function checkName(name, value) {
        var msg = '';
        if ($("#" + name).length > 0) {
            var strbr = '<br/>';
            var reg;
            if ($("#" + name).val().trim().replace(value, '') == '') {
                return '[' + value + ']未填寫' + strbr;
            }
            //} else if ($("#" + name).val().trim() != '') {
            //    var v = $("#" + name).val().trim();
            //    reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
            //    if (!reg.test(v)) {
            //        msg = '您所輸入的' + value + '有誤，請勿輸入符號。' + strbr;
            //    }
            //}
        }
        return msg;
    }

    function checkRaido(name,num, value) {
        var strbr = '<br/>';
        if ($("#" + name + num).length > 0) {
            if ($('input:radio[name=' + name + ']:checked').val() == undefined) {
                return '[' + value + ']' + strbr;
            }
        }        
        return '';
    }

    function checkSelect(name,name2,name3, value) {
        var strbr = '<br/>';        
        if ($("#" + name).get(0).selectedIndex == 0 || $("#" + name2).get(0).selectedIndex == 0 || $("#" + name3).get(0).selectedIndex == 0) {
            return '[' + value + ']未填寫' + strbr;
        }
        return '';
    }
        
    function checkLength(name,num, value) {
        if ($("#" + name).length > 0) {
            var strbr = '<br/>';
            if ($("#" + name).val().trim().length != num) {
                return '[' + value + ']請填寫' + num + '位數字' + strbr;
            }
        }
        return '';
    }

    function checkID(name, value) {
        var msg = '';
        if ($("#" + name).length > 0) {
            var strbr = '<br/>';
            var reg;
            if ($("#" + name).val().trim() == '') {
                return '[' + value + ']未填寫' + strbr;
            } else {
                var id = $("#" + name).val().trim();
                var temp = '[' + value + ']格式不對' + strbr;
                reg = /^[a-zA-Z][1-2]\d{8}$/;
                if (!reg.test(id)) {
                    msg = temp;
                }
                var tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
                var a1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
                var a2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
                var mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

                if (id.length != 10) msg = temp;
                var i = tab.indexOf((id.charAt(0)).toUpperCase());
                if (i == -1) msg = temp;
                var sum = a1[i] + a2[i] * 9;
                for (i = 1; i < 10; i++) {
                    var v = parseInt(id.charAt(i));
                    if (isNaN(v)) msg = temp;
                    sum = sum + v * mx[i];
                }
                if (sum % 10 != 0) msg = temp;
            }
        }
        return msg;
    }

    function checkPhone(name, value) {
        if ($("#" + name).length > 0) {
            var strbr = '<br/>';
            var msg = '';
            var reg = '';
            if ($("#" + name).val().trim() != '') {
                var mobile = $("#" + name).val().trim();
                reg = /^(0)(9)([0-9]{8})$/;
                if (mobile.length < 10) {
                    msg += '[' + value + ']不足10碼' + strbr;
                } else if (!reg.test(mobile)) {
                    msg += '[' + value + ']您所輸入的' + value + '號碼有誤' + strbr;
                }
            }
            return msg;
        }
        return '';
    }

    function checkPCode(name, value) {
        var strbr = '<br/>';
        var msg = '';
        var reg = '';
        if ($("#" + name).val().trim() != '') {
            var mobile = $("#" + name).val().trim();
            if (mobile.Left(1) == '/' && mobile.length == 8) {
                mobile = mobile.replace('/', '');
            }
            reg = /^[-.+0-9A-Za-z]{7}$/;
            if (!reg.test(mobile)) {
                msg += '您所輸入的' + value + '有誤，請重新確認。' + strbr;
            }
        }
        return msg;
    }

    String.prototype.Left = function(n) {
        if (n <= 0)
            return "";
        else if (n > String(this).length)
            return this;
        else
            return String(this).substring(0, n);
    };

    String.prototype.Right = function(n) {
        if (n <= 0)
            return "";
        else if (n > String(this).length)
            return this;
        else {
            var iLen = String(this).length;
            return String(this).substring(iLen, iLen - n);
        }
    };

    function checkICode(name, value) {
        var strbr = '<br/>';
        var msg = '';
        var reg = '';
        if ($("#" + name).val().trim() != '') {
            var mobile = $("#" + name).val().trim();
            reg = /^[A-Za-z]{2}\d{14}$/;
            if (!reg.test(mobile)) {
                msg += '您所輸入的' + value + '條碼有誤，請重新確認。' + strbr;
            }
        }
        return msg;
    }

    function ivoMsg() {
        if ($('input:radio[name=radInvoice]:checked').val() != '列印紙本電子發票') {
            var msg;
            msg = '1.為了愛地球，建議您使用電子發票，不索取"紙本"電子發票以減少地球上樹木的消失。' + strbr;
            msg += '2.使用電子發票，奇數月26日電腦自動對獎後中獎會mail並掛號寄出紙本發票給您。' + strbr;
            msg += '3.使用電子發票，退貨時不會因為找不到紙本電子發票而導致無法退款之情事。' + strbr;
            BlockUI_Alert(msg, '列印"紙本"電子發票');
        }
    }

    function ajaxStartLink(x) {
        document.getElementById("hiddenUrlIndex").value = x;        
        $.blockUI({
            message: $('<iframe src="../Message/ComfirmWindow.aspx" scrolling="no" allowtransparency="yes" frameborder="0" border="0" cellspacing="0" id="plusframe" width="500" height="280" ></iframe>'),
            css: {
                top: '30%',
                left: '30%',
                width: '670px',
                border: 'none',
                background: 'none'
            }
        }
        );
        return false;
    }
    
    function WithOrder() {
        CopyData('name', 'receive_name');
        CopyData('tel', 'receive_tel');
        CopyData('mobile', 'receive_mobile');
        //CopyData2('UCAddrZipCode1_ddlCity', 'UCAddrZipCode2_ddlCity');
        //CopyData2('UCAddrZipCode1_ddlTown', 'UCAddrZipCode2_ddlTown');
        CopyData('UCAddrZipCode1_txtAddr', 'UCAddrZipCode2_txtAddr');
    }

    function CopyData(name,name2) {
        if ($("#" + name).length > 0 && $("#" + name2).length > 0) {
            $("#" + name2).val($("#" + name).val());
        }
    }

    function CopyData2(name, name2) {
        if ($("#" + name).length > 0 && $("#" + name2).length > 0) {
            $("#" + name2)[0].selectedIndex = $("#" + name).get(0).selectedIndex;
        }
    }

    function ajaxStart() {
        $.blockUI({
            message: $('<iframe src="../Message/CartMsg.aspx" scrolling="no" allowtransparency="yes" frameborder="0" border="0" cellspacing="0" id="plusframe" width="500" height="280" ></iframe>'),
            css: {
                top: '30%',
                left: '30%',
                border: 'none',
                background: 'none'
            }
        }
        );
        return false;
    }

    function ajaxStartReturn() {
        $.blockUI({
            message: $('<iframe src="../Message/ReturnMsg.aspx" scrolling="no" allowtransparency="yes" frameborder="0" border="0" cellspacing="0" id="plusframe" width="500" height="280" ></iframe>'),
            css: {
                top: '30%',
                left: '30%',
                width: '670px',
                border: 'none',
                background: 'none'
            }
        }
        );
        return false;
    }

    function ajaxStops2() {
        $.unblockUI();
    }

    function ajaxStops() {
        $.unblockUI();
        form1.submit();
    }

    function ajaxStop() {
        $.unblockUI();        
    }
