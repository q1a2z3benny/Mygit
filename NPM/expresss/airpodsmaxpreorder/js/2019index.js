/*大B動畫*/
$(document).ready(function () {
	let now = new Date();
	let topbannerExpire = new Date(window.localStorage.getItem("bigtopbannerExpire"));
	var timeoutID = setTimeout(function () {
		// 這邊下你要觸發的東西
		$('.EJnewTopbannerboxbig').delay(0).slideDown(1500).delay(4000).slideUp(1500);
		if (now < topbannerExpire)
			$('.EJnewTopbannerbox').show(0);
		else
			$('.EJnewTopbannerbox').delay(7000).show(0);

		// 下方這行一定要加 清除計時器
		window.clearTimeout(timeoutID);
	}, 0);
});



/*動畫關閉鈕*/
$(document).ready(function () {
	$('.bigclose').click(function (event) {
		$('.EJnewTopbannerboxbig').hide();
		$('.EJnewTopbannerbox').show(0);
	});
});

/*頂天關閉鈕*/
$(document).ready(function () {
	$('.EJnewTopbannerbtn-close').click(function (event) {
		$('.EJnewTopbannerbox').hide();
	});
});

/*TAB效果*/
$(document).ready(function () {
	$('.EJnewEventcontentlist a').hover(function (event) {
		event.preventDefault();
		console.log(event.target.dataset.name);
		$(this).addClass('active').parent().siblings().find('a').removeClass('active');
		$(event.target.dataset.name).addClass('selected').siblings().removeClass('selected');
	});
});


/*大B輪播*/
/*  
var mySwiper = new Swiper('.swiper1', {
	autoplay: {
		delay: 3000,
		stopOnLastSlide: false,
		disableOnInteraction: false,
		reverseDirection: false
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	}
});



var mySwiper = new Swiper('.brand', {
	autoHeight: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	}
});
*/