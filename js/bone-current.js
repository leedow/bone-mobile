/*
 * 根据url中的参数高亮当前选择的tab
 * @param aimObj: 目标DOM
 * @param key: url中的参数
 * @param currentClass: 要添加的current class name
 */

module.exports = function(aimObj, currentClass){

	if(typeof aimObj == 'string'){
		var aim = $(aimObj);
	} else {
		var aim = aimObj;
	}

	var href = window.location.href;
	aim.removeClass(currentClass);



	aim.each(function(){
		var keyWords = $(this).data('page');
		if(typeof keyWords == 'string'){
			keyWords = keyWords.split(',');
		} else {
			keyWords = []
		}
 
		for(var i=0; i<keyWords.length; i++){
			try{
				var req = eval('/'+keyWords[i]+'/');
				if(req.test(href)){
					$(this).addClass(currentClass);
				}
			} catch (e) {

			}
			 
		}
		 
	});


}