import React from 'react';

var Tab = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			type: 'vertical',
			border: true
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		var className =  'bo-tab-' + this.props.type;
		if(this.props.border){
			className += '-bor';
		}
		return (
			<div className={className}>

			</div>
		)
	}
});