var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function getCookie(name) {
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
function funGetCookiesTkecmValue(x) {
    var tkecm = getCookie('tkecm') || '';
    var i;
    var value = "";
    var mparts = tkecm.split('&');
    for (i = 0; i < mparts.length; i++) {
        var item = mparts[i].split("=");
        if (item[0] == x) {
            value = mparts[i].substring(mparts[i].indexOf("=") + 1, mparts[i].length);
        }
    }
    return value;
}

function funGetCookiesTkecPtValue(x) {
    var tkecm = getCookie('tkecPt') || '';
    var i;
    var value = "";
    var mparts = tkecm.split('&');
    for (i = 0; i < mparts.length; i++) {
        var item = mparts[i].split("=");
        if (item[0] == x) {
            value = mparts[i].substring(mparts[i].indexOf("=") + 1, mparts[i].length);
        }
    }
    return value;
}