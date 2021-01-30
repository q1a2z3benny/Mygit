var banner_num = 0;
var banner_now = 0;
var banner_width = 0;
var top_list_num = 0;
var top_list_now = 1;
var top_list_width = 0;
var banner_auto_timer;
$(document).ready(function () {
    //上方主banner
    banner_now = $('#menu .main_banner .banner').attr('banner_now');
    $('#menu .main_banner .banner ul li').each(function () {
        banner_num++;
    });
    banner_width = parseInt($('#menu .main_banner').css('width'));
    $('#menu .main_banner .banner ul').css({ width: banner_width * banner_num + 'px' });
    banner_move();
    $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').click(function () {
        //        if (banner_now == 1) {
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
        //        if (banner_now == banner_num) {
        //            return;
        //        }
        //        banner_now++;
        //        banner_move()
        banner_auto();
    });

    //主banner自動輪撥
    //    var ctime = setTimeout(function () {
    //        banner_auto();
    //    }, 4500);

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



    //主打產品列表
    $('.prod .prod_content ul').hide().each(function () {
        var n = $(this).attr('num');
        if (n == 1) {
            $(this).show();
        }
    });
    $('.prod .prod_menu ul li').mouseover(function () {
        //$('.prod .prod_menu ul li').css({'background-position':' 0 122px'});
        $(this).parent().find('li').css({ 'background-position': ' 0 122px' });
        //$('.prod .prod_content ul').hide();
        $(this).parent().parent().parent().find('.prod_content ul').hide();
        $(this).css({ 'background-position': ' 0 22px' });
        var n = $(this).attr('num');
        var color = $(this).attr('line');
        //console.log(color);
        //$('.prod .prod_content ul').each(function(){
        $(this).parent().parent().parent().find('.prod_content ul').each(function () {
            var nc = $(this).attr('num');
            if (n == nc) {
                $(this).show();
                //$('#menu .category_content .prod .prod_content').css({'border-top':'2px solid '+color});
                $(this).parent().css({ 'border-top': '2px solid ' + color });
                //$(this).css({display:'block',opacity:0}).animate({opacity:1},150);
            }
        });
    });
    //熱銷排行
    //$('#menu .category_content .top_list .ctrl .left').css({'visibility':'visible'});
    $('#menu .category_content .top_list .ctrl .left,#menu .category_content .top_list .ctrl .right').css({ 'visibility': 'visible' });
    $('#menu .category_content .top_list .content ul li').each(function () {
        top_list_num++;
        top_list_width = parseInt($(this).css('width'));
    });
    $('#menu .category_content .top_list .content ul').css({ width: ((top_list_width + 15) * top_list_num) + 'px' });
    $('#menu .category_content .top_list .ctrl .left').click(function () {
        top_list_now--;
        top_list_move();
    });
    $('#menu .category_content .top_list .ctrl .right').click(function () {
        top_list_now++;
        top_list_move();
    });
    top_list_show();

    // var h = $('.category_content').height();
    // $('#menu .category_sub_menu').css({ height: h + 'px' });

    $('#menu .category_content .item_list .content .prod_item').each(function (i, v) {
        if ((i + 1) % 5 == 0 && i != 0) {
            $(this).css({ 'border-right': '1px solid #fff' });
        }
    });

    //分類menu下拉選單
    $('#menu .sub_menu_top').mouseover(function () {
        $('#menu .sub_menu_top .sub_menu_top_content').show();
    }).mouseleave(function () {
        $('#menu .sub_menu_top .sub_menu_top_content').hide();
    });

    //image lazy load
    // $("img.lazy").lazyload({ effect: "fadeIn" });
});  //document ready


$(window).scroll(function () {
    var h;
    if ($.browser.mozilla) {
        h = $('html').scrollTop();
    } else {
        h = $('body').scrollTop();
    }
    if (!h) {
        h = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }
    h = new Number(h);
    //console.log(h.toString());

    if (h > 147) {
        $('#menu_top').css({ position: 'fixed', top: '-18px', 'zIndex': 99 });
    } else {
        $('#menu_top').css({ position: 'relative', top: 0 });
        $('#menu .sub_menu_top').unbind('click').css({ cursor: 'default' });
    }

    if (h > 480) {
        $('#menu .sub_menu').css({ position: 'fixed', top: '-342px', 'zIndex': 98 });
    } else {
        $('#menu .sub_menu').css({ position: 'relative', top: 0 });
    }

    var isTopMenuZindex = '0';
    $(".tkecPC_rightBarPupup").each(function () {
        var id = "#" + $(this).attr('id');
        if ($(id)[0].classList.length > 1) {
            isTopMenuZindex = '1';
        }
    });
    if (isTopMenuZindex != '0')
        $('#menu_top').css("z-index", '');
}); //window scroll


function banner_show_now() {
    $('#menu .main_banner .banner_ctrl').html('');
    var html = '';
    for (var i = 1; i <= banner_num; i++) {
        if (banner_now == i) {
            html += '<span num="' + i + '" class="banner_ctrl_point"><img src="images/index_banner_ctrl_point_now.png"></span>';
        } else {
            html += '<span num="' + i + '" class="banner_ctrl_point"><img src="images/index_banner_ctrl_point.png"></span>';
        }
    }
    $('#menu .main_banner .banner_ctrl').html(html);
    $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').css({ 'visibility': 'visible' });
    $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_right').css({ 'visibility': 'visible' });
    //    if (banner_now == 1) {
    //        $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_left').css({ 'visibility': 'hidden' });
    //    }
    //    if (banner_now == banner_num) {
    //        $('#menu .main_banner .banner_ctrl_arrow .banner_ctrl_right').css({ 'visibility': 'hidden' });
    //    }    
}

function banner_move() {
    var left = (banner_now - 1) * (banner_width - 0) * -1;
    $('#menu .main_banner .banner ul').animate({ left: left }, 300);
    banner_show_now()
    clearTimeout(banner_auto_timer);
    banner_auto_timer = setTimeout(function () {
        banner_auto();
    }, 4500);
}

function banner_auto() {
    banner_now++;
    if (banner_now > banner_num) {
        banner_now = 1;
    }
    banner_move();
}


function top_list_show() {
    $('#menu .category_content .top_list .ctrl .left,#menu .category_content .top_list .ctrl .right').css({ 'visibility': 'visible' });
    if (top_list_now == 1) {
        $('#menu .category_content .top_list .ctrl .left').css({ 'visibility': 'hidden' });
    }
    if (top_list_now == (top_list_num - 5)) {
        $('#menu .category_content .top_list .ctrl .right').css({ 'visibility': 'hidden' });
    }
}

function top_list_move() {
    var left = (top_list_now - 1) * (top_list_width + 13) * -1;
    $('#menu .category_content .top_list .content ul').animate({ left: left }, 300);
    top_list_show();
}

$(document).on('click', '#menu .main_banner .banner_ctrl .banner_ctrl_point', function () {
    banner_now = $(this).attr('num');
    banner_move();
});
