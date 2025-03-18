$(document).ready(function () {
	// 캘린더
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const today = new Date();
	let currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	// 캘린더 렌더링
	function renderCalendar(year, month) {
		$('#currentMonth').text(`${year}.${String(month + 1).padStart(2, '0')}`);
		$('#day_of_the_week, .day').empty();

		// 요일 헤더 생성
		days.forEach(day => $('#day_of_the_week').append(`<div>${day}</div>`));

		const firstDay = new Date(year, month, 1).getDay();
		const lastDate = new Date(year, month + 1, 0).getDate();

		let itemCount = 0;

		for (let i = 0; i < firstDay; i++) {
			$('.day').append('<div class="day_item empty"></div>');
			itemCount++;
		}

		for (let i = 1; i <= lastDate; i++) {
			itemCount++;
			const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
			// 테스트용으로 28, 29, 30일 예약불가 날짜로 설정
			const isNotAvailable = i === 28 || i === 29 || i === 30;
			const classes = `day_item ${isToday ? 'today' : ''} ${isNotAvailable ? 'not_available' : ''}`.trim();

			let style = '';
			if (itemCount === 36) {
				style = ' style="border-radius: 0 0 0 15px;"';
			} else if (itemCount === 42) {
				style = ' style="border-radius: 0 0 15px 0;"';
			}

			$('.day').append(`<div class="${classes}" data-day="${i}"${style}><div>${i}</div><div>0/8</div></div>`);
		}

		// 날짜 클릭 이벤트
		$('.day .day_item:not(.empty)')
			.off('click')
			.on('click', function () {
				if ($(this).hasClass('not_available')) return;
				$('.day .day_item').removeClass('choice');
				$(this).addClass('choice');
			});
	}

	renderCalendar(currentYear, currentMonth);

	// 이전 달 버튼 클릭 이벤트
	$('#prevMonth').click(() => {
		if (--currentMonth < 0) [currentMonth, currentYear] = [11, currentYear - 1];
		renderCalendar(currentYear, currentMonth);
	});

	// 다음 달 버튼 클릭 이벤트
	$('#nextMonth').click(() => {
		if (++currentMonth > 11) [currentMonth, currentYear] = [0, currentYear + 1];
		renderCalendar(currentYear, currentMonth);
	});

	// 개인정보 수집 동의 라디오 버튼 컨트롤
	$('.Personal_data_consent_right').on('click', function () {
		const $img = $(this).find('.toggle_img');
		const currentSrc = $img.attr('src');

		if (currentSrc.includes('unchecked.png')) {
			$img.attr('src', '/resources/ict/img/facility/checked.png');
		} else {
			$img.attr('src', '/resources/ict/img/facility/unchecked.png');
		}
	});

	// 시설 이미지 슬라이드 설정
	$('.facility_slide').slick({
		slidesToShow: 1,
		arrows: false,
		autoplay: false,
		dots: true,
		swipe: true,
		infinite: true,
	});

	// submit 버튼 제외 나머지 버튼 이벤트 방지
	const form = document.querySelector('form');

	form.addEventListener('submit', function (event) {
		if (!event.submitter || !event.submitter.classList.contains('submit')) {
			event.preventDefault();
		}
	});

	// 인풋 입력 후 엔터 버튼 이벤트 방지
	form.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	});

	// 사용인원 컨트롤, 임시로 최대 인원 8명로 리밋
	$('#personnel').val(0);

	$('.plus').click(function () {
		let currentVal = parseInt($('#personnel').val());
		if (currentVal < 8) {
			$('#personnel').val(currentVal + 1);
		}
	});

	$('.minus').click(function () {
		let currentVal = parseInt($('#personnel').val());
		if (currentVal > 0) {
			$('#personnel').val(currentVal - 1);
		}
	});

	$('#personnel').on('input', function () {
		let value = parseInt($(this).val());
		if (isNaN(value) || value < 0) {
			$(this).val(0);
		} else if (value > 8) {
			$(this).val(8);
		}
	});
});
