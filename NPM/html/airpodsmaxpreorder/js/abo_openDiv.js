





            $(function () {                
                $("a[id^='a']").click().each(function () {
                    var n = $(this).attr('id').replace('a', '');
                    $('#divShow' + n).show();
                    $("div[id^='divShow']").hide();
                });

                //$('body').click(function (evt) {
                //    if ($(evt.target).parents("#divShow").length == 0 && 
                //        evt.target.id != "aaa" && evt.target.id != "divShow") {
                //        $('#divShow').hide();
                //    }
                //});

                //$('body').click(function (evt) {
                //    if ($(evt.target).parents("#divShow2").length == 0 &&
                //        evt.target.id != "aaa" && evt.target.id != "divShow2") {
                //        $('#divShow2').hide();
                //    }
                //});
				
				
                //$('body').click(function (evt) {
                //    if ($(evt.target).parents("#divShow3").length == 0 &&
                //        evt.target.id != "aaa" && evt.target.id != "divShow3") {
                //        $('#divShow3').hide();
                //    }
                //});
				
				
				 //$('body').click(function (evt) {
                //    if ($(evt.target).parents("#divShow4").length == 0 &&
                //        evt.target.id != "aaa" && evt.target.id != "divShow4") {
                //        $('#divShow4').hide();
                //    }
                //});
            });

