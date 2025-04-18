$(document).ready(function () {
	const data = [
		{
			floor: '1F',
			image: '/resources/ict/img/kiosk/map1F.png',
			slides: [
				{
					index: '1',
					title: '미디어월',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
				{
					index: '2',
					title: '어린이실 : 키득키득',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
				{
					index: '3',
					title: '드로잉존',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
				{
					index: '4',
					title: '실감형 체험관',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
			],
		},
		{
			floor: '2F',
			image: '/resources/ict/img/kiosk/map2F.png',
			slides: [
				{
					index: '1',
					title: '디지털 갤러리',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
				{
					index: '2',
					title: '인터렉티브 월',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
				{
					index: '3',
					title: '디지털 미디어북',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
			],
		},
		{
			floor: '3F',
			image: '/resources/ict/img/kiosk/map3F.png',
			slides: [
				{
					index: '1',
					title: '디지털 갤러리',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
			],
		},
		{
			floor: '4F',
			image: '/resources/ict/img/kiosk/map4F.png',
			slides: [
				{
					index: '1',
					title: '디지털 갤러리',
					image: '/resources/ict/img/kiosk/dummy.svg',
					list: ['이용시간 : 09:00~18:00', '행사 운영시에만 개방'],
				},
			],
		},
	];

	const $filterButtons = $('.filter div');
	const $slideWrapper = $('.facility_slide');
	const $map = $('.map');
	const $currentFloor = $('.current_floor');
	const $overlay = $('.overlay');
	const $detailPopup = $('.detail_popup');

	// 슬라이드 생성 함수
	function generateSlides({ slides, floor }) {
		if ($slideWrapper.hasClass('slick-initialized')) {
			$slideWrapper.slick('unslick');
		}

		const html = slides
			.map((slide, i) =>
				i % 2 === 0
					? `
            <div class="slide_item">
                ${generateSlideItem(slides[i], floor)}
                ${slides[i + 1] ? generateSlideItem(slides[i + 1], floor) : ''}
            </div>`
					: ''
			)
			.join('');

		$slideWrapper.html(html);

		$slideWrapper.slick({
			slidesToShow: 1,
			arrows: false,
			autoplay: false,
			dots: true,
			swipe: true,
			infinite: true,
		});
	}

	// 개별 슬라이드 아이템 HTML 생성 함수
	function generateSlideItem({ index, title, image, list }, floor) {
		return `
        <div class="slide_item_wrapper" data-floor="${floor}" data-index="${index}">
            <img class="facility_img" src="${image}" alt="" />
            <div class="facility_name_wrapper">
                <div class="index"><div>${index}</div></div>
                <div class="facility_name">${title}</div>
            </div>
        </div>
        `;
	}

	// 지도와 현재 층 정보 업데이트 함수
	function updateMapAndFloor({ floor, image }) {
		$map.css({ background: `url("${image}") no-repeat center center`, backgroundSize: 'cover' });
		$currentFloor.text(floor);
	}

	// 팝업 내용 업데이트 함수
	function updatePopup(floor, index) {
		const floorData = data.find(item => item.floor === floor);
		if (!floorData) return;

		const facility = floorData.slides.find(slide => slide.index === String(index));
		if (!facility) return;

		// 헤더 업데이트
		$detailPopup.find('.detail_popup_header div').text(facility.title);
		const $logoImg = $detailPopup.find('.detail_popup_header img');

		// 타이틀이 '어린이실 : 키득키득'이면 이미지 표시, 아니면 숨김
		if (facility.title === '어린이실 : 키득키득') {
			$logoImg.css('display', 'block');
		} else {
			$logoImg.css('display', 'none');
		}

		// 콘텐츠 업데이트
		$detailPopup.find('.detail_popup_facility_img').attr('src', facility.image);

		// 설명 리스트 업데이트
		const $description = $detailPopup.find('.facility_description');
		$description.empty();
		facility.list.forEach(item => {
			$description.append(`
            <div class="facility_description_item">
                <img src="/resources/ict/img/kiosk/index.png" alt="" />
                <div>${item}</div>
            </div>
        `);
		});
	}

	// slide_item_wrapper 클릭 핸들러
	$slideWrapper.on('click', '.slide_item_wrapper', function () {
		const $wrapper = $(this);
		const floor = $wrapper.data('floor');
		const index = $wrapper.data('index');

		if (floor && index) {
			updatePopup(floor, index);
			$overlay.fadeIn(300);
			$detailPopup.fadeIn(300);
		} else {
			console.error('Missing floor or index:', floor, index);
		}
	});

	// 팝업 닫기 이벤트
	$('.detail_popup_close').on('click', function () {
		$overlay.fadeOut(300);
		$detailPopup.fadeOut(300);
	});

	// 오버레이 클릭으로도 닫기
	$overlay.on('click', function () {
		$overlay.fadeOut(300);
		$detailPopup.fadeOut(300);
	});

	// 층 버튼 클릭 이벤트 핸들러
	function handleFilterClick() {
		const floorData = data.find(({ floor }) => floor === $(this).text());
		if (!floorData) return;

		$filterButtons.removeClass('current_filter');
		$(this).addClass('current_filter');

		generateSlides(floorData);
		updateMapAndFloor(floorData);
	}

	// 초기화 실행 (1층부터 시작)
	const initialFloor = data.find(({ floor }) => floor === '1F');
	if (initialFloor) {
		generateSlides(initialFloor);
		updateMapAndFloor(initialFloor);
	}

	$filterButtons.on('click', handleFilterClick);
});
