var banner_num = 0;
var banner_now = 0;
var banner_width = 0;
var banner_auto_timer;

var top_list_num1 = 0;
var top_list_now1 = 1;
var top_list_width1 = 0;

var top_list_num2 = 0;
var top_list_now2 = 1;
var top_list_width2 = 0;

var top_list_num3 = 0;
var top_list_now3 = 1;
var top_list_width3 = 0;

var top_list_num4 = 0;
var top_list_now4 = 1;
var top_list_width4 = 0;

var top_list_num5 = 0;
var top_list_now5 = 1;
var top_list_width5 = 0;

var top_list_num6 = 0;
var top_list_now6 = 1;
var top_list_width6 = 0;

var top_list_num7 = 0;
var top_list_now7 = 1;
var top_list_width7 = 0;

var top_list_num8 = 0;
var top_list_now8 = 1;
var top_list_width8 = 0;

var top_list_num9 = 0;
var top_list_now9 = 1;
var top_list_width9 = 0;

var top_list_num10 = 0;
var top_list_now10 = 1;
var top_list_width10 = 0;

var top_list_num11 = 0;
var top_list_now11 = 1;
var top_list_width11 = 0;


var top_list_num12 = 0;
var top_list_now12 = 1;
var top_list_width12 = 0;


var top_list_num13 = 0;
var top_list_now13 = 1;
var top_list_width13 = 0;


var top_list_num14 = 0;
var top_list_now14 = 1;
var top_list_width14 = 0;


var top_list_num15 = 0;
var top_list_now15 = 1;
var top_list_width15 = 0;

var top_list_num16 = 0;
var top_list_now16 = 1;
var top_list_width16 = 0;

var top_list_num17 = 0;
var top_list_now17 = 1;
var top_list_width17 = 0;

var top_list_num18 = 0;
var top_list_now18 = 1;
var top_list_width18 = 0;

var top_list_num19 = 0;
var top_list_now19 = 1;
var top_list_width19 = 0;
$(document).ready(function () {
    //主banner
    banner_now = $('#menu .bigb .pic').attr('banner_now');
    $('#menu .bigb .pic ul li').each(function () {
        banner_num++;
    });
    banner_width = parseInt($('#menu .bigb').css('width'));
    $('#menu .bigb .pic ul').css({ width: banner_width * banner_num + 'px' });
    banner_move();
    $('#menu .bigb .leftbt').click(function () {
        banner_now--;
        if (banner_now < 1) {
            banner_now = banner_num;
        }
        banner_move();
    });
    $('#menu .bigb .rightbt').click(function () {
        banner_auto();
    });

    $('#menu .bigb .pic').mouseenter(function () {
        clearTimeout(banner_auto_timer);
    }).mouseleave(function () {
        banner_auto_timer = setTimeout(function () {
            banner_auto();
        }, 4500);
    });
    


    //主打產品列表
    $("div[id^='IndexUC_divprod']").each(function () {
        var ranindex;
        var name = $(this).attr('id');
        $("#" + name + " .prod .prod_content ul").hide().each(function () {
            $(this).show();
        });
    });
    $("div[id^='divprod']").each(function () {

    });

    //image lazy load
    $("img.lazy").lazyload({ effect: "fadeIn" });


});       //document ready
function banner_show_now() {
    //標題css
    for (var i = 1; i <= banner_num; i++) {
        if (banner_now == i) {
            document.getElementById('bigbanner1' + i).className = 'link';
            document.getElementById('bigbanner2' + i).className = 'bgicon';
        } else {
            document.getElementById('bigbanner1' + i).className = 'link02';
            document.getElementById('bigbanner2' + i).className = '';
        }
    }
    $('#menu .bigb .leftbt').css({ 'visibility': 'visible' });
    $('#menu .bigb .rightbt').css({ 'visibility': 'visible' });
}

function banner_move() {
    var left = (banner_now - 1) * (banner_width - 0) * -1;
    $('#menu .bigb .pic ul').animate({ left: left }, 300);
    banner_show_now();
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
//按鈕
$(document).on('mouseover', '#menu .bigb .bottombt .link02', function () {
    banner_now = $(this).attr('num');
    banner_move();
});
$(document).on('mouseover', '#menu .bigb .bottombt', function () {
    clearTimeout(banner_auto_timer);
});
$(document).on('mouseout', '#menu .bigb .bottombt', function () {
    banner_auto_timer = setTimeout(function () {
        banner_auto();
    }, 4500);
});

//熱銷排行
$(document).ready(function () {
    $('#topleft1,#topright1').css({ 'visibility': 'visible' });
    $('#prod_content1 ul li').each(function () {
        top_list_num1++;
        top_list_width1 = parseInt($(this).css('width'));
    });
    $('#prod_content1 ul').css({ width: ((top_list_width1 + 15) * top_list_num1) + 'px' });
    $('#topleft1').click(function () {
        top_list_now1--;
        top_list_move(1, top_list_now1, top_list_width1);
    });
    $('#topright1').click(function () {
        top_list_now1++;
        top_list_move(1, top_list_now1, top_list_width1);
    });
    top_list_show(1, top_list_now1);
    //==========================================================================================
    $('#topleft2,#topright2').css({ 'visibility': 'visible' });
    $('#prod_content2 ul li').each(function () {
        top_list_num2++;
        top_list_width2 = parseInt($(this).css('width'));
    });
    $('#prod_content2 ul').css({ width: ((top_list_width2 + 15) * top_list_num2) + 'px' });
    $('#topleft2').click(function () {
        top_list_now2--;
        top_list_move(2, top_list_now2, top_list_width2);
    });
    $('#topright2').click(function () {
        top_list_now2++;
        top_list_move(2, top_list_now2, top_list_width2);
    });
    top_list_show(2, top_list_now2);
    //==========================================================================================
    $('#topleft3,#topright3').css({ 'visibility': 'visible' });
    $('#prod_content3 ul li').each(function () {
        top_list_num3++;
        top_list_width3 = parseInt($(this).css('width'));
    });
    $('#prod_content3 ul').css({ width: ((top_list_width3 + 15) * top_list_num3) + 'px' });
    $('#topleft3').click(function () {
        top_list_now3--;
        top_list_move(3, top_list_now3, top_list_width3);        
    });
    $('#topright3').click(function () {
        top_list_now3++;
        top_list_move(3, top_list_now3, top_list_width3);
    });
    top_list_show(3, top_list_now3);
    //==========================================================================================
    $('#topleft4,#topright4').css({ 'visibility': 'visible' });
    $('#prod_content4 ul li').each(function () {
        top_list_num4++;
        top_list_width4 = parseInt($(this).css('width'));
    });
    $('#prod_content4 ul').css({ width: ((top_list_width4 + 15) * top_list_num4) + 'px' });
    $('#topleft4').click(function () {
        top_list_now4--;
        top_list_move(4, top_list_now4, top_list_width4);
    });
    $('#topright4').click(function () {
        top_list_now4++;
        top_list_move(4, top_list_now4, top_list_width4);
    });
    top_list_show(4, top_list_now4);
    //==========================================================================================
    $('#topleft5,#topright5').css({ 'visibility': 'visible' });
    $('#prod_content5 ul li').each(function () {
        top_list_num5++;
        top_list_width5 = parseInt($(this).css('width'));
    });
    $('#prod_content5 ul').css({ width: ((top_list_width5 + 15) * top_list_num5) + 'px' });
    $('#topleft5').click(function () {
        top_list_now5--;
        top_list_move(5, top_list_now5, top_list_width5);
    });
    $('#topright5').click(function () {
        top_list_now5++;
        top_list_move(5, top_list_now5, top_list_width5);
    });
    top_list_show(5, top_list_now5);
    //==========================================================================================
    $('#topleft6,#topright6').css({ 'visibility': 'visible' });
    $('#prod_content6 ul li').each(function () {
        top_list_num6++;
        top_list_width6 = parseInt($(this).css('width'));
    });
    $('#prod_content6 ul').css({ width: ((top_list_width6 + 16) * top_list_num6) + 'px' });
    $('#topleft6').click(function () {
        top_list_now6--;
        top_list_move(6, top_list_now6, top_list_width6);
    });
    $('#topright6').click(function () {
        top_list_now6++;
        top_list_move(6, top_list_now6, top_list_width6);
    });
    top_list_show(6, top_list_now6);
    //==========================================================================================
    $('#topleft7,#topright7').css({ 'visibility': 'visible' });
    $('#prod_content7 ul li').each(function () {
        top_list_num7++;
        top_list_width7 = parseInt($(this).css('width'));
    });
    $('#prod_content7 ul').css({ width: ((top_list_width7 + 17) * top_list_num7) + 'px' });
    $('#topleft7').click(function () {
        top_list_now7--;
        top_list_move(7, top_list_now7, top_list_width7);
    });
    $('#topright7').click(function () {
        top_list_now7++;
        top_list_move(7, top_list_now7, top_list_width7);
    });
    top_list_show(7, top_list_now7);
    //==========================================================================================
    $('#topleft8,#topright8').css({ 'visibility': 'visible' });
    $('#prod_content8 ul li').each(function () {
        top_list_num8++;
        top_list_width8 = parseInt($(this).css('width'));
    });
    $('#prod_content8 ul').css({ width: ((top_list_width8 + 18) * top_list_num8) + 'px' });
    $('#topleft8').click(function () {
        top_list_now8--;
        top_list_move(8, top_list_now8, top_list_width8);
    });
    $('#topright8').click(function () {
        top_list_now8++;
        top_list_move(8, top_list_now8, top_list_width8);
    });
    top_list_show(8, top_list_now8);
    //==========================================================================================
    $('#topleft9,#topright9').css({ 'visibility': 'visible' });
    $('#prod_content9 ul li').each(function () {
        top_list_num9++;
        top_list_width9 = parseInt($(this).css('width'));
    });
    $('#prod_content9 ul').css({ width: ((top_list_width9 + 19) * top_list_num9) + 'px' });
    $('#topleft9').click(function () {
        top_list_now9--;
        top_list_move(9, top_list_now9, top_list_width9);
    });
    $('#topright9').click(function () {
        top_list_now9++;
        top_list_move(9, top_list_now9, top_list_width9);
    });
    top_list_show(9, top_list_now9);
    //==========================================================================================
    $('#topleft10,#topright10').css({ 'visibility': 'visible' });
    $('#prod_content10 ul li').each(function () {
        top_list_num10++;
        top_list_width10 = parseInt($(this).css('width'));
    });
    $('#prod_content10 ul').css({ width: ((top_list_width10 + 110) * top_list_num10) + 'px' });
    $('#topleft10').click(function () {
        top_list_now10--;
        top_list_move(10, top_list_now10, top_list_width10);
    });
    $('#topright10').click(function () {
        top_list_now10++;
        top_list_move(10, top_list_now10, top_list_width10);
    });
    top_list_show(10, top_list_now10);
    //==========================================================================================
    $('#topleft11,#topright11').css({ 'visibility': 'visible' });
    $('#prod_content11 ul li').each(function () {
        top_list_num11++;
        top_list_width11 = parseInt($(this).css('width'));
    });
    $('#prod_content11 ul').css({ width: ((top_list_width11 + 111) * top_list_num11) + 'px' });
    $('#topleft11').click(function () {
        top_list_now11--;
        top_list_move(11, top_list_now11, top_list_width11);
    });
    $('#topright11').click(function () {
        top_list_now11++;
        top_list_move(11, top_list_now11, top_list_width11);
    });
    top_list_show(11, top_list_now11);
    //==========================================================================================
    $('#topleft12,#topright12').css({ 'visibility': 'visible' });
    $('#prod_content12 ul li').each(function () {
        top_list_num12++;
        top_list_width12 = parseInt($(this).css('width'));
    });
    $('#prod_content12 ul').css({ width: ((top_list_width12 + 111) * top_list_num12) + 'px' });
    $('#topleft12').click(function () {
        top_list_now12--;
        top_list_move(12, top_list_now12, top_list_width12);
    });
    $('#topright12').click(function () {
        top_list_now12++;
        top_list_move(12, top_list_now12, top_list_width12);
    });
    top_list_show(12, top_list_now12);
    //==========================================================================================
    $('#topleft13,#topright13').css({ 'visibility': 'visible' });
    $('#prod_content13 ul li').each(function () {
        top_list_num13++;
        top_list_width13 = parseInt($(this).css('width'));
    });
    $('#prod_content13 ul').css({ width: ((top_list_width13 + 111) * top_list_num13) + 'px' });
    $('#topleft13').click(function () {
        top_list_now13--;
        top_list_move(13, top_list_now13, top_list_width13);
    });
    $('#topright13').click(function () {
        top_list_now13++;
        top_list_move(13, top_list_now13, top_list_width13);
    });
    top_list_show(13, top_list_now13);
    //==========================================================================================
    $('#topleft14,#topright14').css({ 'visibility': 'visible' });
    $('#prod_content14 ul li').each(function () {
        top_list_num14++;
        top_list_width14 = parseInt($(this).css('width'));
    });
    $('#prod_content14 ul').css({ width: ((top_list_width14 + 111) * top_list_num14) + 'px' });
    $('#topleft14').click(function () {
        top_list_now14--;
        top_list_move(14, top_list_now14, top_list_width14);
    });
    $('#topright14').click(function () {
        top_list_now14++;
        top_list_move(14, top_list_now14, top_list_width14);
    });
    top_list_show(14, top_list_now14);
    //==========================================================================================
    $('#topleft15,#topright15').css({ 'visibility': 'visible' });
    $('#prod_content15 ul li').each(function () {
        top_list_num15++;
        top_list_width15 = parseInt($(this).css('width'));
    });
    $('#prod_content15 ul').css({ width: ((top_list_width15 + 111) * top_list_num15) + 'px' });
    $('#topleft15').click(function () {
        top_list_now15--;
        top_list_move(15, top_list_now15, top_list_width15);
    });
    $('#topright15').click(function () {
        top_list_now15++;
        top_list_move(15, top_list_now15, top_list_width15);
    });
    top_list_show(15, top_list_now15);
    //==========================================================================================
    $('#topleft16,#topright16').css({ 'visibility': 'visible' });
    $('#prod_content16 ul li').each(function () {
        top_list_num16++;
        top_list_width16 = parseInt($(this).css('width'));
    });
    $('#prod_content16 ul').css({ width: ((top_list_width16 + 111) * top_list_num16) + 'px' });
    $('#topleft16').click(function () {
        top_list_now16--;
        top_list_move(16, top_list_now16, top_list_width16);
    });
    $('#topright16').click(function () {
        top_list_now16++;
        top_list_move(16, top_list_now16, top_list_width16);
    });
    top_list_show(16, top_list_now16);
    //==========================================================================================
    $('#topleft17,#topright17').css({ 'visibility': 'visible' });
    $('#prod_content17 ul li').each(function () {
        top_list_num17++;
        top_list_width17 = parseInt($(this).css('width'));
    });
    $('#prod_content17 ul').css({ width: ((top_list_width17 + 111) * top_list_num17) + 'px' });
    $('#topleft17').click(function () {
        top_list_now17--;
        top_list_move(17, top_list_now17, top_list_width17);
    });
    $('#topright17').click(function () {
        top_list_now17++;
        top_list_move(17, top_list_now17, top_list_width17);
    });
    top_list_show(17, top_list_now17);
    //==========================================================================================
    $('#topleft18,#topright18').css({ 'visibility': 'visible' });
    $('#prod_content18 ul li').each(function () {
        top_list_num18++;
        top_list_width18 = parseInt($(this).css('width'));
    });
    $('#prod_content18 ul').css({ width: ((top_list_width18 + 111) * top_list_num18) + 'px' });
    $('#topleft18').click(function () {
        top_list_now18--;
        top_list_move(18, top_list_now18, top_list_width18);
    });
    $('#topright18').click(function () {
        top_list_now18++;
        top_list_move(18, top_list_now18, top_list_width18);
    });
    top_list_show(18, top_list_now18);
    //==========================================================================================
    $('#topleft19,#topright19').css({ 'visibility': 'visible' });
    $('#prod_content19 ul li').each(function () {
        top_list_num19++;
        top_list_width19 = parseInt($(this).css('width'));
    });
    $('#prod_content19 ul').css({ width: ((top_list_width19 + 111) * top_list_num19) + 'px' });
    $('#topleft19').click(function () {
        top_list_now19--;
        top_list_move(19, top_list_now19, top_list_width19);
    });
    $('#topright19').click(function () {
        top_list_now19++;
        top_list_move(19, top_list_now19, top_list_width19);
    });
    top_list_show(1, top_list_now19);
    //==========================================================================================
});                      //document ready

function top_list_show(i, top_list_now) {    
    var maxnu = 0;
    //共有多少筆
    if ($('#BoardUl'+i).is(':visible')) {
        $('#BoardUl'+i+' li').each(function () {
            maxnu++;
        });
    }
    $('#topleft'+i+',#topright'+i).css({ 'visibility': 'visible' });    
    if (top_list_now == 1) {
        //隱藏
        $('#topleft'+i).css({ 'visibility': 'hidden' });
    }
    if ((top_list_now + 5) >= maxnu) {

        //隱藏
        $('#topright'+i).css({ 'visibility': 'hidden' });
    }
}

function top_list_move(i,top_list_now, top_list_width) {
    var left = (top_list_now - 1) * (top_list_width + 13) * -1;
    $('#prod_content'+i+' ul').animate({ left: left }, 300);
    top_list_show(i, top_list_now);
}
