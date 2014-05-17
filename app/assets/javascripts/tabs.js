$(function(){
	$('div.tabs .tab').click(function(){
		$(this)
			.siblings().removeClass('selected').end()
			.next('div').andSelf().addClass('selected');
	});
});
