//==================================
// Firebase project configuration
//==================================
var config = {
    //apiKey: "AIzaSyCWqblj4QCCN1Y2eNLnIOhjn5pSs766Do8",
    //authDomain: "fir-web-notification.firebaseapp.com",
    //databaseURL: "https://fir-web-notification.firebaseio.com",
    //projectId: "fir-web-notification",
    //storageBucket: "fir-web-notification.appspot.com",
    //messagingSenderId: "238400385326"
    apiKey: "AIzaSyAi83gRGEw3hPOcodqQ89rf7yvPE19Mh-E",
    authDomain: "kuai3-1181.firebaseapp.com",
    databaseURL: "https://kuai3-1181.firebaseio.com",
    projectId: "kuai3-1181",
    storageBucket: "",
    messagingSenderId: "511797979792"
};

var WebToken;
//=============================
// Grant Permissions
//=============================
//console.log('getting sessionid');
var cookieName_token = 'web_token';
//firebaseInit();

function firebaseInit() {
    console.log('firebaseInit');

    firebase.initializeApp(config);
    const messaging = firebase.messaging();
    messaging.requestPermission()
        .then(function () {
            console.log('Have f permission.')
            return messaging.getToken();
        })
        .then(function (token) {
            if (token) {
                WebToken = token;
                SetCookie(cookieName_token, WebToken);
                var sessionId = GetCookieValue('tkecPt', 'SessionID');
                var memberId = GetCookieValue('tkecm', 'ID');
                //console.log('memberId:' + memberId);
                RegisterWebToken(sessionId, token, memberId);
                // TODO: send token back to server api 
                //sendTokenToServer(currentToken);
                //updateUIForPushEnabled(currentToken);
            }
            else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                //updateUIForPushPermissionRequired();
                //setTokenSentToServer(false);
            }
        })
        .catch(function (err) {
            console.log('err: ' + err);
            //setTokenSentToServer(false);
        });


    //================================================
    // whenever token is refreshed
    //================================================
    messaging.onTokenRefresh(function () {
        messaging.getToken()
            .then(function (token) {
                console.log('refreshed token:' + token);
                WebToken = token;
                SetCookie(cookieName_token, WebToken);
                var sessionId = GetCookieValue('tkecPt', 'SessionID');
                var memberId = GetCookieValue('tkecm', 'ID');
                RegisterWebToken(sessionId, token, memberId);
            })
            .catch(function (err) {
                console.log('Unable to retrieve refreshed token ', err);
            });
    });

    //===================================
    // When Receive Message from server
    //===================================
    messaging.onMessage(function (data) {
        console.log('onMessage: ' + JSON.stringify(data));
        var action_id = data.data.action_id;
        var message = JSON.parse(data.data.message); // convert to Json Object from json string

        switch (action_id) {
            case "1": // actionID = 1, server api call responses
                var title = message.title;
                var options = message.options;
                var delaySeconds = 1000;
                setTimeout(function () {
                    ShowNotification(title, options);
                }, delaySeconds);

                break;
            case "2": // actionID = 2, Notifications
                var title = message.title;
                var options = message.options;
                ShowNotification(title, options);
                break;
        }

    });

}






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

function GetCookieValue(cookieName, key) {
    var ret = '';
    key = key + '=';
    var tVals = '' + GetCookie(cookieName);
    if (tVals != '') {
        var str_array = tVals.split("&");
        for (var i = 0; i < str_array.length; i++) {
            if (str_array[i].startsWith(key)) {
                ret = str_array[i].replace(key, '');
                break;
            }
        }
    }
    return ret;
}

function RegisterWebToken(sessionId, sToken, memberId) {
    var jsonObj = {};
    //prepare json data
    jsonObj['Token'] = sToken;
    jsonObj['SessionId'] = sessionId;
    jsonObj['MemberId'] = memberId;
    var postData = JSON.stringify(jsonObj);

    $.ajax({
        type: "POST",
        url: '/api/WebNotification/RegisterWebToken',
        // The key needs to match your method's input parameter (case-sensitive).
        data: postData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('RegisterWebToken success, responses:' + JSON.stringify(data)); 
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}






