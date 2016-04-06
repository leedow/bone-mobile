import React from 'react'

export var List = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			style: {}
		};	
  	},
	componentDidMount: function() {
		 
	},
	handleScroll: function(){
		console.log('scrolling');
	},
	render: function(){
		return (
			<div style={this.props.style} onScroll={this.handleScroll}>
				{this.props.children}
			</div>
		)
	}
});