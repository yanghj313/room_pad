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

	// '동반입실' 버튼 클릭 시 팝업 열기
	$('.overlay').hide();

	$('.status_4').on('click', function () {
		$('.overlay').fadeIn();
		$('.join_popup').fadeIn();
	});

	// '확인' 버튼 클릭 시 팝업 닫기
	$('.join_popup_close').on('click', function () {
		$('.overlay').fadeOut();
		$('.join_popup').fadeOut();
	});

	// 오버레이 클릭 시 팝업 닫기
	$('.overlay').on('click', function () {
		$('.overlay').fadeOut();
		$('.join_popup').fadeOut();
	});

	// 동반입실자 추가 버튼 클릭 시
	$('.add').on('click', function () {
		let newContent = $('.popup_scroll_content:first').clone();
		newContent.find('input').val('');
		$('.popup_scroll').append(newContent);
	});

	// 동반입실자 삭제 버튼 클릭 시
	$(document).on('click', '.delete', function () {
		if ($('.popup_scroll_content').length > 1) {
			$(this).closest('.popup_scroll_content').remove();
		}
	});
});
