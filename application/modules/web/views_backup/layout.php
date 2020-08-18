<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php if(isset($title_page)){echo $title_page;} ?></title>
	 <link rel="shortcut icon" href="<?php echo base_url('assets/images/'); ?>favicon.ico" type="image/x-icon" />
	<?php
		include ('part/core.php');
	?>
</head>

<body>

	<?php
		include ('part/menu.php');
	?>
	<div class="container">
		<?php
			if(isset($view))
			{
				include ($view.".php");
			}
		?>	
	</div>
	
	<?php
		include ('part/footer.php');
	?>
	
</body>
</html>
