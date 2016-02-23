import React from 'react';

export var ListItem = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div className="bo-list-item">
				{this.props.children}			
			</div>
		)
	}
});



