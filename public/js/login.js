$(document).ready(function() {
	$('#login-btn').on('click', function(e) {
		e.preventDefault();
		console.log('test');

		const userObj = {
			email: $('#login-email')
				.val()
				.trim(),
			password: $('#login-password')
				.val()
				.trim()
		};

		$.ajax({
			method: 'POST',
			url: '/api/user/login',
			data: userObj
		});
	});
});
