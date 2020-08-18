<div class="navbar navbar-inverse">
	<div class="navbar-header">
		<?php
		echo anchor('',img('assets/img/Lambang_Kota_Tangerang_Selatan.png'),'class="navbar-brand"');
		?>

		<ul class="nav navbar-nav visible-xs-block">
			<li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
			<li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
		</ul>
	</div>

	<div class="navbar-collapse collapse" id="navbar-mobile">
		<ul class="nav navbar-nav">
			<li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li>
				<a href="<?php echo site_url('web'); ?>" target="_Blank">
					<span>Beranda</span>
				</a>
			</li>
			<li class="dropdown dropdown-user">
				<a class="dropdown-toggle" data-toggle="dropdown">
					<span><?php echo $_SESSION['nama'] ?></span>
					<i class="caret"></i>
				</a>

				<ul class="dropdown-menu dropdown-menu-right">
					<li><a href="<?php echo site_url('login/logout'); ?>"><i class="icon-switch2"></i> Logout</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
