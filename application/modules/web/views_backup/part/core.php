<style type="text/css">
.bg {
	height: 400px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
</style>
<?php
echo link_tag('assets/css/flexslider.css');
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
echo script_tag('assets/js/plugins/ui/nicescroll.min.js');
echo script_tag('assets/js/plugins/ui/drilldown.js');
echo script_tag('assets/js/jquery.flexslider.js');

echo script_tag('assets/js/plugins/visualization/d3/d3.min.js');
echo script_tag('assets/js/plugins/visualization/d3/d3_tooltip.js');
echo script_tag('assets/js/plugins/forms/styling/switchery.min.js');
echo script_tag('assets/js/plugins/forms/styling/uniform.min.js');
echo script_tag('assets/js/plugins/forms/selects/bootstrap_multiselect.js');
echo script_tag('assets/js/plugins/ui/moment/moment.min.js');
echo script_tag('assets/js/plugins/pickers/daterangepicker.js');
echo script_tag('assets/js/core/app.js');
echo script_tag('assets/js/pages/dashboard.js');
?>
<script type="text/javascript">
	$(window).load(function(){
		$('.flexslider').flexslider({
			animation: "slide",
			start: function(slider){
				$('body').removeClass('loading');
			}
		});
	});
</script>
