import React from 'react'

export var Box = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			margin: '0000',
			padding: '0000'
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<section className={"bo-box bo-m"+this.props.margin+" bo-p"+this.props.padding}>
				{this.props.children}
			</section>
		)
	}
});