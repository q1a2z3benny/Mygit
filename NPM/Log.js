//Log.js
 	   //登入模組
	    var log = {
            info: function (info) {
                return 'Info: ' + info;
            },
            warning:function (warning) {
                console.log('Warning: ' + warning);
            },
            error:function (error) {
                console.log('Error: ' + error);
            }
            };
            module.exports = log
            //module.exports，就是宣告，這個登入物件，是一個modules