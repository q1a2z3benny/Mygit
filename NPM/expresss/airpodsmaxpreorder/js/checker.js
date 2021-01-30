(function (root, factory) {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = factory(root, exports);
        }
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.checker = factory(root, exports);
        });
    } else {
        root.checker = factory(root, {});
    }
} (this, function (root, checker) {
    'use strict';

    var domain = '*';
    var callbacks = {};

    var qsParams = (function (arr) {
        if (arr == '') {
            return {};
        }

        var narr = {};
        for (var i = 0; i < arr.length; ++i) {
            var varr = arr[i].toLowerCase().split('=', 2);
            if (varr.length == 1) {
                narr[varr[0]] = '';
            } else {
                narr[varr[0]] = decodeURIComponent(varr[1].replace(/\+/g, ' '));
            }
        }

        return narr;
    })(window.location.search.substr(1).split('&'));

    function handler(event) {
        if (event.source === frames['forPostMessage']) {
            var data = /^#localStorage#(\d+)(null)?#([\S\s]*)/.exec(event.data);

            if (data) {
                if (callbacks[data[1]]) {
                    callbacks[data[1]](data[2] === 'null' ? null : data[3]);
                }

                delete callbacks[data[1]];
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener('message', handler, false);
    } else if (window.attachEvent) {
        window.attachEvent('onmessage', handler);
    }

    function getItemByPost(key, callback) {
        var identifier = new Date().getTime();
        var tags = {
            identifier: identifier,
            getTags: key
        };

        callbacks[identifier] = callback;

        try {
            frames['forPostMessage'].postMessage(JSON.stringify(tags), domain);
        } catch (e) {
            if (window.console) {
                console.log('tags error:' + e);
            }
        }
    }

    checker.getTags = function (pid) {
        getItemByPost(pid, function (value) {
            if (window.console) {
                console.log(value);
            }            
            $("#LocalStorageValue").val(value);
        });
    };

    checker.log = function () {
        if (qsParams['pid'] && qsParams['tau'] && qsParams['tab']) {
            var productTag = {
                productTag: 'cmdkey',
                pid: qsParams['pid'],
                tau: qsParams['tau'],
                tab: qsParams['tab']
            };

            try {
                frames['forPostMessage'].postMessage(JSON.stringify(productTag), domain);
            } catch (e) {
                if (window.console) {
                    console.log('productTag error:' + e);
                }
            }
        }

        if (qsParams['tas'] && qsParams['tac'] && qsParams['tad']) {
            var promotionTag = {
                promotionTag: 'cmdkey',
                tas: qsParams['tas'],
                tac: qsParams['tac'],
                tad: qsParams['tad']
            };

            try {
                frames['forPostMessage'].postMessage(JSON.stringify(promotionTag), domain);
            } catch (e) {
                if (window.console) {
                    console.log('promotionTag error:' + e);
                }
            }
        }

        if ($("#tagPid").length) {
            checker.getTags($("#tagPid").val());
        }
    }

    return checker;
}));

$(function () {
    //TODO：正式環境須改為https://www.tkec.com.tw/TracerForm.aspx (請用https protocol存取，避免安全性存取問題)    
    $('body').append('<iframe src="TracerForm.aspx" onload="javascript:checker.log()" name="forPostMessage" style="display:none;"></iframe>');
    //$('body').append('<iframe src="http://172.16.9.14/TracerForm.aspx" onload="javascript:checker.log()" name="forPostMessage" style="display:none;"></iframe>');
    //$('body').append('<iframe src="http://localhost:59154/ec_front_20131101/TracerForm.aspx" onload="javascript:checker.log()" name="forPostMessage" style="display:none;"></iframe>');




});

function LocalStorageClear() {
    alert('aa');
    localStorage.clear();
}