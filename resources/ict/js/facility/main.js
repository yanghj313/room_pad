$(document).ready(function () {
	// 메인 슬라이드 설정
	$('.main_slide').slick({
		slidesToShow: 1,
		autoplay: false,
		arrows: true,
		dots: false,
		swipe: true,
		infinite: true,
		prevArrow: '<button class="slick-prev"><img src="/resources/ict/img/facility/slide_arrow.svg" alt="이전"></button>',
		nextArrow: '<button class="slick-next"><img src="/resources/ict/img/facility/slide_arrow.svg" alt="다음"></button>',
	});
});
