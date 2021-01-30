$(document).ready(function () {
    $('.tkecPC_rightBar-linkButton').click(function (e) {
        e.preventDefault();
        var selfHref = $(this).attr('href');
        $(selfHref).toggleClass('slide-in');
        $(".tkecPC_rightBarPupup").each(function () {
            var id = "#" + $(this).attr('id');
            if (id !== selfHref) {
                $(this).removeClass('slide-in');
            }
            else
                $('#menu_top').css("z-index", '');
        });
    });
    $('.tkecPC_rightBarPupup-close').click(function (e) {
        e.preventDefault();
        $('.tkecPC_rightBarPupup').removeClass('slide-in');
    });
    $('.tkecPC_rightBar-toTop').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});

