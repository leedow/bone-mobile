var CONFIG = require('./bone-config');

module.exports.init = function(){
	dropdown();
}


function dropdown(){
	$('.' + CONFIG.prefix + 'dropdown').hover(function(){
 
		$(this).find('.' + CONFIG.prefix + 'dropdown-menu').css('display', 'block');
	}, function(){
		$(this).find('.' + CONFIG.prefix + 'dropdown-menu').css('display', 'none');
	});	
}