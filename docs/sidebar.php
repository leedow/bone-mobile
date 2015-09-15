<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Bone-mobile sidebar</title>
<meta name="description" content="">
<meta name="keywords" content="">
<?php include('source.php');?>
</head>
<body class="bo-body">
<?php include('commonheader.php'); ?>
<?php include('commonmenu.php'); ?>
<?php include('commonsidebar.php'); ?>

<section class="bo-layout-main">
	 
	<div class="bo-box">
		<div class="article bo-p1101">
			<h3>侧栏的固定</h3>
			<p>通过layout-sidebar可以将侧栏菜单固定在左侧，并支持响应式显示。</p>
			<h3>侧栏样式</h3>
			<p>侧栏样式实际上垂直菜单列表的衍生，因此它可以使用在除sidebar外的其他你需要的地方。</p>
		</div>
		<div class="bo-p1101">
			
				 <div class="bo-sidebar">
					<h3 class="bo-sidebar-title">分类一</h3>
					<ul class="bo-tab-vertical">
						<li class="bo-tab-item"><a href="fonticon.php">item-1</a>
							<div class="bo-tab-dock">
								tag-1
							</div>
						</li>
						 
					</ul>
					<h3 class="bo-sidebar-title">分类二</h3>
					<ul class="bo-tab-vertical">
						<li class="bo-tab-item"><a href="layouts.php">item-2</a>
							<div class="bo-tab-dock">
								tag-2
							</div>
						</li>
						<li class="bo-tab-item"><a href="layouts.php">item-3</a>
							<div class="bo-tab-dock">
								tag-3
							</div>
						</li>
						 
					</ul>
					 
				</div>
			
		</div>
		
<script type="syntaxhighlighter" class="brush: csharp;">
<![CDATA[
<div class="bo-sidebar">
	<h3 class="bo-sidebar-title">分类一</h3>
	<ul class="bo-tab-vertical">
		<li class="bo-tab-item"><a href="fonticon.php">item-1</a>
			<div class="bo-tab-dock">
				tag-1
			</div>
		</li>
		 
	</ul>
	<h3 class="bo-sidebar-title">分类二</h3>
	<ul class="bo-tab-vertical">
		<li class="bo-tab-item"><a href="layouts.php">item-2</a>
			<div class="bo-tab-dock">
				tag-2
			</div>
		</li>
		<li class="bo-tab-item"><a href="layouts.php">item-3</a>
			<div class="bo-tab-dock">
				tag-3
			</div>
		</li>
		 
	</ul>
	 
</div>
]]>
</script>	

	</div> 
	 
	 

	 
 
</section>
</body>
</html>