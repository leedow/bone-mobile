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