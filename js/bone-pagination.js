/*
 * 分页
 */
module.exports = function(option, obj){
	this.pageIndex  = 0;
	this.pageSize = 10;
	this.total = 0;
	this.pageCount = 0;
	this.obj = null;
	this.callback = function(){
		
	}

	//初始化数据
	this.init = function(option, obj){
		this.pageIndex  = option.pageIndex||0;
		this.pageSize = option.pageSize||10;
		this.total = option.total||0;
		this.callback = option.clickEvent||function(){};
		this.pageCount = Math.round(this.total/this.pageSize);
		if(typeof obj == 'string'){
			this.obj = $(obj);
		} else {
			this.obj = obj;
		}
		this.initDOM();
		this.initEvent();

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

	this.init(option, obj);

}