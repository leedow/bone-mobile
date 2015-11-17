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