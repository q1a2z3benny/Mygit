function get_MsgBody_fixbox(p_msg, p_title, p_Uri, p_BtnText, isRedir) {
    var szBtnText = "";
    if (p_BtnText)
        szBtnText = p_BtnText;
    else
        szBtnText = "確認";
    var msgbody = '<div class="tkecCar_fixbox" id="divShow1" name="divShow1">';
    msgbody += '<div class="midbg">';
    msgbody += '<div class="fontbox">';
    msgbody += '<p>' + p_msg + '</p>';
    msgbody += '<a id="btnCloseDiv" name="divCloseDiv" onclick="javascript: $.unblockUI();" class="close" href="#"></a>';
    if (p_Uri != "") {
        if (isRedir)
            msgbody += '<a class="btn" onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();" href="#">' + szBtnText + '</a>';
        else
            msgbody += '<a class="btn" onclick="javascript: window.open(\'' + p_Uri + '\');$.unblockUI();" href="#">' + szBtnText + '</a>';
    }
    else
        msgbody += '<a class="btn" onclick="javascript: $.unblockUI();" href="#">' + szBtnText + '</a>';
    msgbody += '</div>';
    msgbody += '</div>';
    msgbody += '</div>';
    //msgbody += '</div>';

    return msgbody;
}

function fixbox_Alert(p_msg, p_title) {
    var msgbody = get_MsgBody_fixbox(p_msg, p_title, "", "", false)
    openAlertWindow_fixbox(msgbody);
}

function fixbox_Alert_OpenUri(p_msg, p_title, p_Uri) {
    var msgbody = get_MsgBody_fixbox(p_msg, p_title, p_Uri, "", false)
    openAlertWindow_fixbox(msgbody);
}

function fixbox_Alert(p_msg, p_title, p_BtnText) {
    var msgbody = get_MsgBody_fixbox(p_msg, p_title, "", p_BtnText, false)
    openAlertWindow_fixbox(msgbody);
}

function fixbox_Alert_RedirUri(p_msg, p_title, p_Uri) {
    var msgbody = get_MsgBody_fixbox(p_msg, p_title, p_Uri, "", true)
    openAlertWindow_fixbox(msgbody);
}

function fixbox_Alert_RedirUri_IncludePressX(p_msg, p_Uri) {
	var msgbody = '<div class="tkecCar_fixbox" id="divShow1" name="divShow1">';
	msgbody += '<div class="midbg">';
	msgbody += '<div class="fontbox">';
    msgbody += '<p>' + p_msg + '</p>';
    if (p_Uri !== '') {
        msgbody += '<a id="btnCloseDiv" name="divCloseDiv" onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();" class="close" href="#"></a>';
    } else {
        msgbody += '<a id="btnCloseDiv" name="divCloseDiv" onclick="javascript: $.unblockUI();" class="close" href="#"></a>';
    }
    if (p_Uri !== '') {
        msgbody += '<a class="btn" onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();" href="#">確認</a>';
    } else {
        msgbody += '<a class="btn" onclick="javascript:$.unblockUI();" href="#">確認</a>';
    }
	
	msgbody += '</div>';
	msgbody += '</div>';
	msgbody += '</div>';
	openAlertWindow_fixbox(msgbody);
}
function openAlertWindow_fixbox(msgbody) {
    var browser_height = document.documentElement.clientHeight / 2;
    var browser_width = document.documentElement.clientWidth / 2;

    if (document.documentElement.clientWidth <= 400) {
        $.blockUI({
            message: (msgbody),
            css: {
                // 一些自定樣式
                width: document.documentElement.clientWidth - document.documentElement.clientWidth / 4 + 'px',
                top: browser_height / 4 + 'px',
                left: '5px',
                border: 'none',
                padding: '15px',
                background: 'none'
            }
        });
    }
    else {
        $.blockUI({
            message: (msgbody),
            css: {
                top: browser_height - 135,
                left: browser_width - 275,
                border: 'none',
                background: 'none'
            }
        });
    }
}