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
		if(href.indexOf($(this).data('page')) >= 0){
			$(this).addClass(currentClass);
		}
	});


}