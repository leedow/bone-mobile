import React from 'react';

export var Icon = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			type:''
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<i className={"iconfont icon-"+this.props.type}></i>
		)
	}
});