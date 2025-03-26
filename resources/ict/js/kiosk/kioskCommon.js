// 슬릭 오류 방지
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		this.addEventListener('touchstart', handle, { passive: false });
	},
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		this.addEventListener('touchmove', handle, { passive: false });
	},
};

$(document).ready(function () {
	// 한손 모드 클릭 이벤트
	$('.one_handed_mode').click(function () {
		const content = $('.content');
		const scroll = $('.scroll');
		const image = $(this).find('img');
		const targetTop = $(window).width() > 1080 ? 1920 : 960;
		const scrollHeight = $(window).width() > 1080 ? 1560 : 780;

		const isAtTargetTop = parseInt(content.css('top')) === targetTop;
		content.css({ top: isAtTargetTop ? '0px' : targetTop + 'px' });

		if (!isAtTargetTop) {
			scroll.css({
				'overflow-y': 'scroll',
				height: scrollHeight + 'px',
			});
		} else {
			scroll.css({
				'overflow-y': '',
				height: '100%',
			});
		}
	});

	// 전체 모드 클릭 이벤트
	$('.full_mode').click(function () {
		const content = $('.content');
		const scroll = $('.scroll');

		content.css({ top: '0px' });
		scroll.css({
			'overflow-y': '',
			height: '100%',
		});
	});

	// 네비게이션 아이템 활성화
	const currentPath = window.location.pathname.toLowerCase();

	$('.navigation_item').each(function () {
		const img = $(this).find('img');
		const text = $(this).find('div');
		const imgSrc = img.attr('src');

		if (!imgSrc) return;

		const iconName = imgSrc.split('/').pop().replace('.svg', '').toLowerCase();
		const basePath = imgSrc.substring(0, imgSrc.lastIndexOf('/') + 1);
		const originalIcon = iconName + '.svg';
		const activeIcon = iconName + '_active.svg';

		if (currentPath.includes(iconName)) {
			text.css('color', '#121212');
			img.attr('src', basePath + activeIcon);
		} else {
			img.attr('src', basePath + originalIcon);
			text.css('color', 'rgba(0, 0, 0, 0.30)');
		}
	});
});
