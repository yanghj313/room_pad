$(document).ready(function () {
	$('.popup_open').click(function () {
		$('.overlay, .detail_popup').fadeIn(300);
	});

	$('.close, .overlay').click(function () {
		$('.overlay, .detail_popup').fadeOut(300);
	});
});
