$(document).ready(function ($) {
    // ä¸Šæ–¹?œå?
    $('.optionBox .price').click(function () {
        $('.optionBox .list').toggle();
    });

    //$('body, html').toggleClass('showCategory_menu');
    //$('#MoreTag').toggleClass('MoreTag');

    $('.moreBtn').click(function (e) {
        e.preventDefault();
        $('body, html').toggleClass('showCategory_menu');
        $('#MoreTag').toggleClass('MoreTag');
    });

   // $('#MoreTag').toggleClass('MoreTag');

    $('.morebrandBtn').click(function (e) {
        e.preventDefault();
        $('body, html').toggleClass('showCategory_brand');
        $('#MoreBrandTag').toggleClass('MoreBrandTag');
    });

    //noUiSlider
    var snapValues = [
        document.querySelector('.slidersnapvaluelower'),
        document.querySelector('.slidersnapvalueupper')
    ];
    snapSlider.noUiSlider.on('update', function (values, handle) {
        snapValues[handle].innerHTML = Math.floor((values[handle]));
    });

    var pos = new Object();

    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos.lat = position.coords.latitude;
                pos.lng = position.coords.longitude;
                $('.lat').val(pos.lat);
                $('.lng').val(pos.lng);
            }, function () {

            });
        }
    }
    getPosition();

    funExecutePopup();
});


function funExecutePopup() {
    // popup
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
    };
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this), $next = $this.next();
        $next.slideToggle('fast');
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    };
    var accordion = new Accordion($('.accordion'), false);

    function us(word) {
        var us = $('.username');
        var arr = (((us.val().split(/[^\x00-\xff]/g).length - 1) * 2) + ((us.val().split(/[\x00-\xff]/g).length) - 1));
        if (us.val() == "" || us.val().length == 0) {
            us.val('').attr('placeholder', 'Äæ¦ì¤£±o¬°ªÅ¥Õ').addClass('error');
        } else if (arr > 30) {
            us.val('').attr('placeholder', 'Äæ¦ì®æ¦¡¤£±o¶W¹L30­Ó¦r').addClass('error');
        } else {
            us.attr('placeholder', '').removeClass('error');
        }
    }

    function te() {
        var te = $('.tel');
        if (te.val() == "" || te.val().length == 0) {
            te.val('').attr('placeholder', 'Äæ¦ì¤£±o¬°ªÅ¥Õ').addClass('error');
        } else if (te.val().length != 10) {
            te.val('').attr('placeholder', 'Äæ¦ì®æ¦¡¤£²Å').addClass('error');
        } else {
            te.attr('placeholder', '').removeClass('error');
        }
    }

    $('.username').blur(function () {
        us();
    });

    $('.tel').blur(function () {
        te();
    });

    $('.storeList .orderBtn').click(function (e) {
        e.preventDefault();
        us();
        te();
    });

    changeLightBox();

    function changeLightBox() {
        if (window.innerHeight > 790) {
            $('.lightBox_inner').height('auto');
            $('.lightBox_wrap').css('top', ((window.innerHeight - 780 + 20) / 2) + "px");
        } else {
            $('.lightBox_inner').height((window.innerHeight - 40) + "px");

        }
        if (window.innerWidth > 940) {
            $('.lightBox_inner').width('auto');
            $('.lightBox_wrap').css('left', ((window.innerWidth - 925) / 2) + "px");
        } else {
            $('.lightBox_inner').width((window.innerWidth - 20) + "px");

        }
    }

    $(window).on('resize', function () {
        changeLightBox();
    });
}