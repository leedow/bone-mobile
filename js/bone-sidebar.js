var CONFIG = require('./bone-config');


module.exports.init = function(){
	$('#sidebar-toggle').click(function(){

		var s = $(CONFIG.$('.layout-sidebar'));

 
		if(s.css('display') == 'none'){
			s.slideDown('fast');
		} else {
			s.slideUp('fast');
		}
	})
}