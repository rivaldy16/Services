<!-- Page header -->
<div class="page-header page-header-inverse">
	<!-- Second navbar -->
	<div class="container">

		<div class="navbar navbar-inverse navbar-transparent" id="navbar-second">
			<ul class="nav navbar-nav visible-xs-block">
				<li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-second-toggle"><i class="icon-paragraph-justify3"></i></a></li>
			</ul>

			<div class="navbar-collapse collapse" id="navbar-second-toggle">
				<div class="navbar-header">
					<?php
					echo anchor('',img('assets/images/logo_light.png'),'class="navbar-brand"');
					?>
				</div>
				<ul class="nav navbar-nav navbar-nav-material navbar-right">
					<li class="<?php echo ($active == 'beranda' ? 'active' : '' ) ?>">
						<a href="index.php">
							Beranda 
						</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Profil <span class="caret"></span>
						</a>

						<ul class="dropdown-menu width-250">				
							<li class="dropdown-submenu">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<i class="icon-grid2"></i> Profil Kelurahan
								</a>
								<ul class="dropdown-menu">
									<li>
										<a href="">
											Visi & Misi
										</a>
									</li>
									<li>
										<a href="">
											Sejarah
										</a>
									</li>
									<li>
										<a href="">
											Gambaran Umum
										</a>
									</li>
									<li>
										<a href="">
											Peta Wilayah
										</a>
									</li>
								</ul>
							</li>
							<li class="dropdown-submenu">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<i class="icon-paragraph-justify3"></i> Pemerintahan Kelurahan
								</a>
								<ul class="dropdown-menu">
									<li>
										<a href="">
											Kepala Kelurahan
										</a>
									</li>
									<li>
										<a href="">
											Sekrataris Kelurahan
										</a>
									</li>
									<li>
										<a href="">
											Kasi Tata Pemerintahan
										</a>
									</li>
									<li>
										<a href="">
											Kasi Ekonomi Pembangunan
										</a>
									</li>
									<li>
										<a href="">
											Kasi Kesejahteraan Masyarakat
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Kelembagaan <span class="caret"></span>
						</a>

						<ul class="dropdown-menu width-250">				
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> RT & RW
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> PKK
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> Karang Taruna
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> LPM
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> BKM
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> Posyandu
								</a>
							</li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Jenis Pelayanan <span class="caret"></span>
						</a>

						<ul class="dropdown-menu width-250">				
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> KTP
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> KK
								</a>
							</li>
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> Akte Kelahiran
								</a>
							</li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							Statistik <span class="caret"></span>
						</a>

						<ul class="dropdown-menu width-250">				
							<li>
								<a href="">
									<i class="icon-align-center-horizontal"></i> Jumlah Penduduk
								</a>
							</li>
						</ul>
					</li>
					<li class="">
						<a href="index.php">
							Potensi Wilayah
						</a>
					</li>
					<li class="">
						<a href="index.php">
							Berita
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- /second navbar -->
</div>
	<!-- /page header -->