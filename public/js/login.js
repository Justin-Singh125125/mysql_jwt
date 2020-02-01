$(document).ready(function () {


	//if user is authenticated, just sign them in
	isUserAuthenticated();


	$('#login-btn').on('click', function (e) {
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
		})
			.then(function (resData) {
				isUserAuthenticated();
			})
			.catch(function (e) { console.log(e) })


	});



	async function isUserAuthenticated() {
		const isUser = await $.ajax({
			method: 'GET',
			url: 'api/user'
		})

		if (isUser) {
			location.assign("/home");
		}
	}
});
