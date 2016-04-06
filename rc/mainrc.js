import React from 'react'
import ReactDOM from 'react-dom'
import {Input} from './input'
import {Header} from './header/header'
import {HeaderDock} from './header/header-dock'
import {Icon} from './core/icons'
import {Tab} from './tabs/tab'
import {TabItem} from './tabs/tab-item'
import {Box} from './layouts/box'
import {Counter}  from  './form/counter'
import {List} from './list/list'
import {ListItem} from './list/list-item'
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').hashHistory


var PageTabs = React.createClass({
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
			<div style={{height:'100%'}}>	
			<div className="bo-layout-header">
				<Header title="header title">
					<HeaderDock align="left" title="">
						<Icon type="back"/>
					</HeaderDock>
					<HeaderDock align="right" title="Setting"/>
				</Header>
			</div>
			<div className="bo-layout-main">
				<Box>
					<Tab type="">
						<TabItem>
							
						</TabItem>
					</Tab>
				</Box>

				<Box>
					<Tab>
						<TabItem href="test" name="Menu one" icon="true">
							<Icon type="settings"/>
						</TabItem>
						<TabItem href="go" name="Menu two"></TabItem>
					</Tab>
				</Box>
			</div>
			</div>
		)
	}
});

var PageHome = React.createClass({
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
			<div style={{height:'100%'}}>	
			<div className="bo-layout-header">
				<Header title="Bone mobile">
					 
					 
				</Header>
			</div>
			<div className="bo-layout-main">
				 

				<Box>
					<Tab>
						<TabItem href="#tabs" name="Menu one" icon="true">
							<Icon type="settings"/>
						</TabItem>
						 <Counter />
					</Tab>

				</Box>
				<Box>
					<List style={{height:'100px',overflow:'auto'}}>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
						<ListItem>
							111111111
						</ListItem>
					</List>
				</Box>
			</div>
			</div>
		)
	}
});

var NoMatch = React.createClass({
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
			<div>no page</div>
		)
	}
});


var App = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		 
	},
	render: function(){
		return (
			<div>
			{this.props.children}
			</div>
		)
	}
});

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/home" component={PageHome}/>
			<Route path="/tabs" component={PageTabs}/>
		

			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
	),
	document.getElementById('app')
)

//fsdjjjt