$(document).ready(function () {
	// 검색 필터 버튼 액티브 처리
	$('.filter_item').first().addClass('active_filter');

	$('.filter_item').click(function () {
		$('.filter_item').removeClass('active_filter');
		$(this).addClass('active_filter');
	});
});
