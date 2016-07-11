var CONFIG = require('./bone-config');


var Rdialog = function(ele){
	this.ele;
	console.log('init')
	if(typeof ele == 'string'){
		this.ele = $(ele)
	} else {
		this.ele = ele;
	}

	var _this = this;

	this.ele.css('display', 'one')
	this.ele.find('.dialog-close').click(function(){
		alert('fsdf')
		//_this.close();
	})

	this.show = function(){
		this.ele.aimate({
			right: '20px'
		});
	}

	this.close = function(){
		this.ele.animate({
			right: -this.ele.width()
		})
	}

	//init();
}

module.exports.init =  function(ele){
	return new Rdialog(ele)
}