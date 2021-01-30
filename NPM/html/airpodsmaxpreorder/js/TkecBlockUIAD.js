var tkecAD = "";
function blockScript(id, v) {
    var obj = document.getElementById('header_content');    
    $.ajax({
        url: "Ashx/TkecBlockUIAD.ashx?adid="+id+"&strPreView="+v,
        data: null,
        type: "POST",
        dataType: "text",
        async: false,
        success:
            function (resultMessage, status) {
                if (resultMessage != null) {                    
                    if (resultMessage.length > 0) {
                        tkecAD += "<div id=\"msgbox\">";
                        tkecAD += "<a id=\"adClose\" class=\"close_btn\" href=\"#\"></a>" 
                        tkecAD += "<div class=\"main\">";
                        tkecAD += resultMessage;
                        tkecAD += "</div>";
                        tkecAD += "</div>";
                        tkecAD = resultMessage;
                        $.blockUI({ message: tkecAD,
                            css: {
                                padding: 0,
                                margin: 0,
                                top: obj.offsetTop-10 + 'px',
                                left: obj.offsetLeft + 'px',
                                border: 'none',
                                background: 'none',                                
                                cursor: 'wait'
                            },
                            onOverlayClick: $.unblockUI 
                        });
                    }
                }
            }
    });
    }    
$(function () {
    if (tkecAD != "") {
        $("#adClose").click(

    function () {
        $.unblockUI();
    });      
    }
});