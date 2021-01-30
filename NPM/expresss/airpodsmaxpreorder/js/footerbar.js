$(document).ready(function ($) {

    $('.closeBtn, .closeBtnL').click(function (e) {
        e.preventDefault();
        $('.footer_bar').hide();
        $('.leftBar').show();
    });

    $('.showFooterBar i').click(function (e) {
        e.preventDefault();
        $('.footer_bar').show();
        $('.leftBar').hide();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > $('.prod').offset().top - 51) {
            $('.btnbox180119').addClass('isFixed');
        } else {
            $('.btnbox180119').removeClass('isFixed');
        }
        if ($(this).scrollTop() > $('.btnbox180119').offset().top - 51) {
            $('#goTop').addClass('goTopShow');
        } else {
            $('#goTop').removeClass('goTopShow');
        }
    });
});

function CloseFooterBarWindows() {
    $('.footer_bar').hide();
    $('.leftBar').show();
}