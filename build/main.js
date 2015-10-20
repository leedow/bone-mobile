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

	 

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.verify = function(obj){
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
				$(key).next('.input-wrong').remove();
			} else {
				add_state($(key), params[key]);
			};
		}
	}

	function add_state(aim, info){
		aim.next('.input-wrong').remove();
		if (info != '') {
			info = aim.attr('data-msg')?aim.attr('data-msg'):info;
			aim.after('<span class="input-wrong"><i class="fa  fa-exclamation-circle "></i> ' + info + '</span>');
		} else {
			aim.next('.input-wrong').remove();
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


/***/ }
/******/ ]);