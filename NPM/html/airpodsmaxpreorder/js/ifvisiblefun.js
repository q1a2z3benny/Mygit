$(document).ready(function () {
    function tt() {
        $.ajax({
            type: 'POST',
            url: '/api/index/GetPerson',
            dataType: 'json',
            data: {
                id: funGetInfoValueMst("I") || '',
                sessionid: funGetCookiesTkecPtValue("SessionID") || '',
                ProductIDs: funGetCookiesTkecPtValue('ProductView') || '',
            },
            success: function (data) {
                var tempData = [];
                var emaliStr = '';
                var listStr = '';
                $('#ifvisibleEmailBox').html("");
                $('.emailError').text("");
                data.forEach(function (item) {
                    if (item.title.indexOf("商品降價") >= 0 || item.title.indexOf("專屬優惠") >= 0) {
                        item.productitemmodel.forEach(function (item) {
                            tempData.push(item);
                        });
                    } else if (item.title.indexOf("猜你喜歡") > 0) {
                        item.productitemmodel.forEach(function (item) {
                            tempData.push(item);
                        });
                    }
                });

                if (getCookie('tkecm') === null) {
                    emaliStr = `<span class="emailError"></span><input id="ifvisibleEmailInput" type="text" placeholder="輸入E-mail">`;
                    $('#ifvisibleEmailBox').prepend(emaliStr);
                }

                listStr += '<div class="swiper-wrapper">';
                tempData.forEach(function (item, index) {
                    listStr += `
                           <div class="swiper-slide">
                               <p>${index + 1}</p>
                               <a href="/pt.aspx?pid=${item.productid}&ec=nosidpop_pricedown">
                                   <img src="${item.imgurl}" alt="${item.productname}" height="143" width="143" border="0">
                                   <div class="hot">${item.promote}</div>
                                   <h3 class="title">${item.productname}</h3>
                                   <div id="dictitleurlUC1_ProdRankUC1_RT_Data_ctl01_RT_Prod1_ctl01_PnPrice" class="price" style="color: #000;">
                                       網路價 <span>$${item.realprice}</span>
                                   </div> 
                               </a>
                          </div>
                        `;
                });
                listStr += '</div>';
                listStr += ' <div class="swiper-button-next swiper-button-black"></div>';
                listStr += ' <div class="swiper-button-prev swiper-button-black"></div>';
                $('#ifvisibleList').html(listStr);
                //等待1秒                
                setTimeout(loadpagedata, 500);
            }
        });
    }
    function loadpagedata() {
        new Swiper('.swiper-container', {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    var a = false;
    ifvisible.setIdleDuration(300);
    ifvisible.idle(function () {
        var info = ifvisible.getIdleInfo();
        if (info.timeLeftPer < 3) {
            info.timeLeftPer = 0;
            info.timeLeft = ifvisible.getIdleDuration();
        }
    
        if (parseInt(info.timeLeft / 1000) <= 0) {
            trackOutboundLink("nosidpop");
            if (!$('#closeWebPopup').is(':visible')) {
                $.fancybox.open({
                    'maxWidth': '1024',
                    'maxHeight': '600',
                    'width': '80%',
                    'height': 'auto',
                    'autoSize': true,
                    'autoScale': true,
                    'transitionIn': 'fade',
                    'transitionOut': 'fade',
                    'href': '#closeWebPopup',
                    afterShow: function () {
                        $("a.fancybox-close").addClass("ifvisibleClose").text("放棄優惠");
                    }
                });
            }
            if (!a) {
                tt();
                a = true;
            }
        }
    });

    //setInterval(function () {
    //    var info = ifvisible.getIdleInfo();
    //    // Give 3% margin to stabilaze user output
    //    if (info.timeLeftPer < 3) {
    //        info.timeLeftPer = 0;
    //        info.timeLeft = ifvisible.getIdleDuration();
    //    }
    //    console.log(parseInt(info.timeLeft / 1000), 10);
    //}, 100);

    $(document).on('click', '.ifvisibleEmailBtn', function (event) {
        var emailVal = $('#ifvisibleEmailInput').val() || '';
        $.ajax({
            type: 'GET',
            url: '/ashx/NewSubscribe.ashx?Email=' + emailVal + '',
            success: function (data) {
                if (data == "Email格式不符合") {
                    trackOutboundLink("nosidpop_loginerror");
                    $('.emailError').text('請填寫欲收到驚喜優惠的聯絡Email');
                } else if (data == "已訂閱過了") {
                    if (getCookie('tkecm') === null) {
                        trackOutboundLink("nosidpop_loginrepeat");
                        $('.emailError').text('您輸入的Email已經登記過囉！');
                    } else if (funGetInfoValueMst('I') != "") {
                        $('.ifvisibleClose').text("關閉");
                        $('#ifvisibleEmail').html("<p>領取驚喜優惠-登記成功</p>");
                    };
                } else if (data == "OK") {
                    trackOutboundLink("nosidpop_loginok");
                    $('.ifvisibleClose').text("關閉");
                    $('#ifvisibleEmail').html("<p>領取驚喜優惠-登記成功</p>");
                }
            }
        });
    });
});