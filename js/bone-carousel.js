var CONFIG = require('./bone-config');


function slide(obj){
	_this = this;
	_this.obj = obj;
	_this.slide = _this.obj.children('.slide');
	_this.items = _this.slide.children('div');
	_this.leftButton = _this.obj.children('.arrow-left');
	_this.rightButton = _this.obj.children('.arrow-right');
	_this.step = 0;
	_this.length = 0;
	_this.flag = false;//动画标志

	//初始化尺寸
	_this.init = function(){
		
		_this.items.each(function(){
			_this.length += parseInt($(this).width());
			_this.step = $(this).width();
			$(this).css('width', _this.step);
		})
		 
		_this.slide.css('width', _this.length);
	}

	//滚动 left or right
	_this.run = function(direction){
		var pos = {};//_this.slide.position();
		pos.left = parseInt(_this.slide.css('marginLeft'));

		switch(direction){
			case 'right':{
				 
				if(Math.abs(pos.left) >= _this.length - _this.step){
				 
				} else {
					move(pos.left - _this.step);
				}		
				break;
			}
			case 'left':{
 
				if(Math.abs(pos.left) == 0){
					 
				} else {
					move(pos.left + _this.step);
				}
				break;
			}
			default: {

			}
		}

		function displayButtons(left){
			 
			if(left == _this.step - _this.length){
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

		function move(left){
			_this.flag = true;
			_this.slide.animate({
				'marginLeft': left + 'px'
			}, 500,function(){
				displayButtons(left);
				_this.flag = false;
			})
		}	
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
	_this.run();

}

//适用于PC的幻灯片，依赖jquery
module.exports.init = function(){
	 var list = [];
	 $('.' + CONFIG.prefix + 'carousel').each(function(){
	 	_this = $(this);
	 	list.push(new slide(_this));
	 });

}

