import React from 'react'

export var Header = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			title: 'Title'
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div className="bo-header">
				{this.props.title}
				{this.props.children}
			</div>
		)
	}
});	