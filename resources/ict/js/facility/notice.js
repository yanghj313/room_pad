$(document).ready(function () {
	// 공지사항 상세보기
	$('.more').click(function () {
		const $this = $(this);
		const $detail = $this.closest('.list_item').find('.detail_content');

		$this.toggleClass('active');
		$detail.slideToggle(300);
	});
});
