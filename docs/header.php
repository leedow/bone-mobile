<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Bone-mobile header</title>
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
		头
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
			带颜色的头(header)
		</div>
		<div class="bo-p1101">
			<div class="bo-header">
				<div class="bo-header-dock-left">
					<a href="index.php"><i class="iconfont icon-back"></i></a>
				</div>
				This is a color header
				<div class="bo-header-dock-right">
					<a href="" target="_blank">button</a>
				</div>
			</div>
		</div>
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<div class="bo-header">
	<div class="bo-header-dock-left">
		<a href="index.php"><i class="iconfont icon-back"></i></a>
	</div>
	This is a header
	<div class="bo-header-dock-right">
		<a href="" target="_blank">button</a>
	</div>
</div>
]]>
</script>
	</div>
 
 	<div class="bo-box bo-m1000">
		<div class="bo-p1101">
			带颜色的头(header)
		</div>
		<div class="bo-p1101">
			<div class="bo-header-light">
				<div class="bo-header-dock-left">
					<a href="index.php"><i class="iconfont icon-back"></i></a>
				</div>
				This is a light header
				<div class="bo-header-dock-right">
					<a href="" target="_blank">button</a>
				</div>
			</div>
		</div>
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<div class="bo-header-light">
	<div class="bo-header-dock-left">
		<a href="index.php"><i class="iconfont icon-back"></i></a>
	</div>
	This is a header
	<div class="bo-header-dock-right">
		<a href="" target="_blank">button</a>
	</div>
</div>
]]>
</script>
	</div>
</section>
</body>
</html>