import React from 'react'
import ReactDOM from 'react-dom'
import {Input} from './input'
import {Header} from './header/header'
import {HeaderDock} from './header/header-dock'
import {Icon} from './core/icons'


ReactDOM.render((
	<div>	
	<div className="bo-layout-header">
		<Header title="header title">
			<HeaderDock align="left" title="left"/>
			<HeaderDock align="right" title="right"/>
		</Header>
	</div>
	<div className="bo-layout-main">
		<Icon type="setting"/>
	</div>
	</div>
	),
	document.getElementById('app')
)

//fsdjjjt