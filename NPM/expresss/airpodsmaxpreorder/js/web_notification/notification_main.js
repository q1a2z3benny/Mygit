const applicationServerPublicKey =
    'BPa8duHWL0iVFQHCx6CqInD1vZSUgQ0eCKPHmh6y4OFr_BLS6MOBWjig-RriDqZUTpU4KHwLTDlT5Cktqle1YyQ';

//=====================================
// Check if Push notification supported
//=====================================
function AskNotificationPremission() {
    Notification.requestPermission(function (status) {
        // This allows to use Notification.permission with Chrome/Safari
        if (Notification.permission !== status) {
            Notification.permission = status;
        }

        if (Notification.permission == "granted") {
            RegisterNotifiactionSW();
            firebaseInit();
        }
    });
}

//===================================
// Register Chrome Notifiaction SW
//===================================
function RegisterNotifiactionSW() {
    // check if sw and push is supported.
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
        navigator.serviceWorker
            .register('/notification_sw.js')
            .catch(err => console.log('1 Service Worker register error: ' + err));

        navigator.serviceWorker.ready.then(swReg => {
            console.log('Notification SW registered', swReg);
            return Promise.resolve(swReg);
        })
        .then(swReg => {
            //wait for sw to be ready before subscribe
            inititalUI(swReg);
            subscribeUser(swReg);
            })
        .catch(err => console.log('2 Service Worker register error: ' + err));
        

        //navigator.serviceWorker
        //    //.register('/notification_sw.js')
        //    .then(swReg => {
        //        let swRegistration = swReg;
        //        console.log('Notification SW registered', swReg);
        //        return Promise.resolve(swRegistration);
        //    })
        //    .then(swRegistration => {
        //        //wait for sw to be ready before subscribe

        //        inititalUI(swRegistration);
        //        subscribeUser(swRegistration);

        //        //firebaseInit();
        //    })
        //    .catch(err => console.log('Service Worker register error: ' + err));

        //navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        //    serviceWorkerRegistration.pushManager.subscribe()
        //        .then(function (subscription) {

        //            //wait for sw to be ready before subscribe
        //            console.log('Notification SW subscribe');
        //            inititalUI(subscription);
        //            subscribeUser(subscription);
        //        }).catch(err => console.log('Service Worker register error: ' + err));
        //    //firebaseInit();
        //});
       

        // call firebase init
        //firebaseInit();

    } else {
        console.log('Push is not supported');
    }
}

//================
// Subscript user
//================
function inititalUI(swRegistration) {
    swRegistration.pushManager.getSubscription().then(subscription => {
        let isSubscription = !(subscription === null);
        if (isSubscription) {
            console.log('[inititalUI] User is subscribed.');
        } else {
            console.log('[inititalUI] User is not subscribed.');
        }
    });
}

//================
// Subscript user
//================
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribeUser(swRegistration) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey
        })
        .then(subscription => {
            console.log('[subscribeUser] User is subscribe.');
        })
        .catch(err => console.log('[subscribeUser] Failed to subscribe the user: ', err));
}



//====================================
// public function: showNotification
//====================================
function ShowNotification(title, options) {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }
    if (Notification.permission !== "granted") {
        console.log('Notification.permission:' + Notification.permission);
        Notification.requestPermission();
    }
    else {
        //ServiceWorkerRegistration.showNotification(title, options);
        //console.log('do ShowNotification');
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    }
}


//================================================
// 使用者開網頁後x秒 顯示推播訊息
//================================================
$(document).ready(function () {
    var delaySeconds = 10000;
    //setTimeout(RegisterNotifiactionSW, delaySeconds);
    if (Notification.permission == 'granted') {
        AskNotificationPremission();
    } else {
        setTimeout(AskNotificationPremission, delaySeconds);
    }
});


