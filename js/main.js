var verify = require('./bone-verify');
var dialog = require('./bone-dialog');
var dropdown = require('./bone-dropdown');
var carousel = require('./bone-carousel');
var notice = require('./bone-notice');
var wall = require('./bone-wall');
 
$(document).ready(function(){
	dropdown.init();
	$('#go').click(function(){
		//verify.check('#form');
		var d = dialog.init('标 题', 'content').ok(function(){
			notice.show('测试提醒');
		});

	});

	carousel.init();//fdd
	wall.init([
		'11111',
		'22222',
		'333334'
	]);
});