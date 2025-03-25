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
