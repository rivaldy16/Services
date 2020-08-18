<div class="col-12 col-md-8 col-lg-4">
	<div class="post-sidebar-area wow " data-wow-delay="0.2s">
		<div class="sidebar-widget-area">
			<h5 class="title">Berita Terpopuler</h5>
			<div class="widget-content">
				<?php
				foreach ($side_news as $key => $value):
					?>
					<div class="single-blog-post post-style-2 d-flex align-items-center widget-post">
						<div class="post-thumbnail side_news"  style="background-image: url(<?php echo base_url('assets/files/'.$value->foto)?>);">
						</div>
						<div class="post-content">
							<a href="javascript:void(0);" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')" class="headline">
								<h5 class="mb-0"><?php echo $value->judul; ?></h5>
							</a>
						</div>
					</div>
					<?php
				endforeach;
				?>
			</div>
		</div>
	</div>
</div>