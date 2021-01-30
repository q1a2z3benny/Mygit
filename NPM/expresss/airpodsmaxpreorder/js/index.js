var banner_num = 0;
var banner_now = 0;
var banner_width = 0;
var banner_auto_timer;
$(document).ready(function () {
    //主banner
    banner_now = $('#menu .main_banner .banner').attr('banner_now');
    $('#menu .main_banner .banner ul li').each(function () {
        banner_num++;
    });
    banner_width = parseInt($('#menu .main_banner').css('width'));
    $('#menu .main_banner .banner ul').css({ width: banner_width * banner_num + 'px' });
    banner_move();
    $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').click(function () {
        //        if( banner_now == 1 ){
        //            return;
        //        }
        //        banner_now--;
        //        banner_move()
        banner_now--;
        if (banner_now < 1) {
            banner_now = banner_num;
        }
        banner_move()
    });
    $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_right').click(function () {
        //        if( banner_now == banner_num ){
        //            return;
        //        }
        //        banner_now++;
        //        banner_move()
        banner_auto();
    });

    //    //主banner自動輪撥
    //    setTimeout(function(){
    //        banner_auto();
    //    },4500); 

    //banner說明文字
    $('#menu .main_banner .banner').mouseenter(function () {
        $('#menu .main_banner .banner .text').animate({ top: '-71px' });
        clearTimeout(banner_auto_timer);
    }).mouseleave(function () {
        $('#menu .main_banner .banner .text').animate({ top: '-35px' });
        banner_auto_timer = setTimeout(function () {
            banner_auto();
        }, 4500);
    });

    //數位生活說明文字
    //大圖
    $('#index .digital_life .content .big').mouseenter(function () {
        $(this).find('.text').animate({ top: '-104px' });
    }).mouseleave(function () {
        $(this).find('.text').animate({ top: '-36px' });
    });
    //小圖
    $('#index .digital_life .content .small').mouseenter(function () {
        $(this).find('.text').animate({ top: '-48px' });
    }).mouseleave(function () {
        $(this).find('.text').animate({ top: '-26px' });
    });


    //主打產品列表
    $("div[id^='IndexUC_divprod']").each(function () {
        var ranindex;
        var name = $(this).attr('id');
        $("#" + name + " .prod .prod_content ul").hide().each(function (index) {
            var Today = new Date();
            if (Today.getFullYear() == "2014" && (Today.getMonth() + 1) == "3" && Today.getDate() == "14") {
                ranindex = 3;                
            }
            else {
                ranindex = parseInt((Math.random() * (index + 1)), 10) + 1;                
            }

        });
        $("#" + name + " .prod .prod_content ul").hide().each(function () {
            var n = $(this).attr('num');
            if (n == ranindex) {
                $(this).show();
            }
        });
        $("#" + name + " .prod .prod_menu ul li").css({ 'background-position': ' 0 122px' }).each(function () {
            var n = $(this).attr('num');
            if (n == ranindex) {
                $(this).css({ 'background-position': ' 0 22px' });
            }
        });
        $("#" + name + " .prod .prod_menu ul li").mouseover(function () {
            $("#" + name + " .prod .prod_menu ul li").css({ 'background-position': ' 0 122px' });
            $("#" + name + " .prod .prod_content ul").hide();
            $(this).css({ 'background-position': ' 0 22px' });
            var n = $(this).attr('num');
            var color = $(this).attr('line');
            //console.log(color);
            $("#" + name + " .prod .prod_content ul").each(function () {
                var nc = $(this).attr('num');
                if (n == nc) {
                    $(this).show();
                    $("#" + name + " .prod .prod_content").css({ 'border-top': '2px solid ' + color });
                    //$(this).css({display:'block',opacity:0}).animate({opacity:1},150);
                }
            });
        });
    });
    $("div[id^='divprod']").each(function () {

    });

    //image lazy load
    $("img.lazy").lazyload({ effect: "fadeIn" });
});  //document ready

$(window).scroll(function(){
    var h;
    if( $.browser.mozilla ){
        h = $('html').scrollTop();
    }else{
        h = $('body').scrollTop();
    }
    if( !h ){
        h = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }
    h = new Number(h);
    //console.log(h.toString());
    if( h > 147 ){
        $('#menu_top').css({position:'fixed',top:'-18px','zIndex':99});
        /*
        $('#menu .sub_menu_top').css({cursor:'pointer'}).click(function(){
            if( parseInt($('#menu .sub_menu').css('top')) < 0 ){
                $('#menu .sub_menu').animate({top:'34px'},150);
            }else{
                $('#menu .sub_menu').animate({top:'-342px'},150);
            }
        });
        */
    }else{
        $('#menu_top').css({position:'relative',top:0});
        $('#menu .sub_menu_top').unbind('click').css({cursor:'default'});
    }
    if( h > 480 ){
        $('#menu .sub_menu').css({position:'fixed',top:'-342px','zIndex':98});
    }else{
        $('#menu .sub_menu').css({position:'relative',top:0});
    }

}); //window scroll

function banner_show_now(){
    $('#menu .main_banner .banner_ctrl').html('');
    var html = '';
    for( var i=1;i<=banner_num;i++ ){
        if( banner_now == i ){
            html += '<span num="'+i+'" class="banner_ctrl_point"><img src="images/index_banner_ctrl_point_now.png"></span>';
        }else{
            html += '<span num="'+i+'" class="banner_ctrl_point"><img src="images/index_banner_ctrl_point.png"></span>';
        }
    }
    $('#menu .main_banner .banner_ctrl').html(html);
        $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').css({'visibility':'visible'});
        $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_right').css({'visibility':'visible'});
//    if( banner_now == 1 ){
//         $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').css({'visibility':'hidden'});
//    }
//    if( banner_now == banner_num ){
//         $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_right').css({'visibility':'hidden'});
//    }
}

function banner_move(){
    var left = (banner_now-1) * (banner_width-0) * -1;
    $('#menu .main_banner .banner ul').animate({left:left},300);
    banner_show_now();
    clearTimeout(banner_auto_timer);
    banner_auto_timer = setTimeout(function(){
        banner_auto();
    },4500); 
}

function banner_auto(){
    banner_now++;
    if( banner_now > banner_num ){
        banner_now = 1;
    }
    banner_move();
}

$(document).on('click','#menu .main_banner .banner_ctrl .banner_ctrl_point',function(){
    banner_now = $(this).attr('num');
    banner_move();
});
