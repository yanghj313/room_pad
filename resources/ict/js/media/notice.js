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
	});
});
