/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//全局变量.

	window.bone = {}

	bone.verify = __webpack_require__(1);
	bone.dialog = __webpack_require__(3);
	bone.dropdown = __webpack_require__(4);
	bone.carousel = __webpack_require__(5);
	bone.form = __webpack_require__(6);
	bone.notice = __webpack_require__(7);
	bone.wall = __webpack_require__(8);
	bone.sidebar = __webpack_require__(9);
	bone.current = __webpack_require__(10);
	bone.pagination = __webpack_require__(11);
	//bone.rdialog = require('./bone-rdialog');

	$(document).ready(function(){
		bone.dropdown.init();
		bone.carousel.init();
		bone.sidebar.init();
		 
		$('.stars').each(function(){
			var score = parseInt($(this).data('score'));
			var tmp = '';
			while(score--){
				tmp += '<i class="icon iconfont">&#xe604;</i>';
			}
			$(this).html(tmp);
		});
	});

	module.exports = bone;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);


	var Format = {
		type: {
			required: {
				reg: /.{1,}/,
				msg: '此项不能为空'
			},
			email: {
				reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
				msg: '邮箱格式错误'
			},
			phone: {
				reg: /^\d{11}$/,
				msg: '手机格式错误'
			},
			float: {
				reg: /^\d+(.\d+)?$/,
				msg: '必须为整数或小数'
			},
			int: {
				reg: /^\d+$/,
				msg: '必须为整数'
			}
		},
		doo: function(required, format, value){
			var _this = this;
			try{
				var value = value.replace(/\s/, '');
			} catch (e){
				var value = '';
			}
			if(required){
				if(!_this.type['required'].reg.test(value)){
					return {
						state: false,
						msg: _this.type['required'].msg
					};
				}
			}

			if(_this.type[format] == undefined){
				return {
					state: true
				};
			}	

			if(_this.type[format].reg.test(value)){
				return {
					state: true
				};
			} else {
				if(value == ''){
					return {
						state: true
					}
				}
				return {
					state: false,
					msg: _this.type[format].msg
				};
			}
		}
	}


	var Verify = {
		_data: {},
		_flag: true,
		_check: function(obj){

			var _this = this;

			obj.each(function(){
				var required = $(this).data('required')?$(this).data('required'):false;
				var format = $(this).data('format')?$(this).data('format'):'';
				var ignore = $(this).data('ignore')||false;
				var value = $(this).val();
				var name = $(this).attr('name');

				if(ignore){ return true;}

				var res = Format.doo(required, format, value);
				if(!res.state){
					_this.set($(this), res.msg);
					_this._flag = false;
					if(name)
						delete _this._data[name];
				} else {
					if(name){
						_this._data[name] = value;
					}
					_this.set($(this), '');
				}
								 
			});
		},
		getData: function(){
			return this._data;
		},
		check: function(obj){
			this._flag = true;
			if(typeof obj == 'string'){
				var form = $(obj);
			} else {
				var form = obj;
			}


		 	var inputs = form.find('input');
		 	var selects = form.find('select');
		 	var textarea = form.find('textarea');
		 	this._data = {};

		 	this._check(inputs);
		 	this._check(selects);
		 	this._check(textarea);

		 	return this._flag;
		},
		set: function(aim, info){
			aim.next('p').remove();
			var size = aim.attr('data-size')?'-'+aim.attr('data-size'):'';//input的尺寸
			if (info != '') {
				info = aim.attr('data-msg')?aim.attr('data-msg'):info;
				if(info != '{{none}}'){
					aim.after('<p>' + info + '</p>');
				}
				aim.parent('div').addClass(CONFIG.prefix + 'input-wrong'+size);
			} else {
				aim.parent('div').removeClass(CONFIG.prefix + 'input-wrong'+size);
				aim.next('p').remove();
			};
		}
	}

	module.exports = Verify;
	 

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		prefix: 'bo-',
		$: function(str){//格式化选择器#test->#bo-test
			var res = '';

			if(/^#./.test(str)){
				
				res = str.replace('#', '#' + this.prefix);

			}
			else if(/^\../.test(str)){
				
				res = str.replace('.', '.' + this.prefix);
			} else {
				res = this.prefix + str;
			}
			return res;
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);

	var $dialog;

	module.exports.init = function(title, content, config){
		if(typeof $dialog == 'undefined'){//单例模式
			$dialog = new _dialog(title, content, config);
			//console.log('new dialog');
			
		} else {
			$dialog.refresh(title, content, config);
			
		}	
		return $dialog;
	}

	//对话框类
	function _dialog(title, content, config){
		var $this = this;
		this._title = title?title:"";
		this._content = content?content:"";
		this._config = {};
		this.config = config?config:{};
		this._config.buttons = (this.config.buttons != undefined)?this.config.buttons:'single';
		this._config.width = (this.config.width != undefined)?this.config.width:'';
		this._config.fullHeight = (this.config.fullHeight != undefined)?this.config.fullHeight:false;

		/*config:{
			'buttons': 'single',
			'width': '400px' 
		}*/
		this.timer;
		this._ok = function(){return true};
		this._no = function(){};
		this._onload = function(){};

		var tmp = {
			layout: CONFIG.$('#dialog-layout'),
			sdialog: CONFIG.$('.dialog'),
			dialog: CONFIG.$('#dialog-layout') + ' ' + CONFIG.$('.dialog')
		}

		var domstr = {
			layout: CONFIG.$('dialog-layout'),
			sdialog: CONFIG.$('dialog'),
			dialog: CONFIG.$('dialog-layout') + ' ' + CONFIG.$('dialog')
		}



		//显示对话框
		this.open = function(){	
			clearTimeout($this.timer);
			$(tmp.layout).css('display', 'block');
			$(tmp.layout).removeClass('layout-state-close').addClass('layout-state-open');
			$this.timer = setTimeout(function(){
	 			$(tmp.layout).removeClass('layout-state-open')
	 		}, 10);
			var h = $(tmp.dialog).height() + 90;

		 	$(tmp.dialog).css('margin-top', $(window).height()/2 - h/2);

		 	//如果要显示充满高度
		 	if($this._config.fullHeight){
		 		$(tmp.dialog).css('height', $(window).height()-40)
		 					.css('margin-top', '20px');
		 	}

		}

		//关闭对话框
		this.close = function(){

		}

		//点击确定
		this.ok = function(callback){
			if(typeof callback != 'undefined'){
				$this._ok = callback;
			}
			
			return this;
		}

		//点击取消
		this.no = function(callback){
			if(typeof callback != 'undefined'){
				$this._no = callback;
			}  
		
			return this;
		}

		//加载完毕
		this.onload = function(callback){
			if(typeof callback != 'undefined'){
				$this._onload = callback;

			}  
		
			return this;	
		}

		//点击关闭
		this.close = function(callback){
			if(typeof callback != 'undefined'){
				callback();
			}
			$(tmp.layout).removeClass('layout-state-open').addClass('layout-state-close');
			$(tmp.dialog).removeClass('dialog-state-open').addClass('dialog-state-close');
	 		$this.timer = setTimeout(function(){
	 			$(tmp.layout).css('display', 'none');
	 		}, 300);
			
			return this;
		}

		this._dom = function(){
			if($(tmp.layout).length > 0 ){
				$(tmp.layout).remove();
			}
			 
			var ww = '';
			if(this._config.width != ''){
				ww = 'width:' + this._config.width;
			} 

			if($this._config.buttons == 'single'){
				var buttons = '<div class="dialog-buttons">'
					+'<button class="'+CONFIG.prefix+'btn-primary button dialog-ok">确 定</button></div>';
			} else if($this._config.buttons == 'none'){
				var buttons = '';
			} else {
				var buttons = '<div class="dialog-buttons">'
					+'<button class="'+CONFIG.prefix+'btn-blank button dialog-no">取 消</button>'
					+'<button class="'+CONFIG.prefix+'btn-primary button dialog-ok">确 定</button></div>';
			}

			$('body').append('<div id="'+domstr.layout+'"><div class="container ' + domstr.sdialog+' dialog-state-open" style="'+ww+'"><h3 class="dialog-title">'+this._title
		 		+ '</h3><div class="dialog-close"><i class="icon iconfont">&#xe602;</i></div><div class="content">'+this._content+'</div>'+buttons+'</div></div>'
		 	);

		 	
		 	setTimeout(function(){
		 		$this._onload();
		 	}, 1);
		 	
			if($this._config.buttons == 'none'){
				$(tmp.sdialog).css('padding-bottom', '10px');
			}

			$(tmp.layout + ' .dialog-close').on('click', function(){
				$this._no();
				$this.close();
			});
			$(tmp.layout + ' .dialog-ok').on('click', function(){

				if($this._ok()){
					$this.close();

				}
			});
			$(tmp.layout + ' .dialog-no').on('click', function(){
				$this._no();
				$this.close();
			});
		}

		//更新
		this.refresh = function(title, content , config){
			$this._title = title?title:"";
			$this._content = content?content:"";
			this._config = {};
			this.config = config?config:{};
			this._config.buttons = (this.config.buttons != undefined)?this.config.buttons:'single';
			this._config.width = (this.config.width != undefined)?this.config.width:'400px';
			this._config.fullHeight = (this.config.fullHeight != undefined)?this.config.fullHeight:false;

			$this._ok = function(){return true};
			$this._no = function(){};
			$this._onload = function(){};

			$this._dom();
			$this.open();
		}

		//this._dom = 
		
		this._dom();
		this.open();

	}

	  

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);


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



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Verify = __webpack_require__(1);

	module.exports = function(formObj, btnObj){
		this.request = false;
		this.btn = null;
		this.btnText = '';
		this.formObj = formObj;
		 
	 

		this.setBtn = function(btnObj){
			if(typeof btnObj == 'string'){
				this.btn = $(btnObj);
			} else {
				this.btn = btnObj;
			}
			this.btnText = this.btn.text();
			return this;
		} 

		if(btnObj)
			this.setBtn(btnObj);

		this.submit = function(callback){
			if(bone.verify.check(this.formObj) && !this.request){
				//提交预处理		 
				this.request = true;
				this.btn.text('处理中');
				var data = bone.verify.getData();
						
			    //数据AJAX提交
			    callback(data)
			    
			}
			return this;
		}

		this.reset = function(){
			this.btn.text(this.btnText);
		 	this.request = false;
		 	return this
		}

		 
	}	

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);


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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//上下左右滚动的照片墙
	var CONFIG = __webpack_require__(2);

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);


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

/***/ },
/* 10 */
/***/ function(module, exports) {

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

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	 * 分页
	 */
	module.exports = function(option){
		this.pageIndex  = 0;
		this.pageSize = 10;
		this.total = 0;
		this.pageCount = 0;
		this.obj = null;
		this.callback = function(){
			
		}

		//初始化数据
		this.init = function(option){
			this.pageIndex  = option.pageIndex||this.pageIndex ;
			this.pageSize = option.pageSize||this.pageSize;
			this.total = option.total||this.total;
			this.callback = option.clickEvent||this.callback;
			this.pageCount = Math.ceil(this.total/this.pageSize);
			if(option.ele){
				if(typeof option.ele == 'string'){
					this.obj = $(option.ele);
				} else {
					this.obj = option.ele;
				}
			}
			this.initDOM();	 
		}
		

		this.initDOM = function(){
			
			var tmp = '';

			var n = 4;
			for(var i=0; i<n; i++){
				var current = this.pageIndex-n+i;
				if(current < 0) continue;
				if(this.pageIndex == current){
					tmp += '<span class="current"  data-page='+current+'>' + (current+1) + '</span>';
				} else {
					tmp += '<a class="bo-page-btn" data-page='+current+'>' + (current+1) + '</a>';
				}	

			}

			for(var i=0; i<n; i++){
				var current = this.pageIndex+i;
				if(current >= this.pageCount) break;
				if(this.pageIndex == current){
					tmp += '<span class="current"  data-page='+current+'>' + (current+1) + '</span>';
				} else {
					tmp += '<a class="bo-page-btn" data-page='+current+'>' + (current+1) + '</a>';
				}	

			}
		
			if(this.pageIndex+1 == this.pageCount){
				var last = ''
			} else {
				var last = '<a class="bo-page-btn" data-page='+(this.pageCount-1)+'>最后一页</a>'
			}
			if(this.pageIndex == 0){
				var first = '';
				var last = '';
			} else {
				var first = '<a class="bo-page-btn" data-page=0>第一页</a>'
			}	
			 
			
			this.obj.html(first+tmp+last);
			
					

		}	

		this.initEvent = function(){
			var _this = this;
			_this.obj.on('click', '.bo-page-btn', function(){
				_this.pageIndex = $(this).data('page');
				_this.initDOM();
				_this.callback({
					pageIndex: _this.pageIndex,
					pageSize: _this.pageSize,
					pageCount: _this.pageCount
				});
			})
		}

		this.init(option);
		this.initEvent();

	}

/***/ }
/******/ ]);