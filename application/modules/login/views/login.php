<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login Desa Kranggan</title>
	<link rel="shortcut icon" href="<?php echo base_url('assets/images/'); ?>favicon.ico" type="image/x-icon" />
	<?php
	echo link_tag('https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900');
	echo link_tag('assets/css/icons/icomoon/styles.css');
	echo link_tag('assets/css/bootstrap.css');
	echo link_tag('assets/css/core.css');
	echo link_tag('assets/css/components.css');
	echo link_tag('assets/css/colors.css');

	echo script_tag('assets/js/plugins/loaders/pace.min.js');
	echo script_tag('assets/js/core/libraries/jquery.min.js');
	echo script_tag('assets/js/core/libraries/bootstrap.min.js');
	echo script_tag('assets/js/plugins/loaders/blockui.min.js');
	echo script_tag('assets/js/plugins/forms/styling/uniform.min.js');
	echo script_tag('assets/js/plugins/notifications/sweet_alert.min.js');
	echo script_tag('assets/js/core/app.js');
	?>
</head>

<body class="login-container bg-slate-800">
	<div class="page-container">
		<div class="page-content">
			<div class="content-wrapper">
				<div class="content">
					<form action="login/check" method="post">
						<div class="panel panel-body login-form">
							<div class="text-center">
								<?php
								echo img('assets/img/Lambang_Kota_Tangerang_Selatan.png','','style="width:70px; margin-bottom:20px;"');
								?>
							</div>
							<div class="form-group has-feedback has-feedback-left">
								<input type="text" class="form-control" placeholder="Username"  name="nip">
								<div class="form-control-feedback">
									<i class="icon-user text-muted"></i>
								</div>
							</div>

							<div class="form-group has-feedback has-feedback-left">
								<input type="password" class="form-control" placeholder="Password" name="pass">
								<div class="form-control-feedback">
									<i class="icon-lock2 text-muted"></i>
								</div>
							</div>

							<div class="form-group">
								<button type="submit" class="btn bg-blue btn-block">Login <i class="icon-circle-right2 position-right"></i></button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		swal({
			text: "<span style='color:#f44336'><?php echo $_SESSION['error_login'] ?></span>",
			title: "",
			type: "error",
			timer: 2000,
			html: true,
			confirmButtonText: 'Close',
  			confirmButtonColor: '#f44336',
		});
	</script>
</body>
</html>
