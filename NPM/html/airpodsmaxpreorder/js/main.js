var sub_menu_show = false;
$(document).ready(function () {
    // 統一 category_sub_menu or member_center_submenu 與 category_content 的 height
    if ($('div.category_sub_menu').length == 1) {
        $('div.category_sub_menu').height('auto');
        $('div.category_content').height('auto');
        //($('div.category_content').height() >= $('div.category_sub_menu').height()) ? $('div.category_sub_menu').height($('div.category_content').height()) : $('div.category_content').height($('div.category_sub_menu').height());
    }
    if ($('div.member_center_submenu').length == 1) {
        $('div.member_center_submenu').height('auto');
        $('div.category_content').height('auto');
        //($('div.category_content').height() >= $('div.member_center_submenu').height()) ? $('div.member_center_submenu').height($('div.category_content').height()) : $('div.category_content').height($('div.member_center_submenu').height());
    }


    //子選單彈跳
    $('#menu .sub_menu ul li').mouseenter(function () {
        var topInt = $('#menu .sub_menu ul li').offset().top;
        $(this).css({ 'background-color': '#ececec' });
        sub_menu_show = true;
        //$('#menu .sub_menu_content').hide();
        $('#menu .sub_menu_content').css({ visibility: 'hidden' });
        var content = $(this).attr('content');
        $('#menu .sub_menu_content').each(function () {
            var c = $(this).attr('content');
            if (c == content) {                
                //$(this).css({display:'inline-block'});
                $(this).css({ visibility: 'visible' });
                $("#menu .sub_menu_content").css("top", topInt);
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
                //$('#menu .sub_menu_content').hide();
                $('#menu .sub_menu_content').css({ visibility: 'hidden' });
            }
        }, 300);
    });
    $('#menu .sub_menu_content').mouseenter(function () {
        sub_menu_show = true;
        var t = $(this).attr('content');
        $('#menu .sub_menu ul li').css({ 'background-color': 'transparent' });
        $('#menu .sub_menu ul li').each(function () {
            if ($(this).attr('content') == t) {
                $(this).css({ 'background-color': '#ececec' });
            }
        })
    }).mouseleave(function () {
        $('#menu .sub_menu ul li').css({ 'background-color': 'transparent' });
        sub_menu_show = false;
        setTimeout(function () {
            if (!sub_menu_show) {
                $('#index').css({ top: '40px' });
                //$('#menu .sub_menu_content').hide();
                $('#menu .sub_menu_content').css({ visibility: 'hidden' });
            }
        }, 300);
    });
}); 

