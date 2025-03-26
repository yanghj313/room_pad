$(document).ready(function () {
	// 3X3 그리드 슬라이드
	const $bookItems = $('.book_item');
	const itemsPerGrid = 9;

	const $bookList = $('.book_list');

	$bookList.empty();

	const totalItems = $bookItems.length;
	const gridCount = Math.ceil(totalItems / itemsPerGrid);
	const bookItemsArray = $bookItems.toArray();

	for (let i = 0; i < gridCount; i++) {
		const $newGrid = $('<div class="grid"></div>');

		const startIndex = i * itemsPerGrid;
		const endIndex = Math.min(startIndex + itemsPerGrid, totalItems);

		for (let j = startIndex; j < endIndex; j++) {
			$newGrid.append(bookItemsArray[j]);
		}

		$bookList.append($newGrid);
	}

	$('.book_list').slick({
		slidesToShow: 1,
		autoplay: false,
		arrows: false,
		dots: true,
		swipe: true,
		infinite: true,
	});
});
