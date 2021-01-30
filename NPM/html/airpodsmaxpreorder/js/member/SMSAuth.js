// 簡訊驗證模組
var SMSAuth = (function SMSAuth() {
    var COUNTDOWN_NUM = 180; // 倒數時間
    var COUNTDOWN_OBJ = {}; // 記錄倒數物件

    // 驗證手機格式
    function verfiyMobile(mobileNumber) {
        var isPass = false,
            errorMsg = '';

        if (mobileNumber === '')
            errorMsg = '[手機號碼] 未填寫';
        else if (mobileNumber.length < 10)
            errorMsg = '[手機號碼] 不足10碼';
        else if (!/^(0)(9)([0-9]{8})$/.test(mobileNumber))
            errorMsg = '[手機號碼] 您所輸入的手機號碼有誤，請重新確認\r\n手機號碼為10碼數字，且09XX開頭';
        else
            isPass = true;

        return {
            isPass: isPass,
            errorMsg: errorMsg
        };
    }

    // 發送簡訊驗證碼 (手機欄位, 發送按鈕, 倒數物件ID)
    function sendSMS(mobileTarget, sendBtnTarget, countdownTargetID) {
        // 手機欄位 & 發送按鈕
        if (!mobileTarget || !sendBtnTarget) return false;
        // 如果按鈕禁用
        if (sendBtnTarget.disabled) return false;

        sendBtnTarget.disabled = true;

        // 驗證手機格式
        var check = verfiyMobile(mobileTarget.value);
        if (!check.isPass) {
            mobileTarget.focus();
            alert(check.errorMsg);
            sendBtnTarget.disabled = false;
        } else {
            // 發送簡訊
            var xhr = new XMLHttpRequest();
            xhr.open('POST', location.origin + '/api/SMS/GetSMSAuthCode');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.isSuccess) {
                        successToast('簡訊發送成功。');
                        // mobileTarget.readOnly = true;

                        // 倒數物件 (若無另外設置，則預設為發送按鈕)
                        var countdownTarget = !countdownTargetID ? sendBtnTarget : document.getElementById(countdownTargetID);
                        // 回呼函式
                        var callback = function () {
                            sendBtnTarget.disabled = false;
                        }
                        countdown(COUNTDOWN_NUM, countdownTarget, callback);
                    } else {
                        errorToast(result.message);
                        sendBtnTarget.disabled = false;
                    }
                } else if (xhr.status !== 200) {
                    console.log('Request failed.  Returned status of ' + xhr.status);
                    sendBtnTarget.disabled = false;
                }
            };
            xhr.send(JSON.stringify({
                mobileNumber: mobileTarget.value
            }));
        }
    }

    // 倒數 (倒數秒數, 倒數物件, 回呼函式)
    function countdown(countdownNum, countdownTarget, callback) {
        // 判斷整數
        if (parseInt(countdownNum, 10) !== countdownNum) return false;
        // 檢查倒數物件
        if (!countdownTarget) return false;

        // 記錄至倒數物件集合
        var obj = COUNTDOWN_OBJ = {
            target: countdownTarget,
            originalText: countdownTarget.innerHTML ? countdownTarget.innerHTML : countdownTarget.value,
            intervalID: null,
            callback: callback
        };

        // 開始倒數
        obj.target.innerHTML = obj.target.value = countdownNum + ' 秒後，可再次發送。';
        obj.intervalID = setInterval(function () {
            countdownNum--;
            obj.target.innerHTML = obj.target.value = countdownNum + ' 秒後，可再次發送。';

            if (countdownNum === 0) {
                clearCountdownInterval();
            }
        }, 1000);
    }

    // 取消倒數 (倒數物件ID)
    function clearCountdownInterval() {
        var obj = COUNTDOWN_OBJ;
        if (obj.target && obj.intervalID) {
            clearInterval(obj.intervalID);
            obj.target.innerHTML = obj.target.value = obj.originalText;

            if (obj.callback) obj.callback();

            COUNTDOWN_OBJ = {};
        }
    }

    // SVG圖示
    var successIcon = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>';
    var errorIcon = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>';

    // TODO: 抽出至訊息(通用)模組
    // 通知 type [1=成功, 2=失敗]
    function successToast(msg) {
        toast(1, successIcon + '<span> ' + msg + '</span>');
    }

    function errorToast(msg) {
        toast(2, errorIcon + '<span> ' + msg + '</span>');
    }

    function toast(type, msg) {
        var toastWrapper = document.createElement('div');
        var toastContent = document.createElement('div');
        toastWrapper.appendChild(toastContent);
        document.body.appendChild(toastWrapper);
        toastWrapper.classList.add('sms-toast');
        if (type === 1)
            toastWrapper.classList.add('success');
        else {
            toastWrapper.classList.add('error');
        }

        toastContent.innerHTML = msg;

        setTimeout(function () {
            toastWrapper.classList.add('active');
        }, 100);
        setTimeout(function () {
            toastWrapper.classList.remove('active');
            setTimeout(function () {
                toastWrapper.parentNode.removeChild(toastWrapper);
            }, 300);
        }, 2000);
    }
    // 通知樣式
    var styles = [".sms-toast{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;text-align:center;opacity:0;transition-property:opacity;transition:0.3s ease-in-out;}",
        ".sms-toast.active{opacity:1;}",
        ".sms-toast>div{margin:0 auto;padding:20px;border:3px solid;border-radius:5px;max-width:90%;display:inline-block;text-align:left}",
        ".sms-toast>div>*{vertical-align:middle}",
        "sms-toast svg path{fill:currentColor}",
        ".sms-toast.success>div{color:#155724;background-color:#d4edda;border-color:#c3e6cb}",
        ".sms-toast.error>div{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}`;"
    ].join('');
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return {
        verfiyMobile: verfiyMobile,
        sendSMS: sendSMS,
        clearCountdownInterval: clearCountdownInterval
    }
})();