$(document).ready(function() {

	$('.shuffle').randomImage({path: 'images/'});
	$('a:first').click(function() {
		location.reload();
		return false;
	});

});