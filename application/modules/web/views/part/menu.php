<header class="header-area">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<nav class="navbar header navbar-expand-lg">
					<!-- Logo -->
					<a class="navbar-brand" href="<?php echo base_url(); ?>">
						<img src="<?php echo base_url(); ?>assets/img/Lambang_Kota_Tangerang_Selatan.png" alt="" style="width: 60px;">
					</a>
					<!-- Navbar Toggler -->
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#worldNav" aria-controls="worldNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
					<!-- Navbar -->
					<div class="collapse navbar-collapse" id="worldNav">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item active">
								<a class="nav-link" href="javascript:void(0);" id="home" onclick="menu(this.id)">Beranda</a>
							</li>
							<?php
								echo front_menu($menu);
							?>
							<li class="nav-item">
								<a class="nav-link"  target="_blank" href="<?php echo base_url(); ?>web/maps">Maps Desa Kranggan</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	</div>
</header>