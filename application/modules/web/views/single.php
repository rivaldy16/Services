<div id="content">
    <?php
        include ('part/slider_profil.php');
    ?>
    <div class="main-content-wrapper section-padding-100">
        <div class="container">
            <div class="row justify-content-center">
                <?php
                if(!empty($detail[0]->judul)):
                ?>
                    <div class="col-12 col-lg-8">
                        <div class="single-blog-content mb-100">
                            <!-- Post Meta -->
                            <div class="post-meta">
                                <h5><?php echo $detail[0]->judul; ?></h5>
                                <p>
                                    <a href="javascript:void(0);" class="post-author">
                                        <?php echo indonesian_date($detail[0]->date); ?>
                                    </a>
                                </p>
                            </div>
                            <!-- Post Content -->
                            <div class="post-content">
                                <?php
                                    echo (!empty($detail[0]->foto) ? img('assets/files/'.$detail[0]->foto) : '');

                                    echo (!empty($detail[0]->file) ? '<embed src="'.base_url('assets/files/').''.$detail[0]->file.'" width="100%" height="600">' : '');

                                    echo $detail[0]->text;
                                ?>
                            </div>
                        </div>
                    </div>
                <?php
                else:
                ?>
                    <div class="col-12 col-lg-8">
                        <div class="single-blog-content mb-100">
                            <!-- Post Meta -->
                            <div class="post-meta">
                                <h5><?php echo $detail[0]->menu; ?></h5>
                                <p>
                                    <a href="javascript:void(0);" class="post-author">
                                        <?php echo indonesian_date(date("Y-m-d h:i:sa")); ?>
                                    </a>
                                </p>
                            </div>
                            <!-- Post Content -->
                            <div class="post-content">
                                
                            </div>
                        </div>
                    </div>
                <?php
                endif;
                ?>

                <!-- ========== Sidebar Area ========== -->
                <?php
                    include('part/sidebar.php');
                ?>
            </div>
        </div>
    </div>
</div>