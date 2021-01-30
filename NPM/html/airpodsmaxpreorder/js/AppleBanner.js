var banner_num = 0;
var banner_now = 0;
var banner_width = 0;
var banner_auto_timer;
$(document).ready(function () {
    //主banner
    banner_now = $('#slides2 .main_banner .banner').attr('banner_now');
    $('#slides2 .main_banner .banner ul li').each(function () {
        banner_num++;
    });
    banner_width = parseInt($('#slides2 .main_banner').css('width'));
    $('#slides2 .main_banner .banner ul').css({ width: banner_width * banner_num + 'px' });
    banner_move();
    $('#slides2 .main_banner .banner_ctrl_arrow .banner_ctrl_left').click(function () {
        banner_now--;
        if (banner_now < 1) {
            banner_now = banner_num;
        }
        banner_move()
    });
    $('#slides2 .main_banner .banner_ctrl_arrow .banner_ctrl_right').click(function () {
        banner_auto();
    });

    //banner說明文字
    $('#slides2 .main_banner .banner').mouseenter(function () {
        $('#slides2 .main_banner .banner .text').animate({ top: '-71px' });
        clearTimeout(banner_auto_timer);
    }).mouseleave(function () {
        $('#slides2 .main_banner .banner .text').animate({ top: '-35px' });
        banner_auto_timer = setTimeout(function () {
            banner_auto();
        }, 4500);
    });

    function banner_show_now() {
        $('#slides2 .main_banner .banner_ctrl').html('');
        var html = '';
        for (var i = 1; i <= banner_num; i++) {
            if (banner_now == i) {
                html += '<span num="' + i + '" class="banner_ctrl_point"><img src="../images/index_banner_ctrl_point_now.png"></span>';
            } else {
                html += '<span num="' + i + '" class="banner_ctrl_point"><img src="../images/index_banner_ctrl_point.png"></span>';
            }
        }
        $('#slides2 .main_banner .banner_ctrl').html(html);
        $('#slides2 .main_banner .banner_ctrl_arrow .banner_ctrl_left').css({ 'visibility': 'visible' });
        $('#slides2 .main_banner .banner_ctrl_arrow .banner_ctrl_right').css({ 'visibility': 'visible' });
    }
    function banner_move() {
        var left = (banner_now - 1) * (banner_width - 0) * -1;
        $('#slides2 .main_banner .banner ul').animate({ left: left }, 300);
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
    $(document).on('click', '#slides2 .main_banner .banner_ctrl .banner_ctrl_point', function () {
        banner_now = $(this).attr('num');
        banner_move();
    });
});  //document ready