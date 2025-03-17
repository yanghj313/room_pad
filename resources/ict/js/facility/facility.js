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

	// 공지사항 슬라이드 설정
	$('.center').slick({
		centerMode: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		arrows: false,
		dots: true,
		swipe: false,
		infinite: true,
	});
});
