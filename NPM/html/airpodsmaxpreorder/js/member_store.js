$(document).ready(function(){
    $('.form').each(function(){
        if( $(this).attr('step') != '1' ){
            $(this).hide();
        }
    });
    $('.member_btn').click(function(){
        var step = $(this).attr('step');
        //第一步
        if( step == '1' ){
            if($(this).parent().parent().parent().find('input[type="checkbox"]').attr('checked')){
                //檢查email

                $(this).parent().parent().parent().find('input[type="checkbox"]').parent().html('✓');
            }else{
                alert('請勾選同意條款');
                return;
            }
            //show step2
            $('.step1').removeClass('step1_now');
            $('.step2').addClass('step2_now');
            $('.form').each(function(){
                if( $(this).attr('step') == '2' ){
                    $(this).show();
                    var t = $(this).offset();
                    $('html,body').animate({scrollTop:t.top},1000);
                }
            });
        }
        //第二步
        if( step == '2' ){
            //檢查欄位

            //身分證字號或統編
            if($(this).parent().parent().parent().find('input[type="checkbox"]').attr('checked')){
                $(this).parent().parent().parent().find('input[type="checkbox"]').parent().html('統編');
            }else{
                $(this).parent().parent().parent().find('input[type="checkbox"]').parent().html('身分證字號');
            }
            //show step3
            $('.step2').removeClass('step2_now');
            $('.step3').addClass('step3_now');
            $('.form').each(function(){
                if( $(this).attr('step') == '3' ){
                    $(this).show();
                    var t = $(this).offset();
                    $('html,body').animate({scrollTop:t.top},1000);
                }
            });
        }
        //第三步
        if( step == '3' ){
            //送出表單
            return;
        }
        $(this).parent().parent().parent().find('input').attr({'readonly':'readonly'}).css({background:'#ececec',color:'#888'});
        $(this).hide();
    });
});

