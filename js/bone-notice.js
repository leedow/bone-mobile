var CONFIG = require('./bone-config');


var Notice = {
	show: function(msg){
		var timer;
		var obj = '#' + CONFIG.prefix + 'notice';
		if($(obj).length > 0){
			$(obj).html(msg);
		} else {
			$('body').append('<div id="' + CONFIG.prefix + 'notice">' + msg + '</div>');
		}
		clearTimeout(timer);
		var $notice = $(obj);
		$notice.css('bottom', '-100px').animate({
			'bottom': '100px'
		}, 'fast');

		timer = setTimeout(function(){
			$notice.animate({
				'bottom': '-100px'
			});
		}, 2000);
	}
}

module.exports = Notice;