$(document).ready(function () {
	// 조회기간 버튼 액티브 처리
	$('.month_btn_wrapper div').click(function () {
		$('.month_btn_wrapper div').removeClass('month_btn_active');
		$(this).addClass('month_btn_active');
	});

	// 예약상태 버튼 액티브 처리
	$('.reservation_status_wrapper div').click(function () {
		$('.reservation_status_wrapper div').removeClass('reservation_status_btn_active');
		$(this).addClass('reservation_status_btn_active');
	});

	// 리스트 체크 버튼 핸들링
	$('.check_area img').click(function () {
		let currentSrc = $(this).attr('src');
		let newSrc = currentSrc.includes('list_unchecked.svg') ? '/resources/ict/img/facility/list_checked.svg' : '/resources/ict/img/facility/list_unchecked.svg';

		$(this).attr('src', newSrc);
	});

	// 페이지네이션 버튼 액티브 처리
	$('.pagination_item').click(function () {
		$('.pagination_item').removeClass('current_page');
		$(this).addClass('current_page');
	});
});
