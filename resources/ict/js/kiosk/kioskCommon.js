// 전체 & 한손 모드
$(document).ready(function () {
	$('.one_handed_mode').click(function () {
		const content = $('.content');
		const image = $(this).find('img');
		const targetTop = $(window).width() > 1080 ? 1920 : 960;

		const isAtTargetTop = parseInt(content.css('top')) === targetTop;
		content.css({ top: isAtTargetTop ? '0px' : targetTop + 'px' });

		image.css({
			transform: isAtTargetTop ? 'rotate(0deg)' : 'rotate(180deg)',
			transition: 'transform 0.3s ease',
		});
	});

	$('.full_mode').click(function () {
		$('.content').css({ top: '0px' });
	});
});
