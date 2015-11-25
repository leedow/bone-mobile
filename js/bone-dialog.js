var CONFIG = require('./bone-config');

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

		$this._dom();
		$this.open();
	}

	//this._dom = 
	
	this._dom();
	this.open();

}

  