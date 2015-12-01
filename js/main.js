var verify = require('./bone-verify');
var dialog = require('./bone-dialog');
var dropdown = require('./bone-dropdown');
var carousel = require('./bone-carousel');
 
$(document).ready(function(){
	dropdown.init();
	$('#go').click(function(){
		//verify.check('#form');ff
		var d = dialog.init('标 题', 'content');

	});

	carousel.init();

});