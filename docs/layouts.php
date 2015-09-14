<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Bone-mobile Layouts</title>
<meta name="description" content="">
<meta name="keywords" content="">
<?php include('source.php');?>
</head>
<body class="bo-body">
<header class="bo-layout-header">
	<div class="bo-header">
		<div class="bo-header-dock-left">
			<a href="index.php"><i class="iconfont icon-back"></i></a>
		</div>
		层和盒子
		<div class="bo-header-dock-right">
			<a href="https://github.com/leedow/bone-mobile" target="_blank">Github</a>
		</div>
	</div>
</header>
<nav class="bo-layout-menu">
	<div class="bo-menu-icon">
		<ul class="bo-menu-3">
			<li><button><i class="iconfont">&#xe605;</i></button></li>
			<li><a href=""><i class="iconfont icon-roundadd"></i></a></li>
			<li><i class="iconfont icon-similar"></i></li>
		</ul>
	</div>
</nav>
<?php include('sidebar.php'); ?>

<section class="bo-layout-main">
	<div class="bo-box">
		<div class="bo-p1101">
			层(Layouts)用于将页面划分为几个基本的布局，分别是layout-header,layout-sidebar,layout-menu,layout-main。
		</div>
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<header class="bo-layout-header">
	<div class="bo-header">
		层和盒子
	</div>
</header>
]]>
</script>
	</div>
	<div class="bo-box-title">This is a title</div>
	<div class="bo-box">
		<div class="bo-p1101">
			layout-header用于显示APP的头部。
		</div>
		
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<header class="bo-layout-header">
	<div class="bo-header">
		层和盒子
	</div>
</header>
]]>
</script>		
	</div> 
 
</section>
</body>
</html>