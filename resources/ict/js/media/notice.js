// 공지사항 슬라이드 설정
$(document).ready(function () {
	$('.owl-carousel').owlCarousel({
		stagePadding: 200,
		loop: true,
		items: 1,
		lazyLoad: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		dots: true,
	});
});
