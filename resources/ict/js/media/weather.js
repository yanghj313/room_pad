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

// 날씨 > 뉴스 슬라이드 설정
$(document).ready(function () {
	$('.news').slick({
		vertical: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		arrows: false,
		infinite: true,
	});
});
