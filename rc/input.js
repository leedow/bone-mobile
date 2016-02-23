import React from 'react'


export var Input = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			placeholder: 'test',
			state: ''
		};
	},
	getDefaultProps : function () {
		return {
			placeholder : '',
			value: '',
			state: '',//pass|wrong
			size: 'normal'
		};
  	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div className="bo-form-item">
				<label htmlFor="" className="bo-label"></label>
				<div className={'bo-input-' + this.props.state}>					
					<input className="bo-input bo-form-control" type="text" placeholder={this.props.placeholder}  />
				</div>
			</div>
		)
	}
});