import React from 'react'

export var TabItem = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	getDefaultProps : function () {
		return {
			href: '#',
			name: 'name',
			icon: false,
			arrow: true
		};	
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		var iconStyle ='';
		if(this.props.icon){
			iconStyle = '-icon';
		}
		return (
			<li className={"bo-tab-item"+iconStyle+" bo-tab-item-arrow"}>
				{this.props.children}
				<a className="bo-tl" href={this.props.href}>
					{this.props.name}
				</a>
			</li>
		)
	}
});