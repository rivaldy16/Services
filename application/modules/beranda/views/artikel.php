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
						<h5 class="panel-title">Artikel Management </h5>
						<div class="heading-elements">
							<ul class="icons-list">
								<li>
									<button type="button" class="btn btn-primary" onclick="tambah_artikel()">
										<i class="icon-file-plus"></i> Tambah Berita &amp; Artikel
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
												<th>Judul</th>
												<th>Tanggal</th>
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
												<th>Judul</th>
												<th>Tanggal</th>
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
											<label class="control-label col-lg-2">Judul Artikel</label>
											<div class="col-lg-10">
												<input type="text" class="form-control" name="judul" id="judul" placeholder="Judul Artikel" required>
												<span class="help"></span>
												<input type="hidden" class="form-control" name="link" id="alamat" placeholder="Alamat Link">
												<input type="hidden" name="id" id="id" class="form-control">											
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Kategori</label>
											<div class="col-lg-10">
												<select name="id_kategori" id="id_kategori" class="form-control select2">
													<?php
														echo kategori();
													?>
												</select>
												<input type="hidden" name="kategori">
												<span class="help"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">PDF</label>
											<div class="col-lg-10">
												<div class="col-lg-5" style="margin-bottom: 10px; padding: 0">
													<embed id="pdf-upload" width="500" height="500">
												</div>
												<div class="col-lg-12" style="padding: 0">
													<div class="input-group">
														<span class="input-group-btn">
															<span class="btn btn-default btn-file">
																Upload PDF <input type="file" name="pdf" id="pdf" accept="application/pdf">
															</span>
														</span>
														<input type="text" class="form-control pdf" readonly>
													</div>
													<input type="hidden" name="pdf" id="datapdf">
													<span class="help"></span>
													<br>											
													<span class="help">Accepted formats: PDF</span>
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Foto</label>
											<div class="col-lg-10">
												<div class="col-lg-5" style="margin-bottom: 10px; padding: 0">
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
											<label class="control-label col-lg-2">Headline</label>
											<div class="col-lg-10">
												<div class="checkbox checkbox-switch">
													<label id="checkbox">
														<input type="checkbox" name="headline" id="headline" data-off-color="danger" data-on-text="Yes" data-off-text="No" class="switch" data-size="mini"> 
													</label>
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-2">Artikel</label>
											<div class="col-lg-10">
												<textarea name="editor-full" id="editor-full" rows="4" cols="4" style="resize: none;">
												</textarea>
												<span class="help"></span>
											</div>
										</div>										
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-link" data-dismiss="modal">Tutup</button>
										<button type="button" onclick="simpan_artikel()" id="submit" class="btn btn-primary">Simpan</button>
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
			"url": "<?php echo site_url('beranda/ajax_list?type=artikel')?>",
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
			"url": "<?php echo site_url('beranda/ajax_list?type=artikel_del')?>",
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
	
	$("#judul" ).keyup(function( event ) {
		var link = $("#judul").val().toLowerCase().replace(/ /g,"-");
		$("#alamat").val(link.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,""));
	});

	function tambah_artikel()
	{
		save_method = 'add';
		$('#add_menu')[0].reset(),
		CKEDITOR.instances['editor-full'].setData(''),
		$('.has-error > .col-lg-10 > .help').empty(),
		$('.form-group').removeClass('has-error'),
		$('.input-group').removeClass('has-error'),
		$('#img-upload').removeAttr('src'),
		$('#pdf-upload').removeAttr('src'),
		$('#id_kategori').val(0).change();
		$('#modal_backdrop').modal('show'),
		$('.modal-title').text('Tambah Artikel');
	}

	function edit_artikel(id)
	{
		save_method = 'update';
		$.ajax({
			url : "<?php echo site_url('beranda/ajax_edit?type=artikel')?>",
			type: "post",
			data : {
				id : id,
			},
			dataType: "JSON",
			success: function(data)
			{
				$('#modal_backdrop').modal('show');
				$('#id').val(id);
				$('#judul').val(data.judul);
				$('#alamat').val(data.url);
				$('#id_kategori').val(data.id_kategori).change();
				$('#datapdf').val(data.file);
				$('input[name="foto"]').val(data.foto);
				if(data.headline == 1)
				{
					$("#checkbox").empty();
					$("#checkbox").append('<input type="checkbox" name="headline" id="headline" data-off-color="danger" data-on-text="Yes" data-off-text="No" class="switch" data-size="mini" checked >');
					$(".switch").bootstrapSwitch();
				}
				
				CKEDITOR.instances['editor-full'].setData(data.text);
				if(data.file !== '')
				{
					var pdf = '<?php echo base_url('assets/files/'); ?>'+data.file;
					$("#pdf-upload").attr("src",pdf);
				}
				if(data.foto !== '')
				{
					var img = '<?php echo base_url('assets/files/'); ?>'+data.foto;
					$("#img-upload").attr("src",img);	
				}				
				$('.modal-title').text('Ubah Artikel');
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				alert('Error get data from ajax');
			}
		});
	}


	function simpan_artikel() 
	{
		if(save_method == 'add')
		{
			var url = '<?php echo site_url("beranda/ajax_save?type=artikel"); ?>';
		}
		else
		{
			var url = '<?php echo site_url("beranda/ajax_ubah?type=artikel"); ?>';
		}
		var status = 0;
		if($('#headline').is(':checked'))
		{
			status = 1;
		}
		
		var form = $('form')[0];
		var data = new FormData(form);
		data.append('headline',status);
		data.append('editor',CKEDITOR.instances['editor-full'].getData());
		

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

	function hapus_artikel(id)
	{
		swal({
			text: "Apakah Data Artikel ini Ingin Di Hapus?",
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
					url : '<?php echo site_url("beranda/ajax_hapus?type=artikel"); ?>',
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

	function restore_artikel(id)
	{
		swal({
			text: "Apakah Data Artikel ini Ingin Di Kembalikan?",
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
					url: '<?php echo site_url('beranda/ajax_restore?type=artikel'); ?>',
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