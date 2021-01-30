$(document).ready(function(){
     $(".search .price .discount").each(function() {
         $(this).append('<mark>點我現折</mark>');
         });
     $(".search .price .discount span").each(function() {
         $(this).hide();
         });
     $(".search .price .discount mark").on("click", function() {
         $(this).prev().show();
         $(this).hide();
         });
});
