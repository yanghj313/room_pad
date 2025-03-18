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
		const scrollHeight = $(window).width() > 1080 ? 1660 : 780;

		const isAtTargetTop = parseInt(content.css('top')) === targetTop;
		content.css({ top: isAtTargetTop ? '0px' : targetTop + 'px' });

		image.css({
			transform: isAtTargetTop ? 'rotate(0deg)' : 'rotate(180deg)',
			transition: 'transform 0.3s ease',
		});

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

	// 헤더 시간, 날짜 세팅
	function updateTime() {
		let now = new Date();
		let hours = now.getHours().toString().padStart(2, '0');
		let minutes = now.getMinutes().toString().padStart(2, '0');
		let year = now.getFullYear();
		let month = (now.getMonth() + 1).toString().padStart(2, '0');
		let date = now.getDate().toString().padStart(2, '0');

		let weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
		let dayOfWeek = weekdays[now.getDay()];

		$('.time').text(`${hours}:${minutes}`);
		$('.date').text(`${year}. ${month}. ${date}. ${dayOfWeek}`);
	}

	updateTime();
	setInterval(updateTime, 60000);
});
