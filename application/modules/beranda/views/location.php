<?php
echo script_tag('assets/js/input.js');
?>
<script type="text/javascript">
	$(function() {
		CKEDITOR.replace('editor-full', {
			height: '300px',
			filebrowserBrowseUrl : '<?php echo base_url();?>assets/ckfinder/ckfinder.html',
			filebrowserUploadUrl: '<?php echo base_url();?>assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
			extraPlugins: 'uploadimage,image2',
			removePlugins: 'image',
		});   
	});
</script>
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
						<h5 class="panel-title">Lokasi Management </h5>
						<div class="heading-elements">
							<ul class="icons-list">
								<li>
									<button type="button" class="btn btn-primary" onclick="tambah_location()">
										<i class="icon-file-plus"></i> Tambah Lokasi
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
									<table class="table datatable-basic table-hover kategori">
										<thead>
											<tr>
												<th></th>
												<th>Nama Lokasi</th>
												<th>Longitude</th>
												<th>Latitude</th>
												<th>Status</th>
												<th class="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>

								<div class="tab-pane" id="justified-right-icon-tab2">
									<table class="table datatable-basic table-hover" id="trash_kategori">
										<thead>
											<tr>
												<th></th>
												<th>Nama Lokasi</th>
												<th>Longitude</th>
												<th>Latitude</th>
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
					<div id="modal_backdrop" class="modal fade">
						<div class="modal-dialog modal-full">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h5 class="modal-title"><b></b></h5>
								</div>
								<form action="" id="add_menu" class="form-horizontal">
									<div class="modal-body">
										<div class="form-group">
											<label class="control-label col-lg-2">Nama Lokasi</label>
											<div class="col-lg-10">
												<input type="text" class="form-control" name="location_name" id="location_name" placeholder="Nama Lokasi" required>
												<span class="help"></span>
												<input type="hidden" name="id" id="id" class="form-control">											
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Kategori</label>
											<div class="col-lg-10">
												<select name="id_category" id="id_category" class="form-control select2">
													<?php
														echo kategori_lokasi();
													?>
												</select>
												<input type="hidden" name="kategori">
												<span class="help"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Longitude</label>
											<div class="col-lg-10">
												<input type="text" class="form-control" name="longitude" id="longitude" placeholder="Longitude" required>
												<span class="help"></span>									
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Latitude</label>
											<div class="col-lg-10">
												<input type="text" class="form-control" name="latitude" id="latitude" placeholder="Latitude" required>
												<span class="help"></span>										
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Deskripsi</label>
											<div class="col-lg-10">
												<textarea name="editor-full" id="editor-full" rows="4" cols="4" style="resize: none;">
												</textarea>
												<span class="help"></span>
											</div>
										</div>	
										<div class="form-group">
											<label class="control-label col-lg-2" style="padding-top: 38px;">Foto</label>
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
										<div class="form-group">
											<label class="control-label col-lg-2">File</label>
											<div class="col-lg-10">
												<div class="col-lg-12" style="padding: 0">
													<div class="input-group">
														<span class="input-group-btn">
															<span class="btn btn-default btn-file">
																Upload File <input type="file" name="imgInp1" id="imgInp1" accept="application/pdf">
															</span>
														</span>
														<input type="text" class="form-control file" readonly>
													</div>
													<span class="help"></span>
													<br>											
													<span class="help">Accepted formats: jpg. Max file size 2Mb</span>
												</div>
											</div>
										</div>									
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-link" data-dismiss="modal">Tutup</button>
										<button type="button" onclick="simpan_location()" id="submit" class="btn btn-primary">Simpan</button>
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
	table = $('.kategori').DataTable({ 
		"processing"  : true,
		"serverSide"  : true, 
		"searchDelay" : 0.5 * 1000,
		"order": [],

		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=location')?>",
			"type": "POST"
		},

		"columnDefs": [
		{ 
			"targets": [ 0,3,4 ],
			"orderable": false,
		},
		],
	});
	table_trash = $('#trash_kategori').DataTable({ 

		"processing": true,
		"serverSide": true,
		"searchDelay" : 0.5 * 1000,
		"order": [],

		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=location_del')?>",
			"type": "POST"
		},

		"columnDefs": [
		{ 
			"targets": [ 0,3,4 ],
			"orderable": false,
		},
		],
	});
	setInterval( function () {
		table.ajax.reload(null,false);
		table_trash.ajax.reload(null,false);
	}, 5 * 60 * 1000 );
	
	function tambah_location()
	{
		save_method = 'add';
		$('#add_menu')[0].reset(),
		CKEDITOR.instances['editor-full'].setData(''),
		$('.has-error > .col-lg-10 > .help').empty(),
		$('.form-group').removeClass('has-error'),
		$('.input-group').removeClass('has-error'),
		$('#id_category').val(0).change();
		$('#img-upload').attr('src','');
		$('.file').val('');
		$('#modal_backdrop').modal('show'),
		$('.modal-title').text('Tambah Location');
	}

	function edit_location(id)
	{
		save_method = 'update';
		$.ajax({
			url : "<?php echo site_url('beranda/ajax_edit?type=location')?>",
			type: "post",
			data : {
				id : id,
			},
			dataType: "JSON",
			success: function(data)
			{
				$('#modal_backdrop').modal('show');
				$('#id').val(id);
				$('#location_name').val(data.location_name);
				$('#latitude').val(data.latitude);
				$('#longitude').val(data.longitude);
				$('#id_category').val(data.id_category).change();
				$('.file').val(data.file);

				$('#img-upload').attr('src','<?php echo base_url('assets/files/') ?>'+data.image),
				$('#file').val(data.image);
				
				CKEDITOR.instances['editor-full'].setData(data.description);
				$('.modal-title').text('Ubah Location');
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				alert('Error get data from ajax');
			}
		});
	}


	function simpan_location() 
	{
		if(save_method == 'add')
		{
			var url = '<?php echo site_url("beranda/ajax_save?type=location"); ?>';
		}
		else
		{
			var url = '<?php echo site_url("beranda/ajax_ubah?type=location"); ?>';
		}
		var status = 0;
		if($('#headline').is(':checked'))
		{
			status = 1;
		}
		
		var form = $('form')[0];
		var data = new FormData(form);
		data.append('description',CKEDITOR.instances['editor-full'].getData());
		

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
						});
					}
					else {
						swal({
							text: obj.message,
							title: "",
							type: "success",
							button: true,
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

	function hapus_location(id)
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
					url : '<?php echo site_url("beranda/ajax_hapus?type=location"); ?>',
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

	function restore_location(id)
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
					url: '<?php echo site_url('beranda/ajax_restore?type=location'); ?>',
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