// 슬릭 오류 방지
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		this.addEventListener('touchstart', handle, { passive: false });
	},
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		this.addEventListener('touchmove', handle, { passive: false });
	},
};

// 공지사항 슬라이드 설정
$(document).ready(function () {
	$('.center').slick({
		centerMode: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		arrows: false,
		dots: true,
		swipe: false,
		infinite: true,
		cssEase: 'ease-in-out',
	});
});
