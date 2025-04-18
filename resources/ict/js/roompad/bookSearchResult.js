$(document).ready(function () {
	// 페이지네이션 액티브 처리
	$('.pagination div').eq(0).addClass('current_page');

	let $pageNumbers = $('.pagination div');

	$pageNumbers.on('click', function () {
		if (!$(this).is('img')) {
			$pageNumbers.removeClass('current_page');

			$(this).addClass('current_page');
		}
	});
});
