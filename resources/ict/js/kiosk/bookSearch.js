$(document).ready(function () {
	$(document).ready(function () {
		$('.filter_item').first().addClass('active_filter');

		$('.filter_item').click(function () {
			$('.filter_item').removeClass('active_filter');
			$(this).addClass('active_filter');
		});
	});
});
