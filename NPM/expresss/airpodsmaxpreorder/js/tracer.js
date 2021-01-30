(function (root, factory) {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = factory(root, exports);
        }
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.tracer = factory(root, exports);
        });
    } else {
        root.tracer = factory(root, {});
    }
}(this, function (root, tracer) {
    'use strict';

    var productTagPrefix = 'product_tag_pid_';
    var productTagLimitCount = 20;
    var promotionTagPrefix = 'promotion_tag_';
    var promotionTagLimitCount = 20;
    var promotionTagExpireDay = 30;

    function setTag(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify({ 'data': value }));
        } catch (e) {
            if (console) {
                console.warn('setTag {' + key + ': ' + value + '} error.');
            }
        }
    };

    function getTag(key) {
        var tagString = null;

        try {
            tagString = localStorage.getItem(key);
        } catch (e) {
            if (console) {
                console.warn('getTag {' + key + '} error.');
            }
        }

        if (tagString) {
            var value = null;

            try {
                value = JSON.parse(tagString);
            } catch (e) {
                value = { data: tagString };
            }

            if (typeof value === 'object' && typeof value.data !== 'undefined') {
                return value.data;
            } else {
                return value;
            }
        } else {
            return null;
        }
    };

    function getAllKeys(prefix) {
        var keys = [];

        try {
            var allKeys = [];
            for (var key in localStorage) {
                allKeys.push(key);
            }

            if (typeof prefix === 'undefined') {
                return allKeys;
            }

            for (var key in allKeys) {
                if (allKeys[key].indexOf(prefix) !== -1) {
                    keys.push(allKeys[key]);
                }
            }
        } catch (e) {
            if (console) {
                console.warn('getAllKeys error.');
            }
        }

        return keys;
    };

    function getAllTags(prefix) {
        var tags = {};
        var allKeys = getAllKeys(prefix);

        try {
            for (var key in allKeys) {
                tags[allKeys[key]] = getTag(allKeys[key]);
            }
        } catch (e) {
            if (console) {
                console.warn('getAllTags error.');
            }
        }

        return tags;
    };

    function removeTag(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            if (console) {
                console.warn('removeTag {' + key + '} error.');
            }
        }
    };

    tracer.getTags = function (pid) {
        var allproductTags = getAllTags(productTagPrefix);
        var allPromotionTags = getAllTags(promotionTagPrefix);
        var allPromotion = [];
        var allProduct = [];

        
        for (var tagKey in allproductTags) {
            allProduct.push(allproductTags[tagKey]);
        }

        for (var tagKey in allPromotionTags) {
            allPromotion.push(allPromotionTags[tagKey]);
        }

        return { product: allProduct, marketing: allPromotion };
    };

    tracer.productTag = function (pid, tau, tab) {
        var regex = /^[0-9]{6}\-[0-9]{6}/;
        pid = regex.test(pid) ? pid : pid.split('-')[0];

        var productTagCount = getAllKeys(productTagPrefix).length;
        var productTag = getTag(productTagPrefix + pid);

        if (productTagCount < productTagLimitCount) {
            if (!productTag) {
                setTag(productTagPrefix + pid, {pid:pid,tau: tau, tab: tab, sdate: new Date() });
            }
        } else {
            if (productTag) {
                if (productTag.tau !== tau || productTag.tab !== tab) {
                    setTag(productTagPrefix + pid, { pid: pid, tau: tau, tab: tab, sdate: new Date() });
                }
            } else {
                var allProductTags = getAllTags(productTagPrefix);
                var deleteTag = { tagKey: null, sdate: new Date() };

                for (var tagKey in allProductTags) {
                    if (new Date(allProductTags[tagKey].sdate) < deleteTag.sdate) {
                        deleteTag.tagKey = tagKey;
                        deleteTag.sdate = new Date(allProductTags[tagKey].sdate);
                    }
                }

                removeTag(deleteTag.tagKey);
                setTag(productTagPrefix + pid, { pid: pid, tau: tau, tab: tab, sdate: new Date() });
            }
        }
    };
    
    tracer.promotionTag = function (utm_source, utm_medium, utm_campaign, utm_content) {
        var allPromotionTags = getAllTags(promotionTagPrefix);

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() - promotionTagExpireDay);

        for (var tagKey in allPromotionTags) {
            if (new Date(allPromotionTags[tagKey].sdate) < expireDate) {
                removeTag(tagKey);
            }
        }

        var promotionTagCount = getAllKeys(promotionTagPrefix).length;
        var promotionTag = getTag(promotionTagPrefix + utm_source + '_' + utm_medium + '_' + utm_campaign + '_' + utm_content);

        if (promotionTagCount < promotionTagLimitCount) {
            setTag(promotionTagPrefix + utm_source + '_' + utm_medium + '_' + utm_campaign + '_' + utm_content, { utm_source: utm_source, utm_medium: utm_medium, utm_campaign: utm_campaign, utm_content: utm_content, sdate: new Date() });
        } else {
            if (promotionTag) {
                setTag(promotionTagPrefix + utm_source + '_' + utm_medium + '_' + utm_campaign + '_' + utm_content, { utm_source: utm_source, utm_medium: utm_medium, utm_campaign: utm_campaign, utm_content: utm_content, sdate: new Date() });
            } else {
                var allPromotionTags = getAllTags(promotionTagPrefix);
                var deleteTag = { tagKey: null, sdate: new Date() };

                for (var tagKey in allPromotionTags) {
                    if (new Date(allPromotionTags[tagKey].sdate) < deleteTag.sdate) {
                        deleteTag.tagKey = tagKey;
                        deleteTag.sdate = new Date(allPromotionTags[tagKey].sdate);
                    }
                }

                removeTag(deleteTag.tagKey);
                setTag(promotionTagPrefix + utm_source + '_' + utm_medium + '_' + utm_campaign + '_' + utm_content, { utm_source: utm_source, utm_medium: utm_medium, utm_campaign: utm_campaign, utm_content: utm_content, sdate: new Date() });
            }
        }
    };

    return tracer;
}));