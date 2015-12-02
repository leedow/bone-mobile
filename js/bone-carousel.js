var CONFIG = require('./bone-config');


function slide(obj){
	var _this = this;
	_this.obj = obj;
	_this.slide = _this.obj.find('.slide');
 
	_this.items = _this.slide.children('.slide-item');
	_this.leftButton = _this.obj.children('.arrow-left');
	_this.rightButton = _this.obj.children('.arrow-right');
	_this.step = 0;
	_this.width = 0;//主容器长度
	_this.length = 0;//slide长度
	_this.flag = false;//动画标志

	//初始化尺寸
	_this.init = function(){
		
		_this.items.each(function(){
			_this.length += parseInt($(this).outerWidth());
			_this.step = $(this).outerWidth();
			$(this).css('width', _this.step);
		})
		
		_this.width = _this.obj.outerWidth();
		_this.slide.css('width', _this.length);
	}

	//滚动 left or right
	_this.run = function(direction){
		var pos = {};//_this.slide.position();
		pos.left = parseInt(_this.slide.css('marginLeft'));

		switch(direction){
			case 'right':{
				 
				if(Math.abs(pos.left) >= _this.length - _this.width - 1){
				 
				} else {
					_this.move(pos.left - _this.step);
				}		
				break;
			}
			case 'left':{
 
				if(Math.abs(pos.left) == 0){
					 
				} else {
					_this.move(pos.left + _this.step);
				}
				break;
			}
			default: {

			}
		}
	}

	_this.displayButtons = function(left){
			 
		if(left <= _this.width - _this.length + 1){
			_this.rightButton.css('display', 'none');
			_this.leftButton.css('display', 'block');
		} else if(left == 0){
			_this.rightButton.css('display', 'block');
			_this.leftButton.css('display', 'none');
		} else {
			_this.rightButton.css('display', 'block');
			_this.leftButton.css('display', 'block');
		}
	}

	_this.move = function(left){
		_this.flag = true;
		_this.slide.animate({
			'marginLeft': left + 'px'
		}, 500,function(){
			_this.displayButtons(left);
			_this.flag = false;
		})
	}	

	_this.events = function(){
		_this.leftButton.on('click', function(){
			if(!_this.flag)
				_this.run('left');
		});
		_this.rightButton.on('click', function(){
			if(!_this.flag)
				_this.run('right');
		});
	}



	_this.init();
	_this.events();
	 

}

//适用于PC的幻灯片，依赖jquery
module.exports.init = function(){
	 var list = [];
	 $('.' + CONFIG.prefix + 'carousel').each(function(){
	 	var _this = $(this);
	  
	 	list.push(new slide(_this));
	 });

}

