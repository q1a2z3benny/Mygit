var hide_news = true;

$(document).ready(function(){

	$(".hide_news").click(function(){
		// console.log( $(this).parentsUntil('.member_center_news').html() );
		$(this).parentsUntil('.member_center_news').find('.member_center_news_content').toggle();
	});

	$(".show_detail").click(function(){
		$(this).next().toggle();
		// console.log($(this).find('img').attr('src'));
		if ($(this).find('img').attr('src') == 'https://www.tkec.com.tw/images/member_center_detail_d.png') {
		    $(this).find('img').attr('src', 'https://www.tkec.com.tw/images/member_center_detail_p.png');
			}else{
		    $(this).find('img').attr('src', 'https://www.tkec.com.tw/images/member_center_detail_d.png');
			}
		
	});

	$(".checkbox_cancel_all").click(function(){
		if($(this).attr('checked')) {
			$(".checkbox_cancel").attr('checked', true);	
		}else{
			$(".checkbox_cancel").attr('checked', false);
		}
	});
	$(".checkbox_same_all").click(function(){
		if($(this).attr('checked')) {
			$(".checkbox_same").attr('checked', true);	
		}else{
			$(".checkbox_same").attr('checked', false);
		}
	});

	$(".checkbox_cancel").click(function(){
		var checked_cnt = $(".checkbox_cancel").size();
		var checked_true_cnt = $(".checkbox_cancel:checked").size();
		// console.log(checked_true_cnt);
		if(checked_cnt == checked_true_cnt) {
			$(".checkbox_cancel_all").attr('checked', true);
		}else{
			$(".checkbox_cancel_all").attr('checked', false);
		}
	});

	$(".checkbox_same").click(function(){
		var checked_cnt = $(".checkbox_same").size();
		var checked_true_cnt = $(".checkbox_same:checked").size();
		// console.log(checked_true_cnt);
		if(checked_cnt == checked_true_cnt) {
			$(".checkbox_same_all").attr('checked', true);
		}else{
			$(".checkbox_same_all").attr('checked', false);
		}
	});

	$('.modify_btn').click(function(){
		// console.log($(this).parentsUntil('.modify'));
		$(this).parentsUntil('.modify').parent().find('.modify_box').show();
	})

	$(".checkbox_cancel_all").attr('checked', false);
	$(".checkbox_cancel").attr('checked', false);
});