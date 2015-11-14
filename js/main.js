var verify = require('./verify');

 
$(document).ready(function(){
	$('#go').click(function(){
		verify.check('#form');
	});
});