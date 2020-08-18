<div class="sidebar-content">
	<!-- Main navigation -->
	<div class="sidebar-category sidebar-category-visible">
		<div class="category-content no-padding">
			<ul class="navigation navigation-main navigation-accordion">
				<!-- Main -->
				<li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main Menu"></i></li>
				<li class="active" id="home" onclick="menu(this.id)">
					<a href="<?php echo site_url('beranda'); ?>" title="Beranda">
						<i class="icon-home4"></i> <span>Beranda</span>
					</a>
				</li>
				<li id="Kategori_maps" onclick="menu(this.id)">
					<a href="javascript:void(0);" title="Kategori Maps">
						<i class="icon-folder-open"></i> <span>Kategori Maps</span>
					</a>
				</li>
				<li id="location" onclick="menu(this.id)">
					<a href="javascript:void(0);" title="Location">
						<i class="icon-map"></i> <span>Lokasi</span>
					</a>
				</li>
				<li id="Kategori" onclick="menu(this.id)">
					<a href="javascript:void(0);" title="Kategori Artikel">
						<i class="icon-folder-open"></i> <span>Kategori Artikel</span>
					</a>
				</li>
				<li id="artikel" onclick="menu(this.id)">
					<a href="javascript:void(0);" title="Berita dan Artikel">
						<i class="icon-newspaper"></i> <span>Berita dan Artikel</span>
					</a>
				</li>
				<li id="slider" onclick="menu(this.id)">
					<a  href="javascript:void(0);" title="Management Banner">
						<i class="icon-images3"></i> <span>Management Banner</span>
					</a>
				</li>
				<li class="navigation-header">
					<span>Management</span> <i class="icon-menu" title="Pengaturan Management"></i>
				</li>
				<li id="pengaturan">
					<a href="#" title="Pengaturan"><i class="icon-wrench3"></i> <span>Pengaturan</span></a>
					<ul>
						<li id="menu" onclick="pengaturan(this.id)">
							<a href="javascript:void(0);"  title="Menu Management">
								<i class="icon-copy"></i> <span>Menu Management</span>
							</a>
						</li>
						<li id="user" onclick="pengaturan(this.id)" class="hidden">
							<a href="javascript:void(0);" title="User Management">
								<i class="icon-users"></i> <span>User Management</span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<!-- /main navigation -->
</div>
