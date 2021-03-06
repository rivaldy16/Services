<?php
echo script_tag('assets/js/input.js');
?>
<div id="content">
	<div class="page-header page-header-default">
		<div class="page-header-content">
			<div class="page-title">
				<h4>
					<i class="icon-arrow-left52 position-left"></i>
					<span class="text-semibold">Home</span> - <?php echo $header ?>
				</h4>
			</div>

		</div>

		<div class="breadcrumb-line">
			<ul class="breadcrumb">
				<li>
					<i class="icon-home2 position-left"></i> Home
				</li>
				<li class="active">
					<?php echo $header ?>
				</li>
			</ul>
		</div>
	</div>
	<div class="content">
		<!-- Main charts -->
		<div class="row">
			<div class="col-lg-12">
				<div class="panel panel-flat">
					<div class="panel-heading">
						<h5 class="panel-title"><?php echo $header ?> </h5>
						<div class="heading-elements">
							<ul class="icons-list">
								<li>
									<button type="button" class="btn btn-primary" onclick="tambah_data()">
										<i class="icon-file-plus"></i> Tambah Slider
									</button>
								</li>
							</ul>
						</div>
					</div>
					<div class="panel-body">
						<div class="tabbable">
							<ul class="nav nav-tabs nav-tabs-bottom nav-justified">
								<li class="active">
									<a href="#justified-right-icon-tab1" data-toggle="tab">
										Active <i class="icon-menu7 position-right"></i>
									</a>
								</li>
								<li>
									<a href="#justified-right-icon-tab2" data-toggle="tab">
										Inactive <i class="icon-mention position-right"></i>
									</a>
								</li>
							</ul>

							<div class="tab-content">
								<div class="tab-pane active" id="justified-right-icon-tab1">
									<table class="table table-hover slider">
										<thead>
											<tr>
												<th> </th>
												<th>Judul</th>
												<th>Status</th>
												<th class="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>

								<div class="tab-pane" id="justified-right-icon-tab2">
									<table class="table table-hover slider_del">
										<thead>
											<tr>
												<th> </th>
												<th>Judul</th>
												<th>Status</th>
												<th class="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- Disabled backdrop -->
					<div id="modal_backdrop" class="modal fade" data-backdrop="false">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h5 class="modal-title"><b>Tambah Slider</b></h5>
								</div>
								<form action="" id="add_menu" class="form-horizontal">
									<div class="modal-body">
										<div class="form-group">
											<label class="control-label col-lg-2">Judul Slider</label>
											<div class="col-lg-10">
												<input type="text" class="form-control" name="judul_slider" id="judul" placeholder="Judul Slider">
												<span class="help-block"></span>
												<input type="hidden" name="id" id="id">
												<input type="hidden" name="file" id="file">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Foto</label>
											<div class="col-lg-10">
												<div class="col-lg-12" style="margin-bottom: 10px; padding: 0">
													<img id='img-upload'/>	
												</div>
												<div class="col-lg-12" style="padding: 0">
													<div class="input-group">
														<span class="input-group-btn">
															<span class="btn btn-default btn-file">
																Upload Foto <input type="file" name="imgInp" id="imgInp" accept="image/jpeg">
															</span>
														</span>
														<input type="text" class="form-control foto" readonly>
													</div>
													<input type="hidden" name="foto">
													<span class="help"></span>
													<br>											
													<span class="help">Accepted formats: jpg. Max file size 2Mb</span>
												</div>
											</div>
										</div>
									</div>


									<div class="modal-footer">
										<button type="button" class="btn btn-link" data-dismiss="modal">Tutup</button>
										<button type="button" onclick="simpan_data()" id="submit" class="btn btn-primary">Simpan</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<!-- /disabled backdrop -->
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	var table;
	var table_trash;
	table = $('.slider').DataTable({ 

		"processing"  : true,
		"serverSide"  : true,
		"searchDelay" : 0.5 * 1000,
		"order": [],
		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=slider')?>",
			"type": "POST"
		},
		"columnDefs": [
		{ 
			"targets": [ 0,2, 3],
			"orderable": false,
		},
		],
	});
	table_trash = $('.slider_del').DataTable({ 

		"processing": true,
		"serverSide": true,
		"searchDelay" : 0.5 * 1000,
		"order": [],
		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=slider_del')?>",
			"type": "POST"
		},

		"columnDefs": [
		{ 
			"targets": [ 0,2, 3],
			"orderable": false,
		},
		],
	});
	setInterval( function () {
		table.ajax.reload(null,false);
		table_trash.ajax.reload(null,false);
	}, 5 * 60 * 1000 );
	

	function tambah_data()
	{
		save_method = 'add';
		$('#add_menu')[0].reset(),
		$('#img-upload').removeAttr('src'),
		$('.form-group').removeClass('has-error'),
		$('.help-block').empty(),
		$('#modal_backdrop').modal('show'),
		$('.modal-title').text('Tambah Slider');
	}

	function simpan_data() 
	{
		if(save_method == 'add')
		{
			var url = '<?php echo site_url("beranda/ajax_save?type=slider"); ?>';
		}
		else
		{
			var url = '<?php echo site_url("beranda/ajax_ubah?type=slider"); ?>';
		}
		var form = $('form')[0];
		var data = new FormData(form);

		$.ajax({
			url: url,
			type: 'post',
			data: data,
			processData:false,
			contentType:false,
			cache:false,
			async:false,
			success: function (res) {
				var obj = JSON.parse(res);
				if(obj.status)
				{
					if (obj.success !== true) {
						swal({
							text: obj.message,
							title: "",
							type: "error",
							button: true,
							timer: 1000
						});
					}
					else {
						swal({
							text: obj.message,
							title: "",
							type: "success",
							button: true,
							timer: 1000
						});
					}
					$('#modal_backdrop').modal('hide');
					table.ajax.reload();
					table_trash.ajax.reload();
				}
				else {
					for (var i = 0; i < obj.inputerror.length; i++) 
					{
						$('[name="'+obj.inputerror[i]+'"]').parent().parent().addClass('has-error');
						$('[name="'+obj.inputerror[i]+'"]').next().text(obj.error_string[i]); 
					}
				}
			}
		});
	}

	function edit_data(id)
	{
		save_method = 'update';
		$.ajax({
			url : "<?php echo site_url('beranda/ajax_edit?type=slider')?>",
			type: "post",
			data : {
				id : id,
			},
			dataType: "JSON",
			success: function(data)
			{
				$('#modal_backdrop').modal('show');
				$('[name="judul_slider"]').val(data.judul_slider);
				$('#img-upload').attr('src','<?php echo base_url('assets/files/slider/') ?>'+data.images_slider),
				$('#id').val(id);
				$('#file').val(data.images_slider);
				$('.modal-title').text('Ubah Slider');
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				alert('Error get data from ajax');
			}
		});
	}

	
	function hapus_data(id)
	{
		swal({
			text: "Apakah Data ini Ingin Di Hapus?",
			title: "",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#f8ce86",
			confirmButtonText: "Hapus",
			cancelButtonText: "Tidak",
			closeOnConfirm: false,
			closeOnCancel: true
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					url : '<?php echo site_url("beranda/ajax_hapus?type=slider"); ?>',
					type: 'post',
					data: {
						id: id
					},

					success: function (res) {
						var obj = JSON.parse(res);
						if (obj.success !== true) {
							swal({
								text: obj.message,
								title: "",
								type: "error",
								button: true,
								timer: 1000
							});
						}
						else {
							swal({
								text: obj.message,
								title: "",
								type: "success",
								button: true,
								timer: 1000
							});
						}
						table.ajax.reload();
						table_trash.ajax.reload();
					}
				});
			}
		});
	}

	function restore_data(id)
	{
		swal({
			text: "Apakah Data ini Ingin Di Kembalikan?",
			title: "",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#73bdf7",
			confirmButtonText: "Restore",
			cancelButtonText: "Tidak",
			closeOnConfirm: false,
			closeOnCancel: true
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					url: '<?php echo site_url('beranda/ajax_restore?type=slider'); ?>',
					type: 'post',
					data: {
						id: id
					},

					success: function (res) {
						var obj = JSON.parse(res);
						if (obj.success !== true) {
							swal({
								text: obj.message,
								title: "",
								type: "error",
								button: true,
								timer: 1000
							});
						}
						else {
							swal({
								text: obj.message,
								title: "",
								type: "success",
								button: true,
								timer: 1000
							});
						}
						table.ajax.reload();
						table_trash.ajax.reload();
					}
				});
			}
		});
	}
</script>