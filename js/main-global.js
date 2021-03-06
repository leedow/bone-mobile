//全局变量.

window.bone = {}

bone.verify = require('./bone-verify2');
bone.dialog = require('./bone-dialog');
bone.dropdown = require('./bone-dropdown');
bone.carousel = require('./bone-carousel');
bone.form = require('./bone-form');
bone.notice = require('./bone-notice');
bone.wall = require('./bone-wall');
bone.sidebar = require('./bone-sidebar');
bone.current = require('./bone-current');
bone.pagination = require('./bone-pagination');
//bone.rdialog = require('./bone-rdialog');

$(document).ready(function(){
	bone.dropdown.init();
	bone.carousel.init();
	bone.sidebar.init();
	 
	$('.stars').each(function(){
		var score = parseInt($(this).data('score'));
		var tmp = '';
		while(score--){
			tmp += '<i class="icon iconfont">&#xe604;</i>';
		}
		$(this).html(tmp);
	});
});

module.exports = bone;