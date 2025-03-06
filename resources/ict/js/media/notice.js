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
	$('.center').slick({
		centerMode: true,
		slidesToShow: 3,
	});
});
