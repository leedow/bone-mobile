import React from 'react';

export var Counter = React.createClass({
	getInitialState: function() {
		return {
			value: 0
		};
	},
	getDefaultProps : function () {
		return {
			
		};	
  	},
	componentDidMount: function() {
		 
	},
	handleAdd: function(){
		var val = this.state.value+1;
		this.setState({
			value: val
		});
		
	},
	handleSub: function(){
		 
		var val = this.state.value-1;
		if(val<=0)val=0;
		this.setState({
			value: val
		})
	},
	render: function(){

		return (
			<div>
				<button  onClick={this.handleAdd}>+</button>
					<input type="text" value={this.state.value}/>
				<button onClick={this.handleSub}>-</button>
			</div>
		)
	}
});