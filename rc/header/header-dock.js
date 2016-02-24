import React from 'react';

export var HeaderDock = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			align: 'left',
			href: '',
			title: ''
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div className={'bo-header-dock-'+this.props.align}>
				<a href={this.props.href}>
					{this.props.children}
					{this.props.title}
					
				</a>
			</div>
		)
	}
});//