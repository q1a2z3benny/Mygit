$(document).ready(function () {
    var menuTimeNav = $('.menutime'),
        menutimeNavTopPosition = menuTimeNav.offset().top;

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > menutimeNavTopPosition) {
            menuTimeNav.addClass('is-fixed');
        } else {
            menuTimeNav.removeClass('is-fixed');
        }
    });

    // $(window).resize(function () {
    //     var windowWidth = $(window).width();
    //     console.log(windowWidth);
    //     if (windowWidth <= '768') {
    //         console.log('yy');
    //     }
    // });

    $('.menuBtn').hover(function () {
        $(this).find('.dropDownBox').toggleClass('is-dropdown-visible');
    });

    //-------------scroll top----------------
    $("#scroll-top").on("click", function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, 500);
    });
    //-------------goToId----------------
    $('.scrollId').click(function (e) {
        //e.preventDefault();
        //var target = $(this).attr('href');
        //console.log(target);
        //var targetPos = $(target).offset().top;
        //$('body').animate({
        //    scrollTop: targetPos - 45
        //}, 500)
    });

    $('.scrollIdPc').click(function (e) {
        //e.preventDefault();
        //var target = $(this).attr('href');
        //var targetPos = $(target).offset().top;
        //$('body').animate({
        //    scrollTop: targetPos - 150
        //}, 500)
    });
    //----------top menu-----------
    $('#showmenu').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-show');
        $(this).toggleClass('menu-is-open');
    });

    //----------footer effect------------------    
    var is_bouncy_nav_animating = false;
    $('.bouncy-nav-trigger').on('click', function () {
        var navName = $(this).find('a').attr('class');
        triggerBouncyNav(true, navName);
        $('body').css('overflow', 'hidden');
    });
    $('.close').on('click', function () {
        var navName = $(this).parents().parents().find('.fade-in').attr('id');
        triggerBouncyNav(false, navName);
        $('body').css('overflow', 'auto');
    });

    $('.bouncy-nav li').on('click', function () {
        var navName = $(this).parents().parents().find('.fade-in').attr('id');
        triggerBouncyNav(false, navName);
        $('body').css('overflow', 'auto');
    });

    function triggerBouncyNav($bool, nav) {
        if (!is_bouncy_nav_animating) {
            is_bouncy_nav_animating = true;

            $("#" + nav).toggleClass('fade-in', $bool).toggleClass('fade-out', !$bool).find('li:last-child').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                $("#" + nav).toggleClass('is-visible', $bool);
                if (!$bool) $("#" + nav).removeClass('fade-out');
                is_bouncy_nav_animating = false;
            });

            if ($('.bouncy-nav-trigger').parents('.no-csstransitions').length > 0) {
                $("#" + nav).toggleClass('is-visible', $bool);
                is_bouncy_nav_animating = false;
            }
        }
    }
});