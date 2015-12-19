var CONFIG = require('./bone-config');


function getFormData(obj){
	var form = $(obj);

	var input = form.find('input');
	var select = form.find('select');

	var data = {};

	input.each(function(){		 
		if($(this).data('ignore') != true && $(this).attr('name') != undefined){
			 
			data[$(this).attr('name')] = $(this).val();
		}
	});

	select.each(function(){
		if($(this).data('ignore') != true && $(this).attr('name') != undefined){
			data[$(this).attr('name')] = $(this).val();
		}		 
	});

	return data;
}

module.exports.getFormData = function(obj){
	return getFormData(obj);
}