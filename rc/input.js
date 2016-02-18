React = require('react');


var Input = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div className="bo-form-item">
				<label htmlFor="" className="bo-label"></label>
				<div>
					<input className="bo-input" type="text" placeholder=""  />
				</div>
			</div>
		)
	}
});

module.export = Input;


 
