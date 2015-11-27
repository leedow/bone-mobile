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

	var verify = __webpack_require__(1);
	var dialog = __webpack_require__(3);
	var dropdown = __webpack_require__(4);

	 
	$(document).ready(function(){
		dropdown.init();
		$('#go').click(function(){
			//verify.check('#form');ff
			var d = dialog.init('标 题', 'content');

		});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CONFIG = __webpack_require__(2);

	module.exports.check = function(obj){
		$this = $(obj);
		var flag = true;
		var msg = {
			'required': '此项不能为空',
			'wrong': '此项格式错误'
		}

		$this.find('.verify-required').each(function(){
			add_state($(this), '');
			if (check_empty($(this).val())) {
				add_state($(this), msg.required);
				flag = false;
			} 
		});

		$this.find('.verify-email').each(function(){
			add_state($(this), '');
			if (check_empty($(this).val())) {
				if (allow_empty($(this))) {
					return true;
				};
				add_state($(this), msg.required);
				flag = false;
			} else if (!check_email($(this).val())) {
				add_state($(this), msg.wrong);
				flag = false;
			}
		});

		$this.find('.verify-url').each(function(){
			add_state($(this), '');
			if (check_empty($(this).val())) {
				if (allow_empty($(this))) {
					return true;
				};
				add_state($(this), msg.required);
				flag = false;
			} else if (!check_url($(this).val())) {
				add_state($(this), msg.wrong);
				flag = false;
			}
		});

		$this.find('.verify-password').each(function(){
			add_state($(this), '');

			if (check_empty($(this).val())) {
				if (allow_empty($(this))) {
					return true;
				};
				add_state($(this), msg.required);
				flag = false;
			} else if (!check_psd($(this).val())) {
				add_state($(this), msg.wrong);
				flag = false;
			}
		});

		$this.find('.verify-nocn').each(function(){
			add_state($(this), '');
			if (check_empty($(this).val())) {
				if (allow_empty($(this))) {
					return true;
				};
				add_state($(this), msg.required);
				flag = false;
			} else if (!check_nocn($(this).val())) {
				add_state($(this), msg.wrong);
				flag = false;
			}
		});

		//bone.placeholder.refresh();
		
		return flag;
	}


	function allow_empty(obj){
		if(obj.attr('class').indexOf('verify-empty') < 0){
			return false;
		} else {
			return true;
		}
	}	

	function set_state(params){
		for(key in params){
			if (params[key] == '') {
				$(key).next('p').remove();
				add_state($(key), params[key]);
			} else {
				add_state($(key), params[key]);
			};
		}
	}

	function add_state(aim, info){
		aim.next('p').remove();
		if (info != '') {
			info = aim.attr('data-msg')?aim.attr('data-msg'):info;
			if(info != '{{none}}'){
				aim.after('<p>' + info + '</p>');
			}
			aim.parent('div').addClass(CONFIG.prefix + 'input-wrong');
		} else {
			aim.parent('div').removeClass(CONFIG.prefix + 'input-wrong');
			aim.next('p').remove();
		};
	}

	function check_empty(value){
		//var reg = /^\s$/;
		if(value.replace(' ', '') != ''){
			return false;
		}
		return true;
	}

	function check_email(value){
		  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  if(!reg.test(value)){
		   		return false;
		  }
		  return true;
	}

	function check_url(value){
		var reg = /[a-zA-Z0-9]+\.[a-z]+/i;
		if(!reg.test(value)){
			return false;
		}
		return true;
	}

	function check_psd(value){
		var reg = /[a-zA-Z0-9]{6,14}/;
		if(!reg.test(value)){
			return false;
		}
		return true;
	}

	function check_nocn(value){
		var reg = /[\u4E00-\u9FA5]/i;
		if(reg.test(value)){
			return false;
		}
		return true;
	}


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
		this._config.width = (this.config.width != undefined)?this.config.width:'400px';

		/*config:{
			'buttons': 'single',
			'width': '400px' 
		}*/
		this.timer;
		this._ok = function(){};
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
			var h = $(tmp.dialog).height() + 90;

		 	$(tmp.dialog).css('margin-top', $(window).height()/2 - h/2);

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
			 
			if($this._config.buttons == 'single'){
				var buttons = '<div class="dialog-buttons">'
					+'<button class="'+CONFIG.prefix+'btn-primary button dialog-ok">确 定</button></div>';
			} else if($this._config.buttons == 'none'){
				var buttons = '';
			} else {
				var buttons = '<div class="dialog-buttons">'
					+'<button class="'+CONFIG.prefix+'btn-default button dialog-no">取 消</button>'
					+'<button class="'+CONFIG.prefix+'btn-primary button dialog-ok">确 定</button></div>';
			}

			$('body').append('<div id="'+domstr.layout+'"><div class="container ' + domstr.sdialog+' dialog-state-open" style="width:'+this._config.width+'"><h3 class="dialog-title">'+this._title
		 		+ '</h3><div class="dialog-close"><i class="icon iconfont">&#xe602;</i></div><div class="content">'+this._content+'</div>'+buttons+'</div></div>'
		 	);

		 	
		 	setTimeout(function(){
		 		$this._onload();
		 	}, 1);
		 	
			if($this._config.buttons == 'none'){
				$(tmp.sdialog).css('padding-bottom', '10px');
			}

			$(tmp.layout + ' .dialog-close').on('click', function(){
				$this.close();
			});
			$(tmp.layout + ' .dialog-ok').on('click', function(){
				$this._ok();
				$this.close();
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

			$this._ok = function(){};
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

/***/ }
/******/ ]);