<div id="content">
	<?php include('part/slider.php'); ?>
	<div class="main-content-wrapper section-padding-100">
		<div class="container">
			<div class="row justify-content-center">
				<!-- ============= Post Content Area Start ============= -->
				<div class="col-12 col-lg-8">
					<div class="post-content-area mb-50">
						<!-- Catagory Area -->
						<div class="title-category">
							<h5>Beranda</h5>
						</div>
						<div class="world-catagory-area">
							<div class="tab-content" id="myTabContent">
								<div class="tab-pane fade show active" id="world-tab-1" role="tabpanel" aria-labelledby="tab1">
									<div class="row">
										<div class="col-12 col-md-6">
											<div class="world-catagory-slider owl-carousel wow " data-wow-delay="0.1s">
												<?php
												foreach ($headline as $key => $value):
													?>
													<div class="single-blog-post">
														<div class="post-thumbnail headline-thumbnail">
															<?php echo img('assets/files/'.$value->foto); ?>
														</div>
														<div class="post-content headline-content">
															<a href="javascript:void(0);" class="headline" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')">
																<h5><?php echo $value->judul; ?></h5>
															</a>
															<p>
																<?php
																echo selengkapnya($value->text);
																?>
															</p>
															<div class="post-meta">
																<p>
																	<a href="javascript:void(0);" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')" class="post-date"><?php echo indonesian_date($value->date); ?></a>
																</p>
															</div>
														</div>
													</div>
													<?php
												endforeach;
												?>
											</div>
										</div>

										<div class="col-12 col-md-6">
											<?php
											foreach ($headline as $key => $value):
												?>
												<div class="single-blog-post post-style-2 d-flex align-items-center wow">
													<div class="post-thumbnail left-headline" style="background-image: url(<?php echo base_url('assets/files/'.$value->foto)?>);">
													</div>
													<div class="post-content">
														<a href="javascript:void(0);" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')" class="headline" >
															<h5><?php echo $value->judul; ?></h5>
														</a>
														<div class="post-meta">
															<p>
																<a href="javascript:void(0);" class="post-date" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')"><?php echo indonesian_date($value->date); ?></a>
															</p>
														</div>
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
					<div class="post-content-area mb-50">
						<div class="world-catagory-area">
							<?php
							foreach ($last_news as $key => $value):
								?>
								<div class="single-blog-post post-style-4 d-flex align-items-center wow ">
									<div class="post-thumbnail last_news" style="background-image: url(<?php echo base_url('assets/files/'.$value->foto)?>);">
									</div>
									<div class="post-content">
										<a href="javascript:void();" class="headline" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')">
											<h5><?php echo $value->judul; ?></h5>
										</a>
										<p>
											<?php
											echo selengkapnya($value->text);
											?>
										</p>
										<div class="post-meta">
											<a href="javascript" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')" class="post-date"><?php echo indonesian_date($value->date); ?></a>
										</div>
									</div>
								</div>
								<?php
							endforeach;
							?>
						</div>
					</div>
				</div>

				<!-- ========== Sidebar Area ========== -->
				<?php
					include ('part/sidebar.php');
				?>
			</div>
		</div>
	</div>
	<?php
	echo script_tag('assets/js/jquery/jquery-2.2.4.min.js');
	echo script_tag('assets/js/popper.min.js');
	echo script_tag('assets/js/bootstrap.min.js');
	echo script_tag('assets/js/plugins.js');
	echo script_tag('assets/js/active.js');
	echo script_tag('assets/js/plugins/forms/selects/select2.min.js');
	?>
</div>