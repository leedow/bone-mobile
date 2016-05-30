var Verify = require('./bone-verify2');

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