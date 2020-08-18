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
			background: rgba( 255, 255, 255, .9 )
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
	include ('part/menu.php');
	?>
	<?php $this->load->view($content); ?>
	
	<?php
	include ('part/footer.php');

	?>

	<script type="text/javascript">
		$(window).on('load', function () { // jquery 3, jquery 1 beda lagi
        	$("#loading").fadeOut("fast");
        });


		function menu(param) 
		{
			$("#loading").show();
			$("ul>li.active").removeClass('active');
			$("#" + param).parents().addClass('active');
			$.ajax({
				url: "<?php echo site_url('web/'); ?>"+param,
				type: "post",
				success: function (data) {
					$("#content").html(data);
					$("#loading").fadeOut("fast");
					$('html, body').animate({ scrollTop: 0 }, 2000);
					$(".select2").select2();
				}
			});
		}

		function home(param)
		{
			$("#loading").show();
			$("ul>li.active").removeClass('active');
			$("#" + param).parents().addClass('active');
			$.ajax({
				url: "<?php echo site_url('web/data/'); ?>"+param,
				type: "post",
				success: function (data) {
					$("#content").html(data);
					$("#loading").fadeOut("fast");
					$('html, body').animate({ scrollTop: 0 }, 2000);
					$(".select2").select2();
				}
			});
		}

		function detail(param,id)
		{
			$("#loading").show();
			$("ul>li.active").removeClass('active');
			$("#" + param).parents().addClass('active');
			$.ajax({
				url: "<?php echo site_url('web/data/'); ?>"+param+"/"+id,
				type: "post",
				success: function (data) {
					$("#content").html(data);
					$("#loading").fadeOut("fast");
					$('html, body').animate({ scrollTop: 0 }, 2000);
					$(".select2").select2();
				}
			});
		}
		
	</script>
	<style type="text/css">
		.dropdown:hover>.dropdown-menu {
  			display: block;
		}
		.dropdown-menu:hover>.dropdown-submenu {
			display: block;
		}
		.dropdown-submenu:hover>.dropdown-menu {
			display: block;
		}
		.dropdown-menu:hover {
			display: block;
		}
	</style>
	<script type="text/javascript">
		$('.dropdown-menu a.dropdown-toggle').hover(function(){
			if (!$(this).next().hasClass('show')) {
				$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
			}
			var $subMenu = $(this).next(".dropdown-menu");
			$subMenu.toggleClass('show');


			$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
				$('.dropdown-submenu .show').removeClass("show");
			});


			return false;
		});
	</script>
</body>
</html>
