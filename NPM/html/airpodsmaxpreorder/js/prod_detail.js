var oc_queue = false;
$(document).ready(function () {
    $('#menu .prod_detail .oc ul li').mouseenter(function () {
        if (!oc_queue) {
            if ($(this).css('height') == '188px') { return; }
            oc_queue = true;
            $(this).find('.title img').attr('src', 'images/prod_detail_oc_down.png');
            $(this).animate({ height: '188px' }, 150);
            $(this).parent().find('li').each(function () {
                if ($(this).css('height') <= '190px') {
                    $(this).find('.title img').attr('src', 'images/prod_detail_oc_right.png');
                    $(this).animate({ height: '30px' }, 150, function () {
                        oc_queue = false;
                    });
                }
            });
        }
    });
    $('#menu .prod_detail .view .close').click(function () {
        //scroll
        var p = $(this).parent().parent().offset();
        var v = $(this).offset();
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
        $(this).parent().parent().find('.container').hide();
        $(this).hide();
        $(this).parent().find('.open').show();
        $('html,body').scrollTop(p.top - (v.top - h));
    });
    $('#menu .prod_detail .view .open').click(function () {
        $(this).parent().parent().find('.container').show();
        $(this).hide();
        $(this).parent().find('.close').show();
    });
    $('#divInstallation').click(function () {         
        $("#ctl00_ContentPlaceHolder1_div_Setup").show();
        $("#ctl00_ContentPlaceHolder1_div_Setup .container").show();        
        $("#ctl00_ContentPlaceHolder1_div_Setup .close").show();
        $("#ctl00_ContentPlaceHolder1_div_Setup .open").hide();
    });

    $('#menu .prod_detail .prod_content').each(function () {
        if ($(this).attr('default') == 'close') {
            $(this).find('.container').hide();
            $(this).find('.close').hide();
            $(this).find('.open').show();
        }
    });

    $('#menu .category_sub_menu').css({ height: $(document).height() });
    $('#menu .prod_detail .prod_info .cc_month_pay .cc_list').mouseenter(function () {
        $(this).find('.cc_detail').show();
    }).mouseleave(function () {
        $(this).find('.cc_detail').hide();
    });

});


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
//主打產品列表
$(document).ready(function () {
    $('.trsprod .trsprod_content ul').hide().each(function () {
        var n = $(this).attr('num');
        if (n == 1) {
            $(this).show();
        }
    });
    $('.trsprod .trsprod_menu ul li').mouseover(function () {

        $('.trsprod .trsprod_menu ul li').css({ 'background-position': ' 0 122px' });
        $('#DivTrs .trsprod_menu ul .trsm01 a').css({ 'color': '#000' });
        $('#DivTrs .trsprod_menu ul .trsm02 a').css({ 'color': '#000' });
        $('#DivTrs .trsprod_menu ul .trsm03 a').css({ 'color': '#000' });
        $('.trsprod .trsprod_content ul').hide();
        $(this).css({ 'background-position': '0 bottom' });
        var n = $(this).attr('num');
        var color = $(this).attr('line');        
        //console.log(color);
        $('.trsprod .trsprod_content ul').each(function () {
            var nc = $(this).attr('num');
            if (n == nc) {
                $(this).show();
                $('.trsprod_content').css({ 'border-top': '2px solid ' + color });
                $('#DivTrs .trsprod_menu ul .trsm0' + n + ' a').css({ 'color': color });                
                //$(this).css({display:'block',opacity:0}).animate({opacity:1},150);
            }
        });
    });
}); 

