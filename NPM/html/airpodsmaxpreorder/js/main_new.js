var sub_menu_show = false;
$(document).ready(function () {
  


    //子選單彈跳
    $('.EJnewWrapper1 .EJnewWrapperlistbox ul li').mouseenter(function () {
        var topInt = $('.EJnewWrapper1 .EJnewWrapperlistbox ul li').offset().top;
        $(this).css({ 'background-color': '#ececec' });
        sub_menu_show = true;
        //$('#EJnewWrapper1 .sub_menu_content').hide();
        $(' .sub_menu_content').css({ visibility: 'hidden' });
        var content = $(this).attr('content');
        $(' .sub_menu_content').each(function () {
            var c = $(this).attr('content');
            if (c == content) {                
                //$(this).css({display:'inline-block'});
                $(this).css({ visibility: 'visible' });
                $(".sub_menu_content").css("top", topInt);
                /*
                if( $.browser.msie ){
                $('#index').css({top:'-341px'});
                }else{
                $('#index').css({top:'-337px'});
                }
                */
            }
        });
    }).mouseleave(function () {
        $(this).css({ 'background-color': 'transparent' });
        sub_menu_show = false;
        setTimeout(function () {
            if (!sub_menu_show) {
                //$('#index').css({top:'40px'});
                //$('#EJnewWrapper1 .sub_menu_content').hide();
                $('.sub_menu_content').css({ visibility: 'hidden' });
            }
        }, 300);
    });
    $('.sub_menu_content').mouseenter(function () {
        sub_menu_show = true;
        var t = $(this).attr('content');
        $('.EJnewWrapper1 .EJnewWrapperlistbox ul li').css({ 'background-color': 'transparent' });
        $('.EJnewWrapper1 .EJnewWrapperlistbox ul li').each(function () {
            if ($(this).attr('content') == t) {
                $(this).css({ 'background-color': '#ececec' });
            }
        })
    }).mouseleave(function () {
        $('.EJnewWrapper1 .EJnewWrapperlistbox ul li').css({ 'background-color': 'transparent' });
        sub_menu_show = false;
        setTimeout(function () {
            if (!sub_menu_show) {
                $('#index').css({ top: '40px' });
                //$('#EJnewWrapper1 .sub_menu_content').hide();
                $('.sub_menu_content').css({ visibility: 'hidden' });
            }
        }, 300);
    });
}); 
/*  var currentDate = new Date(new Date().getTime());
                var hours = currentDate.getHours();
                var endTime = new Date(currentDate);
                endTime.setMinutes(0);
                endTime.setSeconds(0);
                endTime.setHours(24);

                if (hours >= 24) {
                    endTime.setDate(endTime.getDate() + 1);
                }
                $(function () {
                    $('.timebgbox').countdown({
                        until: endTime, format: 'DHMS', layout:
                            '<span class="timebg">{hnn}</span>:<span class="timebg">{mnn}</span>:<span class="timebg">{snn}</span>'
                    });
                }); */

            

