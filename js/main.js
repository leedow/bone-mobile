var verify = require('./bone-verify');
var dialog = require('./bone-dialog');

 
$(document).ready(function(){
	$('#go').click(function(){
		//verify.check('#form');ff
		var d = dialog.init('标 题', 'content');

	});
});