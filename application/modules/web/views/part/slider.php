<div class="hero-area" id="slider-home">
	<div class="hero-slides owl-carousel">
		<?php
		foreach ($slider as $key => $value):
			?>
			<div class="single-hero-slide bg-img background-overlay" style="background-image: url(<?php echo base_url('assets/files/slider/'.$value->images_slider)?>);"></div>
			<?php
		endforeach;
		?>
	</div>
	<div class="hero-post-area">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="hero-post-slide">
						<?php
						$no=1;
						foreach ($headline as $key => $value):
							?>
							<div class="single-slide d-flex align-items-center">
								<div class="post-number">
									<p><?php echo $no++;?></p>
								</div>
								<div class="post-title">
									<a href="javascript:void();" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')"><?php echo $value->judul ?></a>
								</div>
							</div>
							<?php
						endforeach;
						?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
