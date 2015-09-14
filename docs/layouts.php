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
 <?php include('menu.php'); ?>
<?php include('sidebar.php'); ?>

<section class="bo-layout-main">
	 
	<div class="bo-box">
		<div class="bo-p1111 article">
			<h3>基本结构</h3>
			<p>
			层(Layouts)用于将页面划分为几个基本的布局，分别是layout-header,layout-sidebar,layout-menu,layout-main。
			</p>
			<h3>响应式</h3>
			<p>layout-sidebar根据屏幕大小显示为可见和隐藏状态。</p>
		</div>
	</div>
	<div class="bo-box-title">Layout-header</div>
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

	<div class="bo-box-title">Layout-menu</div>
	<div class="bo-box">
		<div class="bo-p1101">
			layout-menu用于显示主菜单，固定在底部。
		</div>
		
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<nav class="bo-layout-menu">
	//menu
</nav>
]]>
</script>		
	</div> 

	<div class="bo-box-title">Layout-sidebar</div>
	<div class="bo-box">
		<div class="bo-p1101">
			layout-sidebar用于显示侧栏，宽屏下默认显示，窄屏下默认隐藏。
		</div>
		
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<aside class="bo-layout-sidebar">
	//sidebar
</aside>
]]>
</script>		
	</div> 


	<div class="bo-box-title">Layout-main</div>
	<div class="bo-box">
		<div class="bo-p1101">
			layout-main用于显示页面主题部分。
		</div>
		
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<section class="bo-layout-main">
	//content
</section>
]]>
</script>		
	</div> 
</section>
</body>
</html>