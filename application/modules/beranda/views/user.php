<div id="content">
	<div class="page-header page-header-default">
		<div class="page-header-content">
			<div class="page-title">
				<h4>
					<i class="icon-arrow-left52 position-left"></i>
					<span class="text-semibold">Home</span> - <span class="text-semibold">Pengaturan</span> -<?php echo $header ?>
				</h4>
			</div>

		</div>

		<div class="breadcrumb-line">
			<ul class="breadcrumb">
				<li>
					<i class="icon-home2 position-left"></i> Home
				</li>
				<li>
					<i class="icon-wrench3 position-left"></i> Pengaturan
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
						<h5 class="panel-title">User Management </h5>
						<div class="heading-elements">
							<ul class="icons-list">
								<li>
									<button type="button" class="btn btn-primary" onclick="tambah_user()">
										<i class="icon-file-plus"></i> Tambah User
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
									<table class="table datatable-basic table-hover" id="active_user">
										<thead>
											<tr>
												<th> </th>
												<th>Nama</th>
												<th>SKPD</th>
												<th>Status</th>
												<th class="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>
								</div>

								<div class="tab-pane" id="justified-right-icon-tab2">
									<table class="table datatable-basic table-hover" id="decative_user">
										<thead>
											<tr>
												<th> </th>
												<th>Nama</th>
												<th>SKPD</th>
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
									<h5 class="modal-title"><b>Tambah User</b></h5>
								</div>
								<form action="" id="add_menu" class="form-horizontal">
									<div class="modal-body">
										<div class="form-group">
											<label class="control-label col-lg-3">NIP</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" name="nip" id="nip" placeholder="Nomor Induk Pegawai">
												<span class="help-block"></span>
												<input type="hidden" name="id" id="id" required>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Nama Pegawai</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" name="nama_pegawai" id="nama_pegawai" placeholder="Nama Pegawai" required readonly>
												<span class="help-block"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Jabatan Pegawai</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" id="jabatan_pegawai" placeholder="Jabatan Pegawai" required readonly>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Nama Unor</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" id="nama_unor" placeholder="Nama Unor" required readonly>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Nama OPD</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" name="nama_odp" id="nama_odp" placeholder="Nama ODP" required readonly>
												<input type="hidden" readonly id="kode_unor" class="form-control">
												<span class="help-block"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Hak Akses</label>
											<div class="col-lg-9">
												<select class="form-control select2" id="hak_akses">
													<option value="1">Administrator</option>
													<option value="2">Operator</option>
												</select>
											</div>
										</div>
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-link" data-dismiss="modal">Tutup</button>
										<button type="button" onclick="simpan_user()" id="submit" class="btn btn-primary">Simpan</button>
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
	table = $('#active_user').DataTable({ 

		"processing"  : true,
		"serverSide"  : true,
		"searchDelay" : 0.5 * 1000,
		"order": [],
		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=user')?>",
			"type": "POST"
		},
		"columnDefs": [
		{ 
			"targets": [ 0, 3, 4 ],
			"orderable": false,
		},
		],
	});
	table_trash = $('#decative_user').DataTable({ 

		"processing": true,
		"serverSide": true,
		"searchDelay" : 0.5 * 1000,
		"order": [],
		"ajax": {
			"url": "<?php echo site_url('beranda/ajax_list?type=user_del')?>",
			"type": "POST"
		},

		"columnDefs": [
		{ 
			"targets": [ 0, 3, 4 ],
			"orderable": false,
		},
		],
	});
	setInterval( function () {
		table.ajax.reload(null,false);
		table_trash.ajax.reload(null,false);
	}, 5 * 60 * 1000 );

	function tambah_user()
	{
		save_method = 'add';
		$('#nip').val('');
		$('#nama_pegawai').val('');
		$('#jabatan_pegawai').val('');
		$('#nama_unor').val('');
		$('#nama_odp').val('');
		$('#hak_akses').val('1').change();
		$('#modal_backdrop').modal('show');
		$('.modal-title').text('Tambah User');
	}

	function simpan_user() 
	{
		if(save_method == 'add')
		{
			var data = {
				nip           : $('#nip').val(),
				nama_pegawai  : $('#nama_pegawai').val(),
				kode_unor     : $('#kode_unor').val(),
				nama_odp      : $('#nama_odp').val(),
				hak_akses     : $('#hak_akses').val(),
			};
			var url = '<?php echo site_url("beranda/ajax_save?type=user"); ?>';
		}
		else
		{
			var data = {
				id            : $('#id').val(),
				nip           : $('#nip').val(),
				nama_pegawai  : $('#nama_pegawai').val(),
				kode_unor     : $('#kode_unor').val(),
				nama_odp      : $('#nama_odp').val(),
				hak_akses     : $('#hak_akses').val(),
			};
			var url = '<?php echo site_url("beranda/ajax_ubah?type=user"); ?>';
		}

		$.ajax({
			url: url,
			type: 'post',
			data: data,
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
							timer: 3000
						});
					}
					else {
						swal({
							text: obj.message,
							title: "",
							type: "success",
							button: true,
							timer: 3000
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

	function hapus_user(id)
	{
		swal({
			text: "Apakah Data User ini Ingin Di Hapus?",
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
					url: '<?php echo site_url("beranda/ajax_hapus?type=user"); ?>',
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
								timer: 3000
							});
						}
						else {
							swal({
								text: obj.message,
								title: "",
								type: "success",
								button: true,
								timer: 3000
							});
						}
						table.ajax.reload();
						table_trash.ajax.reload();
					}
				});
			}
		});
	}

	function restore_user(id)
	{
		swal({
			text: "Apakah Data User ini Ingin Di Kembalikan?",
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
					url: '<?php echo site_url('beranda/ajax_restore?type=user'); ?>',
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
								timer: 3000
							});
							
						}
						else {
							swal({
								text: obj.message,
								title: "",
								type: "success",
								button: true,
								timer: 3000
							});
						}
						table.ajax.reload();
						table_trash.ajax.reload();

					}
				});
			}
		});
	}

	function edit_user(id)
	{
		save_method = 'update';
		$("#loading").show();
		$.ajax({
			url : "<?php echo site_url('beranda/ajax_edit?type=user')?>",
			type: "post",
			data :
			{
				id : id
			},
			dataType: "JSON",
			success: function(data)
			{
				$("#loading").hide();
				$('#modal_backdrop').modal('show');
				$('#nip').val(data.nip);
				$('#hak_akses').val(data.id_type).change();
				$('#id').val(id);
				$('.modal-title').text('Ubah User');
				nip();
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				alert('Error get data from ajax');
			}
		});
	}

	$("#user_edit").click(function() {
		$("#loading").show();
		var dataString = { 
			data : $("#nip").val(),
			id : $("#id").val(),
		};
		$.ajax({
			type: "POST",
			url: "<?php echo site_url('beranda/json_nip') ?>",
			data: dataString,
			cache : false,
			success: function(res)
			{
				data = JSON.parse(res);
				if(data['notif'])
				{
					swal({
						title: data['notif'],
						text: "",
						type: "error",
						button: true,
						timer: 3000
					});
				}
				$("#nama_pegawai").val(data['nama']);
				$("#jabatan_pegawai").val(data['jabatan']);
				$("#nama_unor").val(data['nama_unor']);
				$("#nama_odp").val(data['nama_opd']);
				$("#kode_unor").val(data['kode_unor']);

				$("#loading").hide();
			} ,error: function(xhr, status, error) {
				alert(error);
			},
		});
	});
	$("#nip").keyup(function(event) 
	{
		var dataString = { 
			data : $("#nip").val(),
			id : $("#id").val(),
		};
		$.ajax({
			type: "POST",
			url: "<?php echo site_url('beranda/json_nip') ?>",
			data: dataString,
			cache : false,
			success: function(res)
			{
				data = JSON.parse(res);
				if(data['notif'])
				{
					swal({
						title: data['notif'],
						text: "",
						type: "error",
						button: true,
						timer: 3000
					});
				}
				$("#nama_pegawai").val(data['nama']);
				$("#jabatan_pegawai").val(data['jabatan']);
				$("#nama_unor").val(data['nama_unor']);
				$("#nama_odp").val(data['nama_opd']);
				$("#kode_unor").val(data['kode_unor']);

				$("#loading").hide();
			} ,error: function(xhr, status, error) {
				alert(error);
			},
		});
	});
</script>