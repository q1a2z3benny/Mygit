(function($){
	$.fn.validationEngineLanguage = function(){
	};
	$.validationEngineLanguage = {
		newLang: function(){
			$.validationEngineLanguage.allRules = {
				"required": { // Add your regex rules here, you can take telephone as an example
					"regex": "none",
					"alertText": "*此欄位必填！",
					"alertTextCheckboxMultiple": "* 請選擇",
					"alertTextCheckboxe": "* 此勾選框為必選",
					"alertTextDateRange": "* 兩個日期範圍為必選"
				},
				"dateRange": {
					"regex": "none",
					"alertText": "* 無效的 ",
					"alertText2": "Date Range"
				},
				"dateTimeRange": {
					"regex": "none",
					"alertText": "* 無效的 ",
					"alertText2": "日期時間範圍"
				},
				"minSize": {
					"regex": "none",
					"alertText": "* 最少輸入 ",
					"alertText2": " 個字數"
				},
				"maxSize": {
					"regex": "none",
					"alertText": "* 最多輸入 ",
					"alertText2": " 個字數"
				},
				"groupRequired": {
					"regex": "none",
					"alertText": "* 您必須填寫以下欄位"
				},
				"min": {
					"regex": "none",
					"alertText": "* 最小值是 "
				},
				"max": {
					"regex": "none",
					"alertText": "* 最大值是 "
				},
				"past": {
					"regex": "none",
					"alertText": "* 日期前 "
				},
				"future": {
					"regex": "none",
					"alertText": "* 日期過去 "
				},
				"maxCheckbox": {
					"regex": "none",
					"alertText": "* Maximum ",
					"alertText2": " options allowed"
				},
				"minCheckbox": {
					"regex": "none",
					"alertText": "* 請選擇",
					"alertText2": " options"
				},
				"equals": {
					"regex": "none",
					"alertText": "* 文字不匹配！"
				},
				"creditCard": {
					"regex": "none",
					"alertText": "* 信用卡號碼無效！"
				},
				"mobile": {
					// credit: jquery.h5validate.js / orefalo
					"regex": /\d{4}-\d{3}-\d{3}/,
					/*"regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,*/
					"alertText": "* 手機號碼格式不正確！"
				},
				"phone": {
					// credit: jquery.h5validate.js / orefalo
					"regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
					"alertText": "* 號碼格式不正確！"
				},
				"telephone": {
					// credit: jquery.h5validate.js / orefalo
					"regex": /^([\+][0-9]{1,3}[\-])?([0-9]{2,6})?([0-9\-\/]{2,3})?([0-9]{7,7})?\#?([0-9]{1,5})?$/,
					"alertText": "* 電話格式不正確！"
				},
				"email": {
					// HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#	e-mail-state-%28type=email%29 )
					"regex": /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					"alertText": "* email address 不正確！"
				},
				"integer": {
					"regex": /^[\-\+]?\d+$/,
					"alertText": "* 不是正確整數！"
				},
				"number": {
					// Number, including positive, negative, and floating decimal. credit: orefalo
					"regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
					"alertText": "* 無效的浮點十進制數！"
				},
				"date": {
					//	Check if date is valid by leap year
					"func": function (field) {
							var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
							var match = pattern.exec(field.val());
							if (match == null)
							   return false;

							var year = match[1];
							var month = match[2]*1;
							var day = match[3]*1;
							var date = new Date(year, month - 1, day); // because months starts from 0.

							return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
						},
					"alertText": "* 無效的日期格式, 必須是 YYYY-MM-DD 格式"
					
				},
				"CID": {
					//	台灣身份證檢查簡短版
					"func": function (field) {
						var city = new Array(
							 1,10,19,28,37,46,55,64,39,73,82, 2,11,
							20,48,29,38,47,56,65,74,83,21, 3,12,30
						)
						var id = field.val().toUpperCase();
						if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
							return false;
						} else {
							id = id.split('');
							var total = city[id[0].charCodeAt(0)-65];
							for(var i=1; i<=8; i++){
								total += eval(id[i]) * (9 - i);
							}
							total += eval(id[9]);
							return ((total%10 == 0 ));
						}
						},
					"alertText": "* 請輸入正確的台灣身分証字號"
				},
				"ipv4": {
					"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
					"alertText": "* 無效的 IP address"
				},
				"url": {
					"regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
					"alertText": "* 無效的 URL"
				},
				"onlyNumberSp": {
					"regex": /^[0-9\ ]+$/,
					"alertText": "* 只能輸入數字！"
				},
				"onlyLetterSp": {
					"regex": /^[a-zA-Z\ \']+$/,
					"alertText": "* 只能輸入英文字！"
				},
				"onlyLetterNumber": {
					"regex": /^[0-9a-zA-Z]+$/,
					"alertText": "* 只能輸入英文數字！"
				},
				"chinese": {
					"regex": /^[\u4e00-\u9fa5]+$/,
					"alertText": "* 只能輸入中文字！"
				},
				//tls warning:homegrown not fielded
				"dateFormat":{
					"regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
					"alertText": "* 無效的日期"
				},
				//tls warning:homegrown not fielded
				"dateTimeFormat": {
					"regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
					"alertText": "* 無效的日期或日期格式",
					"alertText2": "預設格式: ",
					"alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ",
					"alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
				},
				"ajaxCheckEmailUsed": {
					"url": "checkEmailUsed/",
					"extraData": "",
					"alertText": "這個 ID/email 已使用過了",
					"alertTextOk": "可以",
					"alertTextLoad": "ID/email 檢查中…"
				},
			};

		}
	};

	$.validationEngineLanguage.newLang();

})(jQuery);
