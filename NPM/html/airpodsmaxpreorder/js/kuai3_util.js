
function SetCookie(name, value) {
    var Days = 365;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function GetCookie(name){
    var result = "";
    $.ajax({
        url: '../ashx/GetCookie.ashx',
        type: 'POST',
        dataType: 'text',
        async: false,
        data: {
            CookieName: name
        },
        success: function (data) {
            if (data != "") {
                result = data;
            }
            else {
                result = null;
            }

        },
        error: function (result) {
            result = null;

        }
    });
    return result;
}
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}