// 공지사항 이미지 슬라이드 설정
$(document).ready(function () {
	$('.notice_slide').slick({
		slidesToShow: 1,
		arrows: false,
		autoplay: false,
		dots: true,
		swipe: true,
		infinite: true,
	});
});
