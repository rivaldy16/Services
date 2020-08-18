<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php if(isset($title_page)){echo $title_page;} ?></title>
	<link rel="shortcut icon" href="<?php echo base_url('assets/images/'); ?>favicon.png" type="image/x-icon" />
	<?php
	include ('part/core.php');
	?>
	<style type="text/css">
	#loading {
		position:   fixed;
		z-index:    9000;
		top:        0;
		left:       0;
		height:     100%;
		width:      100%;
		background: rgba( 255, 255, 255, .8 )
		url('<?php echo base_url('assets/images/loader.gif'); ?>')
		50% 50%
		no-repeat;
		background-size: 250px;
	}
</style>
</head>

<body>
	<div id="loading"></div>
	<?php
	include 'part/header.php';
	?>
	<!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">

			<!-- Main sidebar -->
			<div class="sidebar sidebar-main">
				<?php
				include 'part/menu.php';
				?>
			</div>
			<!-- /main sidebar -->
			<div class="content-wrapper">
				<?php 
                echo $this->load->view($content);
                ?>
            </div>
        </div>
        <!-- /page content -->

    </div>
    <script type="text/javascript">
        var save_method; 
        $(window).on('load', function () {
            $("#loading").fadeOut("fast");
        });

        function menu(param) 
        {
            $("#loading").show();
            $("ul>li.active").removeClass('active');
            $("#" + param).addClass('active');
            $("#content").fadeOut("fast");
            $("ul").removeAttr('style');

            $.ajax({
                url: "<?php echo site_url('beranda/'); ?>"+param,
                type: "post",
                success: function (data) {
                    $("#content").html(data);
                    $("#content").hide();
                    $("#content").fadeIn("fast");
                    $("#loading").fadeOut("fast");
                    $('.select2').select2();
                    $("body").removeClass('modal-open');
                    $("body").removeAttr('style');
                }
            });
        }

        function pengaturan(param) 
        {
            $("#loading").show();
            $("ul>li.active").removeClass('active');
            $("#" + param).addClass('active');
            $("#pengaturan").addClass('active');
            $("#content").fadeOut("fast");
            $("#site_map>ul").removeAttr('style');
            $("#site_map>ul>li>ul").removeAttr('style');
            $.ajax({
                url: "<?php echo site_url('beranda/'); ?>"+param,
                type: "post",
                success: function (data) {
                    $("#content").html(data);
                    $("#content").hide();
                    $("#content").fadeIn("fast");
                    $("#loading").fadeOut("fast");
                    $('.select2').select2();
                    $("body").removeClass('modal-open');
                    $("body").removeAttr('style');
                }
            });
        }


        function hapus_menu(id)
        {
            swal({
                text: "Apakah Data Menu ini Ingin Di Hapus?",
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
                        url : '<?php echo site_url("beranda/ajax_hapus?type=menu"); ?>',
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
                            menu('menu');
                        }
                    });
                }
            });
        }

        function simpan_menu() 
        {
            if(save_method == 'add')
            {
                var data = {
                    id_kategori : $('#id_kategori').val(),
                    menu        : $('#judul_menu').val(),
                    link        : $('#alamat_link').val(),
                    parent      : $('#parent').val(),
                };
                var url = '<?php echo site_url("beranda/ajax_save?type=menu"); ?>';
            }
            else
            {
                var data = {
                    id_kategori : $('#id_kategori').val(),
                    menu        : $('#judul_menu').val(),
                    link        : $('#alamat_link').val(),
                    id          : $('#id').val(),
                    parent      : $('#parent').val(),
                };
                var url = '<?php echo site_url("beranda/ajax_ubah?type=menu"); ?>';
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
                        menu('menu');
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

        function edit_menu(id)
        {
            save_method = 'update';
            $.ajax({
                url : "<?php echo site_url('beranda/ajax_edit?type=menu')?>",
                type: "post",
                data :
                {
                    id : id
                },
                dataType: "JSON",
                success: function(data)
                {
                   $('#modal_backdrop').modal('show');
                   $('#judul_menu').val(data.menu);
                   $('#alamat_link').val(data.link);
                   $('#id').val(id);
                   $('#parent').val(data.parent).change();
                   $('#id_kategori').val(data.id_kategori).change();
                   $('.modal-title').text('Ubah Menu');
               },
               error: function (jqXHR, textStatus, errorThrown)
               {
                   alert('Error get data from ajax');
               }
           });
        }

        function tambah_menu()
        {
            save_method = 'add';
            $('#modal_backdrop').modal('show');
            $('.modal-title').text('Tambah Menu');
        }

        function nip()
        {
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
                            text: data['notif'],
                            title: "",
                            type: "error",
                            button: true,
                            timer: 1000
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
        }

        function data_bulan(param)
        {
            if(param == 1)
            {
                return 'Januari';
            }
            else if(param == 2)
            {
                return 'Februari';
            }
            else if(param == 3)
            {
                return 'Maret';
            }
            else if(param == 4)
            {
                return 'April';
            }
            else if(param == 5)
            {
                return 'Mei';
            }
            else if(param == 6)
            {
                return 'Juni';
            }
            else if(param == 7)
            {
                return 'Juli';
            }
            else if(param == 8)
            {
                return 'Agustus';
            }
            else if(param == 9)
            {
                return 'September';
            }
            else if(param == 10)
            {
                return 'Oktober';
            }
            else if(param == 11)
            {
                return 'November';
            }
            else
            {
                return 'Desember';
            }
        }
    </script>    
</body>
</html>
