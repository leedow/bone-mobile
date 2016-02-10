//上下左右滚动的照片墙
var CONFIG = require('./bone-config');

function brick(obj){
	var _this = this;
	_this.obj = obj;
	_this.slide = _this.obj.find('.slide');
	_this.width = _this.obj.outerWidth();
	_this.height = _this.obj.outerHeight();
	_this.position = {
		left: [_this.width, 0],
		right: [-_this.width, 0],
		top: [0, _this.height],
		bottom: [0, -_this.height]
	}


	 
	//left,right,top,bottom
	_this.move = function(div, direction){
		_this.add(div, direction);

	}


	//插入
	_this.add = function(div, direction){
		_this.obj.append('<div class="slide">' + div + '</div>');
		_this.slide = _this.obj.find('.slide');
		_this.slide.each(function(index){
			if(index==0){
				$(this).css({
					left: "0px", 
					top: "0px"
				});
			} else if(index == 1){
				$(this).css({
					left: _this.position[direction][0], 
					top: _this.position[direction][1]
				});
			}
		});

		_this.slide.each(function(index){
			switch(direction){
				case 'left': {
					if(index==0){
						$(this).animate({speed: 2000,
							left: -_this.width + 'px'
						}, {
							speed: 2000,
							done: function(){
								$(this).remove();
							}
						});
					} else if(index == 1){
						$(this).animate({speed: 2000,
							left: '0px'
						}, {
							done: function(){

							}
						});
					}
					break;		
				}
				case 'right': {
					if(index==0){
						$(this).animate({speed: 2000,
							left: _this.width + 'px'
						}, {speed: 2000,
							done: function(){
								$(this).remove();
							}
						});
					} else if(index == 1){
						$(this).animate({speed: 2000,
							left: '0px'
						}, {
							done: function(){

							}
						});
					}
					break;	
				}
				case 'top': {
					if(index==0){
						$(this).animate({
							top: -_this.height + 'px'
						}, {speed: 2000,
							done: function(){
								$(this).remove();
							}
						});
					} else if(index == 1){
						$(this).animate({
							top: '0px'
						}, {speed: 2000,
							done: function(){

							}
						});
					}
					break;	
				}
				case 'bottom': {
					if(index==0){
						$(this).animate({
							top: _this.height + 'px'
						}, {speed: 2000,
							done: function(){
								$(this).remove();
							}
						});
					} else if(index == 1){
						$(this).animate({
							top: '0px'
						}, {speed: 2000,
							done: function(){

							}
						});
					}
					break;	
				}
			}
		});
	}

}
//data:[div1,div2]
module.exports.init = function(data){
	var list = [];
	var backup = [];
	$('.' + CONFIG.prefix + 'wall').each(function(){
		var _this = $(this);
		list.push(new brick(_this));
	});
	var size = list.length;
	if(data.length <= size) return;

	for(var i = 0; i<= size; i++){
		if(i >= size){
			backup.push(data[i]);
		}
	}



	var direction = ['left', 'right', 'top', 'bottom'];
	var timer = setInterval(function(){
		var random = Math.floor(Math.random()*size);//抽取一个wall DIV
		var dir = Math.floor(Math.random()*4);//方向
		var back = Math.floor(Math.random()*(backup.length));//抽取一个备用DIV
		var stamp = data[random];
		data[random] = backup[back];
		backup[back] = stamp;		
		if(data[random]!='')
		list[random].move(data[random], direction[dir]);
	}, 4000);


}