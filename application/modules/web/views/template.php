<?php
include 'part/slider_profil.php';
?>
<div class="main-content-wrapper section-padding-100">
    <div class="container">
        <div class="row justify-content-center">
            <!-- ============= Post Content Area ============= -->
            <?php
                include $page.'.php';
            ?>
            <!-- ========== Sidebar Area ========== -->
            <?php
            include('part/sidebar.php');
            ?>
        </div>
    </div>
</div>
<?php
echo script_tag('assets/js/jquery/jquery-2.2.4.min.js');
echo script_tag('assets/js/popper.min.js');
echo script_tag('assets/js/bootstrap.min.js');
echo script_tag('assets/js/plugins/forms/selects/select2.min.js');
echo script_tag('assets/js/plugins.js');
echo script_tag('assets/js/active.js');
?>