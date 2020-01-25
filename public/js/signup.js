$(document).ready(function() {
	$('#signup-btn').on('click', function(e) {
		e.preventDefault();
		console.log('test');

		const userObj = {
			email: $('#signup-email')
				.val()
				.trim(),
			password: $('#signup-password')
				.val()
				.trim()
		};

		$.ajax({
			method: 'POST',
			url: '/api/user/signup',
			data: userObj
		});
	});
});
