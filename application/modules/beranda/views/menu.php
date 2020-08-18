<?php
echo link_tag('assets/css/style.css');
?>
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
						<h5 class="panel-title">Menu Management </h5>
						<div class="heading-elements">
							<ul class="icons-list">
								<li>
									<button type="button" class="btn btn-primary" onclick="tambah_menu()">
										<i class="icon-file-plus"></i> Tambah Menu
									</button>
								</li>
							</ul>
						</div>
					</div>
					<div class="panel-body">
						<div class="cf nestable-lists">
							<div class="dd" id="nestable">
								<?php
								echo $menu;
								?>
								<input type="hidden" id="nestable-output">
							</div>
						</div>
					</div>
					<!-- Disabled backdrop -->
					<div id="modal_backdrop" class="modal fade" data-backdrop="false">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h5 class="modal-title"><b>Tambah Menu</b></h5>
								</div>
								<form action="" id="add_menu" class="form-horizontal">
									<div class="modal-body">
										<div class="form-group">
											<label class="control-label col-lg-3">Menu</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" name="menu" id="judul_menu" placeholder="Judul Menu" required>
												<span class="help-block"></span>
												<input type="hidden" name="id" id="id">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Parent</label>
											<div class="col-lg-9">
												<select class="form-control select2" name="parent" id="parent">
													<?php
														echo menu();
													?>
												</select>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Kategori</label>
											<div class="col-lg-9">
												<select class="form-control select2" name="id_kategori" id="id_kategori">
													<?php
														echo kategori();
													?>
												</select>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-lg-3">Link</label>
											<div class="col-lg-9">
												<input type="text" class="form-control" name="link" id="alamat_link" placeholder="Alamat Link">
												<span class="help-block"></span>
											</div>
										</div>
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-link" data-dismiss="modal">Tutup</button>
										<button type="button" onclick="simpan_menu()" id="submit" class="btn btn-primary">Simpan</button>
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

	$("#judul_menu" ).keyup(function( event ) {
		var link = $("#judul_menu").val().toLowerCase().replace(/ /g,"-");
		$("#alamat_link").val(link.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,""));
	});

	$('#modal_backdrop').on('hidden.bs.modal', function () {
		$('#judul_menu').val('');
		$('#id').val('');
		$('#alamat_link').val('');
	});
	$(document).ready(function()
	{
		var updateOutput = function(e)
		{
			var list   = e.length ? e : $(e.target),
			output = list.data('output');
			if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
        } else {
        	output.val('JSON browser support required for this demo.');
        }
    };

    // activate Nestable for list 1
    $('#nestable').nestable({
    	group: 1
    })
    .on('change', updateOutput);

    // output initial serialised data
    updateOutput($('#nestable').data('output', $('#nestable-output')));

    $('#nestable-menu').on('click', function(e)
    {
    	var target = $(e.target),
    	action = target.data('action');
    	if (action === 'expand-all') {
    		$('.dd').nestable('expandAll');
    	}
    	if (action === 'collapse-all') {
    		$('.dd').nestable('collapseAll');
    	}
    });

    $('.dd').on('change', function() {
        $("#loading").show();
     
          var dataString = { 
              data : $("#nestable-output").val(),
            };

        $.ajax({
            type: "POST",
            url: "<?php echo site_url('beranda/json_menu') ?>",
            data: dataString,
            cache : false,
            success: function(data){
              $("#loading").hide();
            } ,error: function(xhr, status, error) {
              alert(error);
            },
        });
    });
});
</script>
