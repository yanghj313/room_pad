// 비밀번호 마스킹 처리
$(document).ready(function () {
	document.querySelectorAll('.password-input').forEach(input => {
		input.addEventListener('input', function () {
			this.setAttribute('data-real', this.value);
			this.value = '*';
		});
	});
});
