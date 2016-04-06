var CONFIG = require('./bone-config');


var Format = {
	type: {
		required: {
			reg:/.{1,}/,
			msg: '此项不能为空'
		},
		email: {
			reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			msg: '邮箱格式错误'
		}
	},
	do: function(required, format, value){
		var _this = this;
		var value = value.replace(/\s/, '');

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
	_flag: true,
	_check: function(obj){
		var _this = this;
		obj.each(function(){
			var required = $(this).data('required')?$(this).data('required'):false;
			var format = $(this).data('format')?$(this).data('format'):'';
			var value = $(this).val();

			var res = Format.do(required, format, value);
			if(!res.state){
				_this.set($(this), res.msg);
				_this._flag = false;
			} else {
				_this.set($(this), '');
			}
							 
		});
	},
	check: function(obj){
		this._flag = true;
	 	var form = $(obj);
	 	var inputs = form.find('input');
	 	var selects = form.find('select');
	 	var textarea = form.find('textarea');

	 	this._check(inputs);
	 	this._check(selects);
	 	this._check(textarea);

	 	return this._flag;
	},
	set: function(aim, info){
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
}

module.exports = Verify;
 