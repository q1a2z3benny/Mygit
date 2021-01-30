$(document).ready(function(){
    $('.faq .list .a').hide();
    $('.faq .list .q').click(function(){
        $('.faq .list .a').each(function(){
            if( $(this).css('display') != 'none' ){
                $(this).slideToggle('slow');
            }
        });
        $(this).parent().find('.a').slideToggle('slow');
    });
});
