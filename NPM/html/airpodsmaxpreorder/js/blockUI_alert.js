function get_MsgBody(p_msg, p_title, p_Uri, p_BtnText, isRedir) {
    var szBtnText = "";
    if (p_BtnText)
        szBtnText = p_BtnText;
    else
        szBtnText = "確認";
    var msgbody = '<div id="msgbox">';
    msgbody += '<a class="close_btn" href="#" onclick="javascript: $.unblockUI();"></a>';
    msgbody += '<div class="main">';
    msgbody += '<div class="blue_bar">' + p_title + '</div>';
    msgbody += '<div class="content">';
    msgbody += p_msg;
    msgbody += '</div>';
    msgbody += '<div class="btn_area">';
    if (p_Uri != "") {
        if (isRedir)
            msgbody += '<a  onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();" href="#">' + szBtnText + '</a>';
        else
            msgbody += '<a  onclick="javascript: window.open(\'' + p_Uri + '\');$.unblockUI();" href="#">' + szBtnText + '</a>';
    }
    else
        msgbody += '<a  onclick="javascript: $.unblockUI();" href="#">' + szBtnText + '</a>';
    msgbody += '</div>';
    msgbody += '</div>';
    msgbody += '</div>';
    return msgbody;
}

function BlockUI_Alert(p_msg,p_title) {
    var msgbody = get_MsgBody(p_msg, p_title, "", "", false)
    openAlertWindow(msgbody);
}
function BlockUI_Alert_OpenUri(p_msg, p_title,p_Uri) {
    var msgbody = get_MsgBody(p_msg, p_title, p_Uri, "", false)
    openAlertWindow(msgbody);
}
function BlockUI_Alert(p_msg, p_title, p_BtnText) {
    var msgbody = get_MsgBody(p_msg, p_title, "", p_BtnText, false)
    openAlertWindow(msgbody);
}
function BlockUI_Alert_RedirUri(p_msg, p_title, p_Uri) {
    var msgbody = get_MsgBody(p_msg, p_title, p_Uri, "", true)
    openAlertWindow(msgbody);
}

function BlockUI_Alert_RedirUri_IncludePressX(p_msg, p_title, p_Uri) {

    var msgbody = '<div id="msgbox">';
    if (p_Uri !== '') {
        msgbody += '<a class="close_btn" href="#" onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();"></a>';
    } else {
        msgbody += '<a class="close_btn" href="#" onclick="javascript:$.unblockUI();"></a>';
    }
	
	msgbody += '<div class="main">';
	msgbody += '<div class="blue_bar">' + p_title + '</div>';
	msgbody += '<div class="content">';
	msgbody += p_msg;
	msgbody += '</div>';
	msgbody += '<div class="btn_area">';

	
    if (p_Uri !== '') {
        msgbody += '<a onclick="javascript: window.location.href=\'' + p_Uri + '\';$.unblockUI();" href="#">確認</a>';
    } else {
        msgbody += '<a onclick="javascript: $.unblockUI();" href="#">確認</a>';
    }
	msgbody += '</div>';
	msgbody += '</div>';
	msgbody += '</div>';

	openAlertWindow(msgbody);
}

function openAlertWindow(msgbody) {
    var browser_height = document.documentElement.clientHeight / 2;
    var browser_width = document.documentElement.clientWidth / 2;

    if (document.documentElement.clientWidth <= 400) {
        $.blockUI({
            message: (msgbody),
            css: {
                // 一些自定樣式
                width: document.documentElement.clientWidth - document.documentElement.clientWidth/4 + 'px',
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